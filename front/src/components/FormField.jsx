export default function FormField({
    label,
    id,
    type = "text",
    register,
    required = false,
    rows = 4,
    options = [],
    placeholder = "",
}) {
    if (type === "textarea") {
        return (
            <div>
                <label htmlFor={id}>{label}</label>
                <textarea
                    id={id}
                    {...register(id)}
                    rows={rows}
                    placeholder={placeholder}
                />
            </div>
        );
    }

    if (type === "select") {
        return (
            <div>
                <label htmlFor={id}>{label}</label>
                <select id={id} {...register(id)}>
                    <option value="">Sélectionner {label.toLowerCase()}</option>
                    {Array.isArray(options) &&
                        options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                </select>
            </div>
        );
    }

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                {...register(id)}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
}
