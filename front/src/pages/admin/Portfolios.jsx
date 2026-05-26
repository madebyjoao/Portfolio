import { useQuery } from "@tanstack/react-query";
import { getAdminPortfolios } from "../../api/adminPortfolios.js";
import { Globe } from "lucide-react";

function Portfolios() {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["admin-portfolios"],
        queryFn: getAdminPortfolios,
    });

    const portfolios = data?.data ?? [];

    return (
        <div className="p-6">
            <h1 className="text-white text-2xl font-semibold mb-6">Portfolios</h1>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-zinc-900 border-b border-zinc-800">
                        <tr>
                            <th className="text-left px-4 py-3 text-zinc-400 font-medium">Utilisateur</th>
                            <th className="text-left px-4 py-3 text-zinc-400 font-medium">Slug</th>
                            <th className="text-left px-4 py-3 text-zinc-400 font-medium">Titre</th>
                            <th className="text-left px-4 py-3 text-zinc-400 font-medium">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {isPending ? (
                            <tr>
                                <td colSpan={4} className="text-center text-zinc-500 py-8">
                                    Chargement...
                                </td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td colSpan={4} className="text-center text-red-400 py-8">
                                    Erreur : {error.message}
                                </td>
                            </tr>
                        ) : portfolios.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center text-zinc-500 py-8">
                                    Aucun portfolio
                                </td>
                            </tr>
                        ) : (
                            portfolios.map((p) => (
                                <tr key={p.id} className="bg-zinc-950 hover:bg-zinc-900 transition-colors">
                                    <td className="px-4 py-3 text-white">
                                        {p.user
                                            ? `${p.user.first_name} ${p.user.last_name}`
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-mono text-zinc-300 text-xs bg-zinc-800 px-2 py-0.5 rounded">
                                            {p.slug}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-400">
                                        {p.title || <span className="text-zinc-600 italic">Sans titre</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        {p.is_published ? (
                                            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                                                <Globe size={12} />
                                                Publié
                                            </span>
                                        ) : (
                                            <span className="text-xs text-zinc-500">Brouillon</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Portfolios;
