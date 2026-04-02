import { useEffect, useState } from "react";

function getInitialTheme() {
    const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)",
    )?.matches;
    return prefersDark ? "dark" : "light";
}

export function ThemeToggle() {
    const [theme, setTheme] = useState(() => getInitialTheme());

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
    }

    return (
        <button
            className="themeToggle"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={theme === "dark"}
        >
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
}
