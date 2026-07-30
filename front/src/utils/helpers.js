import { animateScroll } from "react-scroll";

//logout function

export function handleLogout() {
    localStorage.removeItem("first_name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("slug");
    window.location.href = "/";
};

export function scrollToTop() {

        animateScroll.scrollToTop();

};

// A url stored without a scheme ("madebyjoao.fr") is treated by the browser as a
// path relative to the current page, so a link on /u/:slug ends up on
// /u/madebyjoao.fr. Prefix https:// so it stays an absolute, external link.
export function externalUrl(url) {
    if (!url) return undefined;

    const trimmed = url.trim();
    if (!trimmed) return undefined;

    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};


