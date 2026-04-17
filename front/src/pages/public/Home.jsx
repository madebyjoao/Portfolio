import StatsBox from "@/components/StatsBox";
import { useQuery } from "@tanstack/react-query";
import { BookHeart, School2, School2Icon, UserCheck2 } from "lucide-react";
import { getStats } from "../../api/overview";

function Home() {
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
        <div className="relative flex flex-col items-center justify-center h-full text-white">
                
            <div className="relative z-10">
                <h1 className="text-black bg-white">Hello</h1>
            </div>
            <div className="relative z-10 flex gap-4 p-4">
                {stats.map((stat) => (
                    <StatsBox
                        key={stat.id}
                        title={stat.title}
                        number={stat.number}
                        icon={
                            stat.icon ? (
                                <stat.icon className="text-white" />
                            ) : undefined
                        }
                    />
                ))}
            </div>
        </div>
    );
}
export default Home;
