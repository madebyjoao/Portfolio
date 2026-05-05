import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const StyledSelect = ({
    value,
    onChange,
    options,
    placeholder = "Select an option",
    isSearchable = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [menuStyle, setMenuStyle] = useState({});
    const triggerRef = useRef(null);
    const menuRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value) || null;

    const filteredOptions = isSearchable
        ? options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
        : options;

    const updateMenuPosition = useCallback(() => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setMenuStyle({
            position: "fixed",
            top: rect.bottom + 6,
            left: rect.left,
            width: rect.width,
            zIndex: 9999,
        });
    }, []);

    const handleOpen = () => {
        updateMenuPosition();
        setIsOpen(true);
        setSearch("");
    };

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
        setSearch("");
    };

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (
                triggerRef.current && !triggerRef.current.contains(e.target) &&
                menuRef.current && !menuRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        window.addEventListener("scroll", updateMenuPosition, true);
        window.addEventListener("resize", updateMenuPosition);
        return () => {
            window.removeEventListener("scroll", updateMenuPosition, true);
            window.removeEventListener("resize", updateMenuPosition);
        };
    }, [isOpen, updateMenuPosition]);

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
                className="w-full flex items-center justify-between text-sm border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-3 py-2 transition bg-(--builder-buttons)/30 text-(--builder-Sidebar-text) hover:border-(--builder-buttons) focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) cursor-pointer"
            >
                <span>{selectedOption ? selectedOption.label : placeholder}</span>
                <svg
                    className={`w-4 h-4 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && createPortal(
                <div
                    ref={menuRef}
                    style={menuStyle}
                    className="bg-(--builder-SideBar) backdrop-blur shadow-lg border-2 border-(--builder-dashboard-border-inputs) rounded-lg py-1 text-sm"
                >
                    {isSearchable && (
                        <div className="px-2 pt-2 pb-1">
                            <input
                                autoFocus
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="w-full px-3 py-2 bg-(--builder-buttons)/30 border border-(--builder-dashboard-border-inputs) rounded-md text-(--builder-Sidebar-text) focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) placeholder:text-gray-400 text-sm"
                            />
                        </div>
                    )}
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.map(opt => (
                            <div
                                key={opt.value}
                                onMouseDown={() => handleSelect(opt)}
                                className={`block px-3 py-2 cursor-pointer select-none rounded-md mx-1 transition duration-200
                                    ${opt.value === value
                                        ? "text-white bg-(--builder-buttons)"
                                        : "text-(--builder-Sidebar-text) hover:bg-(--builder-buttons)/20"
                                    }`}
                            >
                                {opt.label}
                            </div>
                        ))}
                        {filteredOptions.length === 0 && (
                            <div className="px-3 py-2 text-(--builder-Sidebar-text) opacity-50">No results</div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default StyledSelect;
