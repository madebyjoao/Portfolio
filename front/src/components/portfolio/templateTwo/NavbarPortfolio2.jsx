import { NavLink, useParams } from "react-router";

export default function NavbarPortfolio2({ title, portfolio_info }) {
    const { slug } = useParams();

    const navFont = portfolio_info

    return (
        <nav
            role="navigation"
            aria-label="Porfolio navigation"
            className="fixed flex justify-between items-center text-white bg-[rgb(0,0,0)] px-7 py-3 top-0 gap-4 left-0 right-0 mx-auto max-w z-20"
        >
            <NavLink className="hover:underline" to={`/u/${slug}`}>
                {title ?? "Portfolio Name"}
            </NavLink>

            <div className="flex justify-between gap-8">
                <NavLink to={`/u/${slug}/certificates`} className="hover:underline">
                    Certificates
                </NavLink>
                <NavLink to="" className="hover:underline">
                    Curriculum vitæ
                </NavLink>
            </div>
        </nav>
    );
}
