const features = [
    {
        title: "Plan in minutes",
        desc: "Objectives, sequence, timing and resources auto-generated and editable.",
    },
    {
        title: "Differentiation built in",
        desc: "Instant adjustments for varied levels, ELL, and accommodations.",
    },
    {
        title: "Everything organized",
        desc: "Lessons, attachments and notes live in one place and stay synced.",
    }
];

export default function FeatureCards() {
    return (
        <section id="features" className="container-page py-14 sm:py-16">
            <h2 className="h2 text-center">Built to act, not to complicate</h2>
            <p className="muted text-center mt-2">
                Just the pieces you need for today’s plan—and tomorrow’s improvement.
            </p>
            <div className="grid gap-6 mt-8 md:grid-cols-3">
                {features.map(f => (
                    <article key={f.title} className="card p-6">
                        <div className="h-10 w-10 rounded-lg bg-brand/10 border border-brand/20" />
                        <h3 className="font-semibold text-lg mt-4">{f.title}</h3>
                        <p className="muted mt-2">{f.desc}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
