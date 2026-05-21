import { Navigate } from "react-router";

export function DesktopCheck({ children }) {
    if (!window.matchMedia("(min-width: 1024px)").matches) {
        return (
            <Navigate
                to="/"
                replace
                state={{ alertMessage: "The builder is only available on desktop." }}
            />
        );
    }

    return children;
}