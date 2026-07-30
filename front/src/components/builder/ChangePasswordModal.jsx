import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CircleXIcon } from "lucide-react";
import { changePassword } from "../../api/auth";

const changePasswordSchema = z
    .object({
        current_password: z.string().min(1, "Current password is required"),
        new_password: z
            .string()
            .min(8, "New password must be at least 8 characters"),
        confirm_password: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    });

export default function ChangePasswordModal({ open, onClose }) {
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(changePasswordSchema) });

    if (!open) return null;

    const handleClose = () => {
        reset();
        setServerError(null);
        setSuccess(false);
        onClose();
    };

    const onSubmit = async (data) => {
        setServerError(null);
        try {
            await changePassword({
                current_password: data.current_password,
                new_password: data.new_password,
            });
            setSuccess(true);
            setTimeout(handleClose, 1500);
        } catch (error) {
            setServerError(
                error.response?.data?.error || "Something went wrong",
            );
        }
    };

    return (
        <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
            <div
                className="bg-white p-6 rounded-xl w-full max-w-md overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="flex justify-self-end hover:cursor-pointer"
                    onClick={handleClose}
                >
                    <CircleXIcon className="text-(--builder-edit-buttons) hover:text-red-500 transition-colors" />
                </button>

                <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Change your password
                </h3>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">
                            Current password{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            {...register("current_password")}
                            className="border border-(--builder-Sidebar-border-modal) text-black rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                        />
                        {errors.current_password && (
                            <span className="text-xs text-red-500">
                                {errors.current_password.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">
                            New password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            {...register("new_password")}
                            className="border border-(--builder-Sidebar-border-modal) text-black rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                        />
                        {errors.new_password && (
                            <span className="text-xs text-red-500">
                                {errors.new_password.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">
                            Confirm new password{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            {...register("confirm_password")}
                            className="border border-(--builder-Sidebar-border-modal) text-black rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                        />
                        {errors.confirm_password && (
                            <span className="text-xs text-red-500">
                                {errors.confirm_password.message}
                            </span>
                        )}
                    </div>

                    {serverError && (
                        <span className="text-sm text-red-500">
                            {serverError}
                        </span>
                    )}
                    {success && (
                        <span className="text-sm text-green-600">
                            Password updated successfully
                        </span>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || success}
                        className="bg-(--builder-buttons) text-white rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 hover:cursor-pointer"
                    >
                        {isSubmitting ? "Updating..." : "Update password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
