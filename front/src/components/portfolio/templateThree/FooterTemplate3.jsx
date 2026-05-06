import { Link, Element } from 'react-scroll';

export default function FooterTemplateThree() {

    return (

        <Element name="footer">
            <div 
                className="text-white">
                Footer Template 3
            </div>

            <Link
                to="nav"
                smooth={true} 
                duration={500} 
                offset={-70} 
                spy={true} 
                activeClass="active"
            >
                to nav
            </Link>
        </Element>
    )
}