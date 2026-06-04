import { useQuery } from "@tanstack/react-query"
import { portfolioLive } from "../../api/home"



export default function LivePortfolios() {

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

            <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
                {live.map((l) => (
                    <div className="text-2xl text-white p-2 backdrop-blur bg-white/5">
                        <p>lien :{l.slug}</p>
                        <p>nom: {l.user.first_name} {l.user.last_name}</p>  
                    </div>
                ))}
            </div>

        </div>
    )
}