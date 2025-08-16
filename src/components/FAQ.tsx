const faqs = [
    { q: "Is Lessn free to try?", a: "Yes. Join our TestFlight to try it free during beta." },
    { q: "Can I export plans?", a: "PDF and DOCX exports are available, with share links coming soon." },
    { q: "Does it work offline?", a: "Draft and edit offline; we sync once you’re back online." }
];

export default function FAQ() {
    return (
        <section id="faq" className="container-page py-14 sm:py-16">
            <h2 className="h2">FAQ</h2>
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
