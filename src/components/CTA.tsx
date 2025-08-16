import GetTestFlightButton from "@/components/GetTestFlightButton";

export default function CTA() {
    const IOS_URL = process.env.NEXT_PUBLIC_IOS_URL; // optional for live badge

    return (
        <section className="container-page py-16">
            <div className="card p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-tr from-brand to-brand-200 text-white">
                <div>
                    <h3 className="text-2xl font-bold">Your next lesson plan is minutes away</h3>
                    <p className="opacity-90 mt-2">Try Lessn with your next unit.</p>
                </div>

                {IOS_URL ? (
                    <a href={IOS_URL} className="btn bg-white text-brand hover:bg-white/90" aria-label="Download on the App Store">
                        Download on the App Store
                    </a>
                ) : (
                    <GetTestFlightButton className="bg-white text-brand hover:bg-white/90" />
                )}
            </div>
        </section>
    );
}
