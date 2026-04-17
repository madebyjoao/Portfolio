export default function StatsBox({ icon, title, number }) {
    return (
        <div className="backdrop-blur bg-white/1 p-6 rounded-lg">
            <div className="flex">
                {icon}
                <h3 className="text-(--text-website) text-sm font-semibold mb-2">
                    {title}
                </h3>
            </div>

            <p className="text-3xl font-bold">{number}</p>
        </div>
    );
}
