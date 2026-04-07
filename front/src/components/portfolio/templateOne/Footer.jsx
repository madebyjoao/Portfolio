import AboutBox from "./AboutBox";


export default function FooterPortfolio1({ portfolio_info }) {

    const info = portfolio_info.portfolio;
    
    return (
        <section className="w-screen h-40 bg-[rgb(24,61,61)] z-30">

            <div className="absolute top-[-12] w-screen h-12 bg-(--bg-template-one) rounded-bl-3xl rounded-br-3xl"></div>

            <div className="h-full flex items-center justify-center text-white">
                
                <AboutBox
                    about_title={info.about_title}
                    about_text={info.about_text}
                />
            </div>
        </section>
    );
    
}
