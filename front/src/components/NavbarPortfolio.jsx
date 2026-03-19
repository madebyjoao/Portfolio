import { NavLink, useParams } from "react-router";

export default function NavbarPortfolio() {
    const { slug } = useParams();

    return (
        <nav role="navigation" aria-label="Porfolio navigation" className="fixed flex justify-between items-center text-white bg-[rgb(24,61,61)] m-8 rounded-full px-7 py-3 top-0 gap-4 left-0 right-0 mx-auto max-w-[calc(100%-4rem)] shadow-[0_0_30px_rgba(24,61,61,0.7)]">
            <NavLink to={`/u/${slug}`}>
                Name
            </NavLink>
            <NavLink to={`/u/${slug}/certificates`}>
                Certificates
            </NavLink>
            <NavLink to="">
                Curriculum vitæ
            </NavLink>
        </nav>
    )

}