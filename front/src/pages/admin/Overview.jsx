import { useQuery } from "@tanstack/react-query";
import { getStats } from "../../api/overview.js";
import { Users, Globe, UserCheck } from "lucide-react";

const statCards = [
    {
        key: "totalUsers",
        label: "Total comptes",
        icon: Users,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
    },
    {
        key: "clientCount",
        label: "Utilisateurs",
        icon: UserCheck,
        color: "text-violet-400",
        bg: "bg-violet-500/10",
    },
    {
        key: "portfolioCount",
        label: "Portfolios publiés",
        icon: Globe,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
    },
];

function StatCard({ label, value, icon: Icon, color, bg }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center gap-4">
            <div className={`${bg} p-3 rounded-lg`}>
                <Icon size={20} className={color} />
            </div>
            <div>
                <p className="text-zinc-400 text-xs mb-1">{label}</p>
                <p className="text-white text-2xl font-semibold">{value ?? "—"}</p>
            </div>
        </div>
    );
}

function Overview() {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["overview"],
        queryFn: getStats,
    });

    if (isPending) {
        return (
            <div className="p-6 text-zinc-500 text-sm">Chargement...</div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-red-400 text-sm">
                Erreur : {error.message}
            </div>
        );
    }

    const stats = data.data;

    return (
        <div className="p-6 flex flex-col gap-6">
            <h1 className="text-white text-2xl font-semibold">Vue d'ensemble</h1>

            <div className="grid grid-cols-3 gap-4">
                {statCards.map(({ key, label, icon, color, bg }) => (
                    <StatCard
                        key={key}
                        label={label}
                        value={stats[key]}
                        icon={icon}
                        color={color}
                        bg={bg}
                    />
                ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-800">
                    <h2 className="text-white font-medium">Utilisateurs récents</h2>
                </div>
                {stats.recentUsers?.length > 0 ? (
                    <ul className="divide-y divide-zinc-800">
                        {stats.recentUsers.map((user) => (
                            <li key={user.id} className="flex items-center justify-between px-5 py-3">
                                <div>
                                    <p className="text-white text-sm font-medium">
                                        {user.first_name} {user.last_name}
                                    </p>
                                    <p className="text-zinc-500 text-xs">{user.email}</p>
                                </div>
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                        user.role === "ADMIN"
                                            ? "bg-violet-500/20 text-violet-300"
                                            : "bg-zinc-700 text-zinc-300"
                                    }`}
                                >
                                    {user.role}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="px-5 py-6 text-zinc-500 text-sm">Aucun utilisateur.</p>
                )}
            </div>
        </div>
    );
}

export default Overview;
