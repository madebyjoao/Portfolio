import { Element, Link, animateScroll } from "react-scroll";
import pic from "@/assets/logo.svg"
import { CornerLeftUp } from "lucide-react";



export default function TemplateThree({ portfolio_info }) {

    const portfolio = portfolio_info.portfolio;
    console.log(portfolio);

    const scrollToTop = () => {
        animateScroll.scrollToTop();
    };

    return (
        <div className="relative grid grid-cols-1 grid-rows-3 gap-x-4 gap-y-4 h-full overflow-y-scroll scroll-auto text-(--template-three-text-title)">

            <Link 
                onClick={scrollToTop}
                to=""
                smooth={true} 
                duration={500} 
                offset={-70}
                className="absolute z-1000 size-auto bottom-6 right-6 bg-amber-950 p-2.5 rounded-xl">
                <CornerLeftUp color="white"/>
            </Link>

            <Element 
                name="about"
                className="">

                <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] gap-3 h-full w-full p-2">

                    <div className="row-span-3 w-full">
                        <img 
                            src={pic} 
                            alt="profil picture" 
                            className="h-65"
                        />
                    </div>
                    <div className="col-start-2 place-content-center">
                        <h2 className="text-5xl">
                            {portfolio.full_name}
                        </h2>
                    </div>
                    <div className="col-start-2 row-start-2">
                       <div className="flex flex-col">
                            <p className="">
                                {portfolio.position}<span className="p-2">·</span>{portfolio.region}
                            </p>

                       </div>
                    </div>
                    <div className="bg-teal-500 col-start-2 row-start-3">
                        <p>
                            {portfolio.about_text}
                        </p>
                    </div>
            
                </div>

            </Element>
            <Element 
                name="projects"
                className="row-start-2">

                <div className="grid grid-cols-1 grid-rows-2 gap-2 h-full w-full p-2">
                    <div className="bg-yellow-500">

                    </div>
                    <div className="bg-gray-500 row-start-2">

                    </div>

                </div>

            </Element>
            <Element 
                name="certificates"
                className="row-start-3">

                <div className="grid grid-cols-1 grid-rows-2 gap-2 h-full w-full p-2">
                    <div className="bg-sky-500">

                    </div>
                    <div className="bg-yellow-500 row-start-2">

                    </div>

                </div>

            </Element>

        </div>
    )
}