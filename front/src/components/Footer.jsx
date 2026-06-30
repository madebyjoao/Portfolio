import StatsBox from "@/components/StatsBox";
import { useQuery } from "@tanstack/react-query";
import { PersonStanding, ScanBarcode, School2, School2Icon } from "lucide-react";
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
            icon: PersonStanding,
        },
        {
            id: "2",
            title: "Total Portfolios",
            number: performance.portfolioCount,
            icon: ScanBarcode,
        },
    ];


    return (

        <section className="grid w-screen grid-cols-1 grid-rows-2 sm:grid-cols-[1fr_1fr_0.4px_1fr_1fr] sm:grid-rows-1 backdrop-blur bg-white/5 sm:min-h-50 sm:flex-row text-(--text-website)">
            <section className="sm:col-span-2">
                <div className="grid grid-cols-1 grid-rows-1 gap-2 h-full w-full p-2">
                    
                    <div className="col-start-1 content-center">
                        <div className="relative z-10 flex justify-around items-center">
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
                </div>
            </section>
            <div className="sm:col-start-3 bg-white/25">

            </div>
            <section className="sm:col-start-4 col-span-2">
                <div className="grid grid-cols-2 grid-rows-[1fr_1fr_auto] gap-2 h-full w-full p-2">
                    <Link
                        to="/tos"
                        className="grid content-center place-items-center size-full text-xl sm:text-2xl font-semibold hover:border-b-2 hover:border-white/50 hover:bg-white/5"
                    >
                        Terms
                    </Link>
                    <Link 
                        to="/live"
                        className="col-start-2 grid content-center place-items-center size-full text-xl sm:text-2xl font-semibold hover:border-b-2 hover:border-white/50 hover:bg-white/5"
                        >
                        Live
                    </Link>
                    <Link 
                        to="/cv"
                        className="row-start-2 grid content-center place-items-center size-full text-xl sm:text-2xl font-semibold hover:border-b-2 hover:border-white/50 hover:bg-white/5"
                        >
                        About me
                    </Link>
                    
                    <a 
                        href="mailto:joao@madebyjoao.fr"
                        className="col-start-2 row-start-2 grid content-center place-items-center size-full text-xl sm:text-2xl font-semibold hover:border-b-2 hover:border-white/50 hover:bg-white/5"
                        >
                        Contact
                    </a>
                   
                    <div className="row-start-3 col-span-2 px-4">
                        <h2 className="place-self-end">made by Joao<sup>TM</sup></h2>
                    </div>
                </div>
            </section>
        </section>

    )
}
