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


