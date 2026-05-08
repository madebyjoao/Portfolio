# Full-Stack API Guide
### Based on the Portfolio Builder — Express + Sequelize + React Query

---

## Table of Contents

1. [Stack Overview](#1-stack-overview)
2. [Project Structure](#2-project-structure)
3. [Environment Variables](#3-environment-variables)
4. [Database Connection](#4-database-connection)
5. [Migrations](#5-migrations)
6. [Models](#6-models)
7. [Model Associations](#7-model-associations)
8. [Express Entry Point](#8-express-entry-point)
9. [Authentication — JWT + bcrypt](#9-authentication--jwt--bcrypt)
10. [Middleware](#10-middleware)
11. [Routes](#11-routes)
12. [Controllers](#12-controllers)
13. [File Uploads — Multer + Sharp](#13-file-uploads--multer--sharp)
14. [Utility Helpers](#14-utility-helpers)
15. [Frontend — Axios Instance](#15-frontend--axios-instance)
16. [Frontend — React Query](#16-frontend--react-query)
17. [Frontend — React Hook Form + Zod](#17-frontend--react-hook-form--zod)
18. [Common Pitfalls](#18-common-pitfalls)
19. [Full Request Lifecycle](#19-full-request-lifecycle)

---

## 1. Stack Overview

| Layer | Technology | Why |
|---|---|---|
| Backend framework | Express 5 | Minimal, flexible, widely understood |
| Database | MySQL | Relational, good for structured portfolio data |
| ORM | Sequelize 6 | Handles queries, migrations, and associations |
| Authentication | JWT + bcrypt | Stateless auth — no session storage needed on server |
| File handling | Multer + Sharp | Multer parses multipart forms; Sharp resizes/converts images |
| Frontend data fetching | TanStack React Query | Caching, loading/error states, automatic refetch |
| Frontend forms | React Hook Form + Zod | Performant uncontrolled forms with schema validation |
| HTTP client | Axios | Interceptors make it easy to attach auth tokens globally |

---

## 2. Project Structure

```
back/
├── index.js                    # Entry point — Express app setup
├── migrations/                 # Database migrations (sequelize-cli)
│   └── 20260303125945-table-users.cjs
├── uploads/                    # Served as static files
│   └── {slug}/
│       ├── cv/
│       ├── picture/
│       └── certificates/
└── src/
    ├── controllers/            # Business logic
    │   ├── AuthController.js
    │   ├── BuilderController.js
    │   └── UserController.js
    ├── db/
    │   └── connection.js       # Sequelize instance
    ├── middlewares/
    │   ├── AuthMiddleware.js   # JWT verification + role check
    │   ├── CheckSlug.js        # Portfolio ownership check
    │   └── UploadMulter.js     # Multer config
    ├── models/
    │   ├── index.js            # Associations
    │   ├── User.js
    │   ├── Portfolio.js
    │   ├── Project.js
    │   └── Certificate.js
    ├── routes/
    │   ├── index.js            # Root router
    │   ├── Auth.route.js
    │   └── Builder.route.js
    └── utils/
        ├── password.js         # bcrypt helpers
        └── createFolder.js     # Upload directory helpers

front/
└── src/
    ├── api/
    │   ├── config.js           # Axios instance
    │   └── builder.js          # API functions for builder routes
    └── pages/
        └── builder/
            └── Builder.jsx     # Form with React Hook Form + Zod
```

---

## 3. Environment Variables

Create a `.env` file at the root of `back/`:

```env
DB_NAME=your_database_name
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

JWT_SECRET=a_long_random_string
JWT_EXPIRES_IN=7d

PORT=3000
```

**Why JWT_SECRET matters:** This is the key used to sign and verify tokens. If it leaks, anyone can forge tokens and impersonate any user. Use a long random string (32+ characters), never commit it to git.

---

## 4. Database Connection

```js
// back/src/db/connection.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: "mysql",
        logging: false, // Set to console.log to see SQL queries during dev
    },
);

export default sequelize;
```

**Why `logging: false`:** Sequelize logs every SQL query by default. That's useful for debugging but noisy in production. Switch it to `console.log` temporarily if you need to inspect what queries are running.

---

## 5. Migrations

Migrations are the source of truth for your database schema. Never modify the database manually in production — write a migration instead.

### Setup

Sequelize CLI needs a config file. Because the project uses `"type": "module"` in `package.json` (ESM), the config must use `.cjs`:

```js
// back/src/db/config.cjs  (or back/config/config.cjs)
require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: "mysql",
    },
};
```

Add a `.sequelizerc` at the root of `back/` to point CLI to your config:

```js
// back/.sequelizerc
const path = require("path");
module.exports = {
    config: path.resolve("src/db", "config.cjs"),
    "migrations-path": path.resolve("migrations"),
    "seeders-path": path.resolve("seeders"),
};
```

### Creating a migration

```bash
npm run db:migration:create -- --name add-picture-path-to-portfolios
```

This generates `migrations/TIMESTAMP-add-picture-path-to-portfolios.cjs`.

### Migration file anatomy

```js
"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        // What to do when migrating forward
        await queryInterface.addColumn("portfolios", "picture_path", {
            type: Sequelize.STRING(255),
            allowNull: true,
            defaultValue: null,
        });
    },

    async down(queryInterface) {
        // How to undo this migration
        await queryInterface.removeColumn("portfolios", "picture_path");
    },
};
```

**Why both `up` and `down`:** The `down` function lets you roll back. Always write it — you will need it when a migration causes a bug in staging.

### Running migrations

```bash
npm run db:migrate          # Run all pending migrations
npm run db:migrate:status   # See which have run
npm run db:migrate:undo     # Undo the last one
npm run db:migrate:undo:all # Undo everything (careful)
```

### Common `queryInterface` methods

| Method | Use |
|---|---|
| `createTable(name, cols)` | Create a new table |
| `dropTable(name)` | Drop a table |
| `addColumn(table, col, def)` | Add a column |
| `removeColumn(table, col)` | Remove a column |
| `changeColumn(table, col, def)` | Modify a column |
| `addIndex(table, cols)` | Add an index |

---

## 6. Models

A Sequelize model is a JavaScript class that maps to a database table. You define the columns and their types once — Sequelize handles the SQL.

```js
// back/src/models/Portfolio.js
import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Portfolio = sequelize.define(
    "Portfolio",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,       // One portfolio per user
        },
        slug: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-z0-9-]+$/i,
                len: [3, 50],
            },
        },
        title: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        picture_path: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        technologies: {
            type: DataTypes.JSON,   // Stored as JSON string in MySQL
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        tableName: "portfolios",    // Exact table name — don't let Sequelize pluralize
        timestamps: true,
        createdAt: "created_at",    // Map to snake_case columns
        updatedAt: "updated_at",
        freezeTableName: true,      // Prevents Sequelize from auto-pluralizing
    },
);

export default Portfolio;
```

**Key model options:**
- `freezeTableName: true` — without this, `Portfolio` becomes `Portfolios` in queries
- `timestamps: true` with custom names — Sequelize defaults to `createdAt`/`updatedAt` (camelCase); map to your snake_case columns
- `validate` on fields — Sequelize validates before hitting the database

### DataTypes cheat sheet

| Type | Use |
|---|---|
| `DataTypes.INTEGER` | Whole numbers, IDs |
| `DataTypes.STRING(n)` | VARCHAR(n) |
| `DataTypes.TEXT` | Long text, no length limit |
| `DataTypes.BOOLEAN` | true/false |
| `DataTypes.DATE` | Datetime |
| `DataTypes.JSON` | Object/array stored as JSON string |
| `DataTypes.ENUM("A","B")` | Fixed set of values |
| `DataTypes.FLOAT` | Decimal numbers |

---

## 7. Model Associations

Associations define the relationships between models. Declare them all in one file that you import once at startup — this avoids circular dependency issues.

```js
// back/src/models/index.js
import User from "./User.js";
import Portfolio from "./Portfolio.js";
import Project from "./Project.js";
import Certificate from "./Certificate.js";
import ProjectImage from "./ProjectImage.js";

// One user has one portfolio
User.hasOne(Portfolio, { foreignKey: "user_id", as: "portfolio" });
Portfolio.belongsTo(User, { foreignKey: "user_id", as: "user" });

// One portfolio has many projects
Portfolio.hasMany(Project, { foreignKey: "portfolio_id", as: "projects" });
Project.belongsTo(Portfolio, { foreignKey: "portfolio_id", as: "portfolio" });

// One project has many images
Project.hasMany(ProjectImage, { foreignKey: "project_id", as: "images" });
ProjectImage.belongsTo(Project, { foreignKey: "project_id", as: "project" });

// One portfolio has many certificates
Portfolio.hasMany(Certificate, { foreignKey: "portfolio_id", as: "certificates" });
Certificate.belongsTo(Portfolio, { foreignKey: "portfolio_id", as: "portfolio" });

export { User, Portfolio, Project, Certificate, ProjectImage };
```

**Why the `as` alias:** When you `include` an association in a query, you reference it by its alias:

```js
// Without alias you'd write: include: [{ model: ProjectImage }]
// With alias:
const projects = await Project.findAll({
    where: { portfolio_id: portfolio.id },
    include: [{ model: ProjectImage, as: "images" }],
});
// Now each project has a .images array
```

Import `models/index.js` once at startup (not the individual model files) so associations are registered:

```js
// back/index.js
import "./src/models/index.js"; // Side effect: registers all associations
```

---

## 8. Express Entry Point

```js
// back/index.js
import "dotenv/config";         // Load .env first — before anything else
import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";
import "./src/models/index.js"; // Register Sequelize associations

const app = express();

app.use(cors({
    origin: "*",                // In production, replace * with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());                          // Parse JSON request bodies
app.use("/uploads", express.static("uploads"));  // Serve uploaded files as static

app.use("/", router);   // Mount all routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

**Why `express.static("uploads")`:** Files saved to disk need a way to be served. This makes `http://localhost:3000/uploads/slug/cv/file.pdf` directly accessible. The path is relative to where you run `node`, not the file location.

**Why `import "dotenv/config"` must be first:** Any code that runs after it can read `process.env`. If a model file loads before dotenv, the DB credentials are undefined.

---

## 9. Authentication — JWT + bcrypt

### Password hashing

```js
// back/src/utils/password.js
import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, encryptedPassword) {
    return bcrypt.compare(password, encryptedPassword);
}

export { hashPassword, comparePassword };
```

**Why bcrypt:** bcrypt is slow by design. That's the point — it makes brute-force attacks expensive. `SALT_ROUNDS = 10` is the standard balance between security and performance (~100ms per hash on modern hardware).

Never store plain passwords. Never use `md5` or `sha256` for passwords — they're fast, which is bad here.

### Login — issuing a JWT

```js
// back/src/controllers/AuthController.js
async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
        { email: user.email },          // Payload — keep it small
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
    );

    return res.status(200).json({ token, role: user.role, slug: portfolio?.slug });
}
```

**Why not include the password in the JWT payload:** The payload is base64-encoded, not encrypted — anyone can decode it. Only put non-sensitive identifiers there (email, user ID, role).

**Why return the same error for wrong email and wrong password:** Distinguishing the two tells attackers which emails exist in your database (user enumeration). Keep them identical.

### Verifying the JWT — AuthMiddleware

```js
// back/src/middlewares/AuthMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function AuthMiddleware(req, res, next, roles = []) {
    const authHeader = req.header("Authorization");
    const [prefix, token] = authHeader?.split(" ") || [null, undefined];

    if (prefix !== "Bearer") {
        return res.status(401).json({ error: "No Bearer token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ where: { email: decoded.email } });

        // Role check — if roles array is provided, user must have one of them
        if (!user || (roles.length && !roles.includes(user.role))) {
            return res.status(401).json({ error: "Permission denied" });
        }

        req.user = user;    // Attach user to request for downstream use
        return next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}
```

**Why look up the user in the DB on every request:** The JWT alone tells you the email and that it hasn't expired. But the user may have been deleted or banned since the token was issued. Fetching from DB confirms they still exist.

**Why attach to `req.user`:** Downstream middleware and controllers can read `req.user` without querying the DB again.

### Using the middleware on routes

```js
// Apply to all routes in a router
builderRouter.use((req, res, next) =>
    AuthMiddleware(req, res, next, ["CLIENT", "ADMIN"])
);

// Or on a single route with specific roles
adminRouter.get("/users", (req, res, next) =>
    AuthMiddleware(req, res, next, ["ADMIN"])
, UserController.getAll);
```

---

## 10. Middleware

Middleware is a function that runs between receiving a request and sending a response. It has access to `req`, `res`, and `next`.

```
Request → AuthMiddleware → CheckSlug → Controller → Response
```

### CheckSlug — ownership guard

```js
// back/src/middlewares/CheckSlug.js
export default async function checkSlug(req, res, next) {
    const { slug } = req.params;

    const portfolio = await Portfolio.findOne({ where: { slug } });
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });

    // Prevent user A from modifying user B's portfolio
    if (portfolio.user_id !== req.user.id) {
        return res.status(403).json({ error: "Access Denied" });
    }

    req.portfolio = portfolio;  // Attach so controller can reuse it
    return next();
}
```

**Why 403 and not 404 for wrong owner:** 403 means "I know this exists but you can't touch it." You might prefer 404 to avoid revealing that the portfolio exists — use your judgement based on your privacy requirements.

**Why attach `req.portfolio`:** The controller would otherwise have to query the DB again for the same record. Attach it once in middleware, reuse it downstream.

---

## 11. Routes

Routes connect HTTP verbs + paths to middleware chains + controllers.

```js
// back/src/routes/Builder.route.js
import express from "express";
import upload from "../middlewares/UploadMulter.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import checkSlug from "../middlewares/CheckSlug.js";
import BuilderController from "../controllers/BuilderController.js";

const builderRouter = express.Router();

// Apply auth to ALL routes in this router
builderRouter.use((req, res, next) =>
    AuthMiddleware(req, res, next, ["CLIENT", "ADMIN"])
);

// GET
builderRouter.get("/portfolio/:slug", checkSlug, BuilderController.getPortfolioBuilder);

// PUT — multiple file fields
builderRouter.put(
    "/portfolio/:slug",
    checkSlug,
    upload.fields([
        { name: "file", maxCount: 1 },      // PDF CV
        { name: "picture", maxCount: 1 },   // Profile picture
    ]),
    BuilderController.updatePortfolio
);

// DELETE
builderRouter.delete("/certificates/:id", BuilderController.deleteCertificate);

export default builderRouter;
```

### Root router — mounting all sub-routers

```js
// back/src/routes/index.js
import express from "express";
import authRouter from "./Auth.route.js";
import builderRouter from "./Builder.route.js";

const router = express.Router();

router.use("/auth", authRouter);        // → /auth/login, /auth/register
router.use("/builder", builderRouter);  // → /builder/portfolio/:slug

export default router;
```

**Middleware order on a route matters:** `checkSlug` reads `req.user` set by `AuthMiddleware`, so auth must come first. `upload.fields(...)` must come before the controller so `req.files` is populated when the controller runs.

---

## 12. Controllers

Controllers contain the actual business logic. Keep them thin — query the DB, handle the file, save the record, respond.

```js
// back/src/controllers/BuilderController.js
async function updatePortfolio(req, res) {
    const { slug } = req.params;
    const { id, title, about_text, is_published, template, technologies } = req.body;

    // Files come from upload.fields() middleware
    const file    = req.files?.file?.[0];
    const picture = req.files?.picture?.[0];

    try {
        const portfolio = await Portfolio.findOne({ where: { id } });
        if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });

        // Handle CV upload
        if (file) {
            await createUserFolderCv(slug);             // Ensure directory exists
            const filename = uuidv4();
            const uploadPath = `./uploads/${slug}/cv/${filename}.pdf`;
            await fs.writeFile(uploadPath, file.buffer); // file.buffer from memoryStorage
            portfolio.cv_path = `${slug}/cv/${filename}.pdf`;
        }

        // Handle picture upload — resize with Sharp before saving
        if (picture) {
            await createUserFolderPicture(slug);
            const filename = uuidv4();
            const uploadPath = `./uploads/${slug}/picture/${filename}.jpg`;
            await sharp(picture.buffer)
                .resize(600, 800, { fit: "inside", withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toFile(uploadPath);
            portfolio.picture_path = `${slug}/picture/${filename}.jpg`;
        }

        // Update scalar fields — only overwrite if value is provided
        portfolio.title       = title       || portfolio.title;
        portfolio.about_text  = about_text  || portfolio.about_text;
        portfolio.is_published = is_published !== undefined
            ? is_published === "1"
            : portfolio.is_published;
        portfolio.template = template || portfolio.template;

        // JSON field — always parse from string first
        const parsedTechnologies = typeof technologies === "string"
            ? JSON.parse(technologies)
            : technologies;
        portfolio.technologies = Array.isArray(parsedTechnologies)
            ? parsedTechnologies
            : portfolio.technologies;

        await portfolio.save();
        res.status(200).json({ portfolio });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update portfolio" });
    }
}
```

**Why `uuidv4()` for filenames:** Predictable names (like the original filename) allow users to guess other users' file URLs. UUIDs are random and unguessable. They also avoid filename collisions.

**Why `portfolio.field = value || portfolio.field`:** If the client sends an empty string, this keeps the existing value. Be careful — if you legitimately want to allow clearing a field, use `value !== undefined ? value : portfolio.field` instead.

**Why `JSON.parse(technologies)`:** FormData sends everything as strings. Even if you append an array, it arrives as a comma-separated string or `"[\"React\",\"Node\"]"`. Always parse JSON fields manually in the controller.

**Why `await portfolio.save()` instead of `Portfolio.update()`:** `findOne` then mutate then `save()` lets you conditionally update fields and handle file uploads before committing. `Portfolio.update({ ... }, { where: { id } })` is fine for simple updates without file logic.

---

## 13. File Uploads — Multer + Sharp

### Multer configuration

```js
// back/src/middlewares/UploadMulter.js
import multer from "multer";

const storage = multer.memoryStorage(); // Files stored in RAM as Buffer, not on disk

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
```

**Why `memoryStorage`:** Files land in `req.file.buffer` / `req.files.field[0].buffer`. You can then pass the buffer directly to Sharp for processing before writing to disk. With `diskStorage`, you'd write the raw file to disk first, then read it back — two disk operations instead of one.

**The three multer modes:**

```js
upload.single("fieldName")
// → req.file — one file

upload.array("fieldName", maxCount)
// → req.files — array of files under same field name

upload.fields([{ name: "file", maxCount: 1 }, { name: "picture", maxCount: 1 }])
// → req.files.file[0] and req.files.picture[0] — multiple different fields
```

Always match the field name in `upload.fields()` exactly to the FormData key appended on the frontend.

### Sharp — image processing

```js
await sharp(picture.buffer)
    .resize(600, 800, {
        fit: "inside",          // Shrink to fit within 600x800, keep aspect ratio
        withoutEnlargement: true // Don't upscale small images
    })
    .jpeg({ quality: 80 })      // Convert to JPEG, 80% quality (~good balance size/quality)
    .toFile(uploadPath);
```

**Why resize before saving:** Users upload 8MB phone photos. Resizing to 600×800 at 80% quality typically produces files under 100KB — 80x smaller. Your server disk and page load times will thank you.

**Sharp fit options:**
- `inside` — fit within the box, maintain ratio, never crop
- `cover` — fill the box, crop if needed (like CSS `object-fit: cover`)
- `fill` — stretch to exact dimensions (distorts)
- `contain` — like inside but adds padding to fill the box

### Ensuring the upload directory exists

Multer/Sharp will throw `ENOENT` if the directory doesn't exist. Always create it before writing:

```js
// back/src/utils/createFolder.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createUserFolderPicture(slug) {
    const folderPath = path.join(__dirname, "../../uploads", slug, "/picture");
    await fs.mkdir(folderPath, { recursive: true }); // recursive: true = no error if already exists
    return folderPath;
}
```

**Why `recursive: true`:** Without it, `mkdir` throws if any part of the path already exists or if parent directories are missing. With it, it creates all missing directories and silently succeeds if they already exist.

---

## 14. Utility Helpers

### Password helpers

```js
import { hashPassword, comparePassword } from "../utils/password.js";

// When creating a user:
const hashed = await hashPassword(req.body.password);
await User.create({ ...req.body, password: hashed });

// When logging in:
const isMatch = await comparePassword(req.body.password, user.password);
```

---

## 15. Frontend — Axios Instance

```js
// front/src/api/config.js
import axios from "axios";

export const BASE_URL = "http://localhost:3000";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Attach JWT to every request automatically
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
```

**Why a shared instance:** You configure the base URL and auth header once. Every API file imports this instance instead of raw axios — no need to repeat the base URL or token logic in every call.

**Why a request interceptor:** The token might be set after the instance is created (user logs in). The interceptor reads `localStorage` fresh on every request, so it always has the current token.

### API functions

```js
// front/src/api/builder.js
import instance from "./config.js";

async function updatePortfolio(slug, formData) {
    return await instance.put(`builder/portfolio/${slug}`, formData, {
        timeout: 10000,
    });
}
```

**Why separate API files per domain:** Keeps concerns separated. `builder.js` only knows about builder endpoints. Easy to find, easy to mock in tests.

**Why pass FormData, not a plain object:** When uploading files, the request must be `multipart/form-data`. Axios detects that you're sending a `FormData` instance and sets the correct `Content-Type` header automatically, including the multipart boundary. Never set `Content-Type: multipart/form-data` manually — Axios needs to generate the boundary string.

---

## 16. Frontend — React Query

React Query manages server state: fetching, caching, refetching, and mutation side effects.

### Reading data — useQuery

```js
const { isPending, isError, data, error } = useQuery({
    queryKey: ["builder-portfolio", slug], // Cache key — changes trigger a refetch
    queryFn: () => getPortfolioBuilder(slug),
    enabled: !!slug,                        // Don't run if slug is null/undefined
});
```

**Why `queryKey` includes the slug:** If the user navigates to a different portfolio, React Query sees a different key and fetches fresh data instead of returning the cached result for the previous portfolio.

**Why `enabled: !!slug`:** If `slug` is null on first render, the query would fire with `null` as the parameter and likely get a 404. `enabled` prevents the query from running until you have the data you need.

### Writing data — useMutation

```js
const { mutate } = useMutation({
    mutationFn: (formData) => updatePortfolio(slug, formData),
    onSuccess: () => {
        queryClient.invalidateQueries(["builder-portfolio", slug]); // Refetch stale data
        navigate(0); // Refresh the page
    },
    onError: (error) => {
        // Always handle errors — without this, failures are completely silent
        console.error(error);
        alert(error?.response?.data?.error ?? "Failed to save changes");
    },
});

// Trigger the mutation:
mutate(formData);
```

**Why `invalidateQueries` on success:** After a successful PUT, the cached GET result is stale. Invalidating it forces React Query to refetch so the UI reflects the new state.

**Why always write `onError`:** Without it, API errors fail silently — the user clicks Save, nothing happens, no feedback. Always provide at minimum a `console.error` during development.

### Pre-filling a form with fetched data — useEffect + reset

```js
const { register, reset } = useForm({ resolver: zodResolver(schema) });

useEffect(() => {
    if (data?.data?.portfolio) {
        const p = data.data.portfolio;
        reset({
            title: p.title ?? "",
            is_published: p.is_published ? "1" : "0",
            // ...
        });
    }
}, [data, reset]);
```

**Why `reset()` inside `useEffect`:** `useQuery` is async — data isn't available on first render. `useEffect` with `data` as a dependency runs when the data arrives and populates the form.

**Why `?? ""`:** If a field is `null` in the database, passing `null` to an input makes it uncontrolled → controlled, which React warns about. Default to `""` for text fields.

---

## 17. Frontend — React Hook Form + Zod

### Schema definition

```js
import * as z from "zod";

const schema = z.object({
    title: z.string().min(1, "Title is required"),

    is_published: z.stringbool(), // Custom Zod extension: "1" → true, "0" → false

    template: z.enum(["1", "2", "3"]).transform(Number),

    // Optional file field
    file: z.instanceof(FileList)
        .optional()
        .refine(
            (files) => !files || files.length === 0 || ["application/pdf"].includes(files[0].type),
            "Only PDF allowed"
        )
        .transform((files) => files && files.length > 0 ? files[0] : undefined),

    // Optional picture with cross-field validation
    picture: z.instanceof(FileList)
        .optional()
        .refine(
            (files) => !files || files.length === 0 || ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type),
            "Only JPEG, PNG, WEBP allowed"
        )
        .transform((files) => files && files.length > 0 ? files[0] : undefined),

}).superRefine((data, ctx) => {
    // Cross-field validation: picture required for template 3
    if (data.template === 3 && !data.picture) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "A picture is required for Template 3",
            path: ["picture"],
        });
    }
});
```

**Why `.optional()` before `.refine()` on file fields:** Without `.optional()`, an empty FileList fails the `z.instanceof(FileList)` check before your refine even runs. With `.optional()`, `undefined` short-circuits and the refine is skipped. For FileList fields, you also need to guard inside the refine: `!files || files.length === 0 ||`.

**Why `.transform()` on file fields:** React Hook Form gives you the raw `FileList`. The controller expects a single `File`. The transform converts it so `data.picture` in `onSubmit` is already a `File` object (or `undefined`).

**Why `superRefine` for cross-field rules:** Individual field `.refine()` only sees that field's value. `superRefine` at the schema level sees all fields at once after they've all been parsed and transformed.

### Form setup

```js
const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
});
```

### File inputs — critical pattern

```js
// WRONG — the explicit onChange overwrites react-hook-form's onChange
// The field value is never registered; files are silently dropped
<input {...register("picture")} onChange={handlePictureChange} />

// CORRECT — pass the custom handler inside register options
// React Hook Form merges both callbacks correctly
<input {...register("picture", { onChange: handlePictureChange })} />
```

This is the most common silent bug with file inputs in React Hook Form. The spread `{...register("picture")}` includes an `onChange`. Adding `onChange={handler}` after the spread overwrites it. React Hook Form never sees the file change, so `data.picture` is always `undefined` at submit time.

### Controlled selects with Controller

Some UI components (like custom dropdowns) aren't native inputs and can't be wired with `register`. Use `Controller`:

```js
import { Controller } from "react-hook-form";

<Controller
    name="template"
    control={control}
    render={({ field }) => (
        <StyledSelect
            value={field.value}
            onChange={field.onChange}
            options={[{ value: "1", label: "Template 1" }]}
        />
    )}
/>
```

### Building FormData in onSubmit

```js
const onSubmit = (data) => {
    // data here has already been validated and transformed by Zod
    const formData = new FormData();

    // Scalar fields
    formData.append("title", data.title);
    formData.append("is_published", data.is_published ? "1" : "0");
    formData.append("template", data.template);

    // JSON fields — must stringify
    formData.append("technologies", JSON.stringify(data.technologies ?? []));

    // File fields — only append if present
    if (data.picture) formData.append("picture", data.picture);
    if (data.file) formData.append("file", data.file);

    mutate(formData);
};
```

**Why `JSON.stringify` for arrays:** FormData can only hold strings and Blobs. An array appended directly becomes `"[object Object]"` or a comma-separated string. Stringify it and parse it in the controller.

---

## 18. Common Pitfalls

### 1. File input onChange overwrites react-hook-form's onChange
```js
// Broken — RHF never sees the file
{...register("picture")} onChange={myHandler}

// Fixed
{...register("picture", { onChange: myHandler })}
```

### 2. Forgetting onError in useMutation
```js
// Broken — errors are completely silent
useMutation({ mutationFn: fn, onSuccess: () => {} })

// Fixed
useMutation({ mutationFn: fn, onSuccess: ..., onError: (e) => alert(e?.response?.data?.error) })
```

### 3. multer: `req.file` vs `req.files`
```js
upload.single("file")   → req.file          (one file)
upload.fields([...])    → req.files.field[0] (multiple fields)
```
Mixing these up means the controller reads `undefined` and silently skips the upload.

### 4. Missing upload directory
Sharp and `fs.writeFile` throw `ENOENT` if the folder doesn't exist. Always call `fs.mkdir({ recursive: true })` before writing.

### 5. JSON fields arrive as strings in FormData
```js
// Frontend
formData.append("technologies", JSON.stringify(data.technologies));

// Backend — always parse
const parsed = typeof technologies === "string" ? JSON.parse(technologies) : technologies;
```

### 6. Zod refinements don't short-circuit
Zod runs all `.refine()` calls even if one fails. Guard later refines explicitly:
```js
.refine(files => files.length > 0, "Required")
.refine(files => files.length === 0 || validTypes.includes(files[0].type), "Bad type")
//              ↑ guard so files[0] is never undefined
```

### 7. ESM + Sequelize CLI config must use .cjs
The project uses `"type": "module"`. Sequelize CLI loads config with `require()`, so config files must be `.cjs`, not `.js`.

---

## 19. Full Request Lifecycle

Here's what happens when you click **Save Changes** on the builder:

```
1. User clicks submit
   └── handleSubmit(onSubmit) fires

2. React Hook Form collects all registered field values
   └── Runs Zod schema validation
       ├── Fails → errors object populated, onSubmit not called
       └── Passes → calls onSubmit(data) with transformed values

3. onSubmit builds a FormData object
   └── Appends strings, JSON strings, and File objects

4. mutate(formData) called
   └── Axios PUT /builder/portfolio/:slug
       └── Axios detects FormData → sets Content-Type: multipart/form-data

5. Request arrives at Express server
   └── CORS middleware checks origin
   └── AuthMiddleware
       ├── Reads Authorization: Bearer <token> header
       ├── Verifies JWT signature
       ├── Fetches user from DB
       └── Attaches user to req.user, calls next()
   └── checkSlug middleware
       ├── Finds portfolio by slug
       ├── Checks portfolio.user_id === req.user.id
       └── Attaches portfolio to req.portfolio, calls next()
   └── upload.fields([...]) (Multer)
       ├── Parses multipart body
       └── Attaches files to req.files.file[0] and req.files.picture[0]
   └── BuilderController.updatePortfolio
       ├── Reads req.body for scalar fields
       ├── Reads req.files for uploaded files
       ├── Creates upload directories if needed
       ├── Processes image with Sharp, writes to disk
       ├── Updates portfolio record fields
       ├── portfolio.save()
       └── res.status(200).json({ portfolio })

6. Response arrives at frontend
   └── onSuccess fires
       ├── queryClient.invalidateQueries(["builder-portfolio", slug])
       └── navigate(0) — page refreshes with new data
```

---

*Stack: Express 5 · Sequelize 6 · MySQL · JWT · bcrypt · Multer · Sharp · React Query · React Hook Form · Zod · Axios*
