export default function AboutBox({ about_title, about_text }) {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-lg md:text-xl font-semibold">{about_title}</h1>
            <p className="text-sm md:text-base leading-relaxed">{about_text}</p>
        </div>
    );
}
