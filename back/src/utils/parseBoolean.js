// Multipart form fields always arrive as strings, and clients differ on what
// they send for a boolean: a <select> may post "1"/"0" while a value that went
// through a schema parser posts "true"/"false". Accept both so a visibility
// flag can't be silently flipped to false by a mismatched representation.
function parseBoolean(value, fallback) {
    if (value === undefined || value === null || value === "") {
        return fallback;
    }

    if (typeof value === "boolean") {
        return value;
    }

    const normalized = String(value).trim().toLowerCase();

    if (["1", "true", "yes", "on"].includes(normalized)) {
        return true;
    }

    if (["0", "false", "no", "off"].includes(normalized)) {
        return false;
    }

    return fallback;
}

export { parseBoolean };
