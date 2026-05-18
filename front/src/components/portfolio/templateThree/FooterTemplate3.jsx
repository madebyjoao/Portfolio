import { Link, Element } from 'react-scroll';
import logo from "@/assets/logo.svg"
import { NavLink } from 'react-router';
import { fontFamilies } from '../../../utils/fonts';

export default function FooterTemplateThree({ portfolio_info }) {

    const info = portfolio_info.portfolio;
    const footerFont = fontFamilies[info.font_footer];

    return (

        <Element name="footer">
            <div
                style={{ fontFamily: footerFont }}
                className="flex justify-between items-center text-(--template-three-text-title) min-h-15 ">
                <NavLink 
                    to="/"
                    className='size-15'>
                    <img src={logo} alt="" />
                </NavLink>

                <div className="flex px-4">

                    <h2 className="">made by Joao<sup>TM</sup></h2>

                </div>

            </div>

        </Element>
    )
}