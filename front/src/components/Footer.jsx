import StatsBox from "@/components/StatsBox";
import { useQuery } from "@tanstack/react-query";
import { BookHeart, School2, School2Icon, UserCheck2 } from "lucide-react";
import { getStats } from "@/api/overview";
import { Link } from "react-router";


export default function Footer() {

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["overview"],
        queryFn: getStats,
    });

    if (isPending) {
        return <div>Chargement en cours...</div>;
    }

    if (isError) {
        return <div>Une erreur est survenue : {error.message}</div>;
    }

    const performance = data.data;

    const stats = [
        {
            id: "1",
            title: "Total Clients",
            number: performance.clientCount,
            icon: UserCheck2,
        },
        {
            id: "2",
            title: "Total Portfolios",
            number: performance.portfolioCount,
            icon: BookHeart,
        },
    ];


    return (

        <section className="flex backdrop-blur bg-white/5 min-h-50 text-(--text-website)">

            <div className="relative z-10 flex gap-4 p-4">
                {stats.map((stat) => (
                    <StatsBox
                        key={stat.id}
                        title={stat.title}
                        number={stat.number}
                        icon={
                            stat.icon ? (
                                <stat.icon className="text-(--text-website)" />
                            ) : undefined
                        }
                    />
                ))}
            </div>
            <div className="flex items-center px-4">
                <Link 
                    to="/cv" 
                    className="text-(--text-website) hover:underline transition-all"
                >
                    View CV
                </Link>
            </div>

        </section>

    )
}
