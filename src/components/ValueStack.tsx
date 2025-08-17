const items = [
    { t: "Clarity", d: "Objectives and success criteria embedded in every plan." },
    { t: "Engagement", d: "Activities and checks for understanding prepared and ready." },
    { t: "Simplicity", d: "Time blocks, resources, and exports managed seamlessly." },
    { t: "Impact", d: "Differentiation and reflection close the loop with purpose." }
];

export default function ValueStack() {
    return (
        <section id="how" className="bg-brand-tint/60">
            <div className="container-page py-14 sm:py-16">
                <h2 className="h2">Built on what matters</h2>
                <div className="grid mt-6 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map(x => (
                        <div key={x.t} className="card p-6">
                            <h3 className="font-semibold">{x.t}</h3>
                            <p className="muted mt-2">{x.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
