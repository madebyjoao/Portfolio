export default function AboutBox({ about_title, about_text }) {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">{about_title}</h1>
            <p>{about_text}</p>
        </div>
    );
}
