const faqs = [
    { q: "How does Lessn create lesson plans?", a: "Upload a PDF or handout, or scan any document, and Lessn organizes it into a clear plan with objectives, timing, and resources you can adjust to fit your class." },
    { q: "Can I tailor lessons for different student needs?", a: "Yes. With KIN (Knowledge Is Nurtured), you can generate versions of lessons and worksheets that match different levels, language learners, and accommodations." },
    { q: "Does Lessn provide feedback on teaching materials?", a: "Yes. When you scan or upload a document, Lessn gives you quick, practical feedback based on good teaching practice, and it always stays on your device." },
    { q: "Where is my data stored?", a: "Everything stays securely on your phone. Your plans, materials, and student information are never sent to external servers." },
    { q: "What devices can I use Lessn on?", a: "Lessn works on iPhone and iPad through TestFlight during early access. Support for more devices is planned as the app grows." }
];

export default function FAQ() {
    return (
        <section id="faq" className="container-page py-14 sm:py-16">
            <h2 className="h2">Questions, answered</h2>
            <div className="mt-6 grid gap-4">
                {faqs.map(item => (
                    <details key={item.q} className="card p-5">
                        <summary className="font-semibold cursor-pointer">{item.q}</summary>
                        <p className="muted mt-2">{item.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
