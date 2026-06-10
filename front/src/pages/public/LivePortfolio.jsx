import { useQuery } from "@tanstack/react-query"
import { portfolioLive } from "../../api/home"




export default function LivePortfolios() {

    const location = window.location.host;

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["live"],
        queryFn: portfolioLive,
    });

    if (isPending) {
        return <div> Charging data </div>
    }

    if (isError) {
        return <div>Une erreur est survenue : {error.message}</div>
    }

    const live = data.data.live

    console.log(live);
    return (

        <div className="flex flex-col p-5">
            <h1 className="py-2 pb-7 text-white font-extrabold text-6xl">Live Portfolios</h1>

            <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
                {live.map((l, index) => (
                    <div 
                        key={index}
                        className="text-2xl text-white p-2 backdrop-blur bg-white/5">
                        <a 
                            className="hover:underline"
                            href={`http://${location}/u/${l.slug}`} target="_blank" >
                                
                                Checkout <span>{l.user.first_name} {l.user.last_name} portfolio</span>
                        
                        </a>
                    </div>
                ))}
            </div>

        </div>
    )
}