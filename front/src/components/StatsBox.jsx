export default function StatsBox({ icon, title, number }) {
    return (
        <div className="flex flex-col justify-center items-center backdrop-blur bg-white/1 p-6 rounded-lg">
            <div className="flex items-center justify-center gap-2">
                {icon}
                <h3 className="text-(--text-website) text-sm font-semibold">
                    {title}
                </h3>
            </div>

            <p className=" self-start text-3xl font-bold">{number}</p>
        </div>
    );
}
