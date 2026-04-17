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
        <div className="relative flex flex-col items-center justify-center h-full text-(--text-website)">
                
            <div className="relative z-10 mx-50">
                <h1 className="text-(--text-website) text-6xl font-spectral">
                    Made By Joao Portfolio builder
                </h1>
                <p className="text-(--text-website)">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id dignissimos sint fugiat tenetur asperiores fuga ad! Voluptate corporis fugiat at pariatur quia impedit officiis, ea maxime. Iusto autem aliquid molestiae.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore laudantium tenetur, expedita nostrum quo repudiandae nam quia recusandae eligendi commodi esse aut saepe non qui quisquam eos hic! Animi, nemo?
                </p>
            </div>
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
        </div>
    );
}
export default Home;
