export default function TopAlert({ message }) {
    if (!message) return null;

    return (
        <div className="absolute flex bottom-55 w-auto px-6 pt-4 z-50 right-0">
            <div className="max-w-275 text-center rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-200">
                {message}
            </div>
        </div>
    );
}
