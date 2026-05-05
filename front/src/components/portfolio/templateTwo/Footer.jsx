import AboutBox from "./AboutBox";
import { fontFamilies } from "../../../utils/fonts";

export default function FooterPortfolio2({ portfolio_info }) {
    
    const info = portfolio_info.portfolio;
       const footerFont = fontFamilies[info.font_footer];
   
       return (
           <section
               style={{ fontFamily: footerFont }}
               className="w-screen h-40 bg-black">

               <div
               className="h-full flex p-8 text-white">
                   
                   <AboutBox
                       about_title={info.about_title}
                       about_text={info.about_text}
                   />
                   
               </div>
           </section>
       );
    
}
