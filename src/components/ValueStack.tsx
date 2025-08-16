const items = [
    { t: "Make it obvious", d: "Clear objectives and success criteria visible in every plan." },
    { t: "Make it engaging", d: "Varied activities and checks for understanding ready to go." },
    { t: "Make it easy", d: "Time blocks, materials and exports handled for you." },
    { t: "Make it meaningful", d: "Differentiation and reflection close the loop." }
];

export default function ValueStack() {
    return (
        <section id="how" className="bg-brand-tint/60">
            <div className="container-page py-14 sm:py-16">
                <h2 className="h2">Less friction, better classes</h2>
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
