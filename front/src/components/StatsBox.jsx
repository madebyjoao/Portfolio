export default function StatsBox({ icon, title, number }) {
    return (
        <div className="bg-[rgb(234,228,213)] p-6 rounded-lg">
            <div className="flex">
                {icon}
                <h3 className="text-gray-700 text-sm font-semibold mb-2">
                    {title}
                </h3>
            </div>

            <p className="text-3xl font-bold text-gray-900">{number}</p>
        </div>
    );
}
