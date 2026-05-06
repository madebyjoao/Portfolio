import { Link, Element } from 'react-scroll';
import logo from "@/assets/logo.svg"
import { NavLink } from 'react-router';

export default function FooterTemplateThree() {

    return (

        <Element name="footer">
            <div className="flex justify-between items-center text-(--template-three-text-title) min-h-15 ">
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