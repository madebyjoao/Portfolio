import previewVideo from "@/assets/preview.mp4";
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
		{ id: "1", title: "Total CLients", number: performance.clientCount, icon: UserCheck2 },
		{ id: "2", title: "Total Portfolios", number: performance.portfolioCount, icon: BookHeart },
		{ id: "3", title: "Total Portfolios", number: "5986", icon: School2Icon },
		{ id: "4", title: "Total Portfolios", number: "5986", icon: School2Icon },
	]
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      	<div>
        	<h1 className="text-black bg-white">
				Hello
			</h1>
			<div className="relative mt-4 aspect-video w-full max-w-2xl overflow-hidden rounded-lg shadow-lg">
				<video className="w-full h-full object-cover" autoPlay loop muted playsInline aria-label="Preview video showing app functionality" >
					<source src={previewVideo} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
		<div className="flex bg-white gap-4 p-4">
			{stats.map((stat) => (
				<StatsBox 
					key={stat.id}
					title={stat.title}
					number={stat.number}
					icon={stat.icon ? <stat.icon className="text-black" /> : undefined}
				/>
			))}
		</div>
    </div>
  );
}
export default Home;
