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
        <div className="relative grid grid-cols-1 grid-rows-3 gap-x-4 gap-y-4 h-full overflow-y-scroll scroll-auto">

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

                <div className="grid grid-cols-2 grid-rows-3 gap-2 h-full w-full p-2">

                    <div className="row-span-3">
                        <img src={pic} alt="" />
                    </div>
                    <div className="bg-slate-500 col-start-2">
                        
                    </div>
                    <div className="bg-yellow-500 col-start-2 row-start-2">

                    </div>
                    <div className="bg-teal-500 col-start-2 row-start-3">

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