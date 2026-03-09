export default function TopAlert({ message }) {
  if (!message) return null;

  return (
    <div className="w-full px-6 pt-4">
      <div className="mx-auto max-w-[1100px] rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-200">
        {message}
      </div>
    </div>
  );
}