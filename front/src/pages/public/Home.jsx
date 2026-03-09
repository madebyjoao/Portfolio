import "./Home.css";
import previewVideo from "@/assets/preview.mp4";

function Home() {
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
		<div className="bg-white">
			
		</div>
    </div>
  );
}
export default Home;
