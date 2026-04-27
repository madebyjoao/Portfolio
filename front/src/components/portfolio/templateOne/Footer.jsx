import AboutBox from "./AboutBox";
import { fontFamilies } from "../../../utils/fonts";

export default function FooterPortfolio1({ portfolio_info }) {

    const info = portfolio_info.portfolio;
    const footerFont = fontFamilies[info.font_footer];

    return (
        <section
            style={{ fontFamily: footerFont }}
            className="w-screen h-40 bg-[rgb(24,61,61)] z-30">

            <div className="absolute top-[-12] w-screen h-12 bg-(--bg-template-one) rounded-bl-3xl rounded-br-3xl"></div>

            <div
            className="h-full flex items-center justify-center text-white">
                <h2>ola test</h2>
                
                <AboutBox
                    about_title={info.about_title}
                    about_text={info.about_text}
                />
            </div>
        </section>
    );
    
}


/*
    <nav style={{ fontFamily: `var(--font-${portfolio.font_navbar})` }}>
    ...
    </nav>

    <main style={{ fontFamily: `var(--font-${portfolio.font_main})` }}>
    ...
    </main>

    <footer style={{ fontFamily: `var(--font-${portfolio.font_footer})` }}>
    ...
    </footer>
*/