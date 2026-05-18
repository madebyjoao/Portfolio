import AboutBox from "./AboutBox";
import { fontFamilies } from "@/utils/fonts";

export default function FooterPortfolio1({ portfolio_info }) {

    const info = portfolio_info.portfolio;
    const footerFont = fontFamilies[info.font_footer];

    return (
        <section
            style={{ fontFamily: footerFont }}
            className="w-full min-h-fit bg-[rgb(24,61,61)] z-30 relative">

            <div className="absolute top-[-12] w-full h-12 bg-(--bg-template-one) rounded-bl-3xl rounded-br-3xl"></div>

            <div className="flex flex-col items-center justify-center text-white gap-2 md:gap-3 px-6 sm:px-12 md:px-16 lg:px-24 pt-14 md:pt-12 pb-6 md:pb-8">
                <h2 
                    className="text-xl sm:text-2xl md:text-3xl font-semibold text-center w-full"
                >
                    {info.about_title}
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-center w-full leading-relaxed">
                    {info.about_text}
                </p> 
               
            </div>
        </section>
    );
    
}

