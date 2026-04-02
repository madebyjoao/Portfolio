import User from "./User.js";
import Portfolio from "./Portfolio.js";
import Project from "./Project.js";
import Certificate from "./Certificate.js";
import ProjectImage from "./ProjectImage.js";

User.hasOne(Portfolio, {
    foreignKey: "user_id",
    as: "portfolio",
});

Portfolio.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

Portfolio.hasMany(Project, {
    foreignKey: "portfolio_id",
    as: "projects",
});

Project.belongsTo(Portfolio, {
    foreignKey: "portfolio_id",
    as: "portfolio",
});

Project.hasMany(ProjectImage, {
    foreignKey: "project_id",
    as: "images",
});

ProjectImage.belongsTo(Project, {
    foreignKey: "project_id",
    as: "project",
});

Portfolio.hasMany(Certificate, {
    foreignKey: "portfolio_id",
    as: "certificates",
});

Certificate.belongsTo(Portfolio, {
    foreignKey: "portfolio_id",
    as: "portfolio",
});

export { User, Portfolio, Project, Certificate, ProjectImage };
