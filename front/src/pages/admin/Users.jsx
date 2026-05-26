import { useState } from "react";
import { deleteUser, getUsers, updateUser, getRoles, createUser } from "../../api/users.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const schema = z.object({
    first_name: z.string().min(1, "Requis"),
    last_name: z.string().min(1, "Requis"),
    email: z.string().email("Email invalide"),
    password: z.string().optional(),
    slug: z.string().optional(),
    role: z.string().min(1, "Requis"),
});

const inputCls =
    "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500";

function Field({ label, error, children }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs">{label}</label>
            {children}
            {error && <span className="text-red-400 text-xs">{error.message}</span>}
        </div>
    );
}

function UserModal({ user, roles, onClose, onCreate, onUpdate, isPending }) {
    const isEdit = !!user;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: isEdit
            ? { first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role, password: "", slug: "" }
            : { first_name: "", last_name: "", email: "", password: "", slug: "", role: "CLIENT" },
    });

    function onSubmit(data) {
        if (isEdit) {
            onUpdate({ ...data, id: user.id });
        } else {
            onCreate(data);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-white font-semibold text-lg">
                        {isEdit ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
                    </h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Prénom" error={errors.first_name}>
                            <input {...register("first_name")} className={inputCls} />
                        </Field>
                        <Field label="Nom" error={errors.last_name}>
                            <input {...register("last_name")} className={inputCls} />
                        </Field>
                    </div>

                    <Field label="Email" error={errors.email}>
                        <input type="email" {...register("email")} className={inputCls} />
                    </Field>

                    <Field
                        label={isEdit ? "Mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"}
                        error={errors.password}
                    >
                        <input type="password" {...register("password")} className={inputCls} />
                    </Field>

                    {!isEdit && (
                        <Field label="Slug (identifiant portfolio)" error={errors.slug}>
                            <input
                                {...register("slug")}
                                className={inputCls}
                                placeholder="ex: jean-dupont"
                            />
                        </Field>
                    )}

                    <Field label="Rôle" error={errors.role}>
                        <select {...register("role")} className={inputCls}>
                            {roles.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <div className="flex gap-2 justify-end pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                        >
                            {isPending ? "..." : isEdit ? "Mettre à jour" : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Users() {
    const [modal, setModal] = useState(null); // null | { mode: "create" } | { mode: "edit", user }
    const queryClient = useQueryClient();

    const { data: usersData, isPending: loadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
    const { data: rolesData } = useQuery({
        queryKey: ["roles"],
        queryFn: getRoles,
    });

    const users = usersData?.data ?? [];
    const roles = rolesData?.data?.roles ?? [];

    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setModal(null);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, ...data }) => updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setModal(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    function handleDelete(id) {
        if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
            deleteMutation.mutate(id);
        }
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-white text-2xl font-semibold">Utilisateurs</h1>
                <button
                    onClick={() => setModal({ mode: "create" })}
                    className="flex items-center gap-2 bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors"
                >
                    <Plus size={16} />
                    Nouvel utilisateur
                </button>
            </div>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-zinc-900 border-b border-zinc-800">
                        <tr>
                            <th className="text-left px-4 py-3 text-zinc-400 font-medium">Nom</th>
                            <th className="text-left px-4 py-3 text-zinc-400 font-medium">Email</th>
                            <th className="text-left px-4 py-3 text-zinc-400 font-medium">Rôle</th>
                            <th className="px-4 py-3 w-20" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {loadingUsers ? (
                            <tr>
                                <td colSpan={4} className="text-center text-zinc-500 py-8">
                                    Chargement...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center text-zinc-500 py-8">
                                    Aucun utilisateur
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="bg-zinc-950 hover:bg-zinc-900 transition-colors">
                                    <td className="px-4 py-3 text-white">
                                        {user.first_name} {user.last_name}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-400">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                user.role === "ADMIN"
                                                    ? "bg-violet-500/20 text-violet-300"
                                                    : "bg-zinc-700 text-zinc-300"
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3 justify-end">
                                            <button
                                                onClick={() => setModal({ mode: "edit", user })}
                                                className="text-zinc-400 hover:text-white transition-colors"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-zinc-400 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {modal && (
                <UserModal
                    user={modal.mode === "edit" ? modal.user : null}
                    roles={roles}
                    onClose={() => setModal(null)}
                    onCreate={createMutation.mutate}
                    onUpdate={updateMutation.mutate}
                    isPending={createMutation.isPending || updateMutation.isPending}
                />
            )}
        </div>
    );
}

export default Users;
