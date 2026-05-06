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

        <section className="grid grid-cols-[1fr_1fr_0.4px_1fr_1fr] grid-rows-1 backdrop-blur bg-white/5 sm:min-h-50 sm:flex-row text-(--text-website)">
            <section className="col-span-2">
                <div className="grid grid-cols-2 grid-rows-1 gap-2 h-full w-full p-2">
                    <div className="bg-indigo-500">

                    </div>
                    <div className="col-start-2 content-center">
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
            <div className="col-start-3 bg-white/25">

            </div>
            <section className="col-start-4 col-span-2">
                <div className="grid grid-cols-2 grid-rows-[1fr_1fr_auto] gap-2 h-full w-full p-2">
                    <Link className="grid content-center place-items-center size-full text-2xl font-semibold hover:border-b-2 hover:border-white/50 hover:bg-white/5"
                        >
                        Contact
                    </Link>
                    <Link className="col-start-2 grid content-center place-items-center size-full text-2xl font-semibold hover:border-b-2 hover:border-white/50 hover:bg-white/5"
                        >
                        Contact
                    </Link>
                    <Link 
                        to="/cv"
                        className="row-start-2 grid content-center place-items-center size-full text-2xl font-semibold hover:border-b-2 hover:border-white/50 hover:bg-white/5"
                        >
                        About me
                    </Link>
                    
                    <Link 
                        to="/contact"
                        className="col-start-2 row-start-2 grid content-center place-items-center size-full text-2xl font-semibold hover:border-b-2 hover:border-white/50 hover:bg-white/5"
                        >
                        Contact
                    </Link>
                   
                    <div className="row-start-3 col-span-2 px-4">
                        <h2 className="place-self-end">made by Joao<sup>TM</sup></h2>
                    </div>
                </div>
            </section>
        </section>

/* 



        <section className="relative flex justify-center backdrop-blur bg-white/5 sm:min-h-50 sm:flex-row sm:justify-between text-(--text-website)">

            <div className="relative z-10 flex justify-around py-4 w-1/2">
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
            <div className="absolute left-1/2 -translate-x-1/2 h-auto top-0.5 bottom-0.5 overflow-y-hidden bg-white/25 w-px box-border"></div>
            <div className="flex justify-around w-1/2 px-4">
                <div>
                    <h2>
                        My cv
                    </h2>
                    <Link 
                        to="/cv" 
                        className="text-(--text-website) hover:underline transition-all"
                    >
                        View CV 
                    </Link>
                </div>
                <div>
                    <Link
                        to="/contact"
                        className="hover:underline"             
                    >
                        Contact Me
                    </Link>
                </div>
            </div>

        </section>
 */
    )
}
