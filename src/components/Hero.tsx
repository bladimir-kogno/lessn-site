import GetTestFlightButton from "@/components/GetTestFlightButton";

type Props = { imageUrl: string };

export default function Hero({ imageUrl }: Props) {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* Plain white background */}
            <div className="absolute inset-0 -z-10 bg-white" />

            <div className="container-page py-14 sm:py-20 lg:py-24">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                    <div>
                        <span className="badge">Refined lesson planning</span>
                        <h1 className="h1 mt-4">
                            Plan in minutes. Teach with focus. Deliver smarter.
                        </h1>
                        <p className="muted mt-4 text-lg">
                            Lessn generates complete lesson plans, adapts for different needs,
                            and keeps everything organized, so you spend less time planning
                            and more time teaching.
                        </p>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <GetTestFlightButton />

                            <a
                                className="btn-outline"
                                href="#features"
                                aria-label="See Lessn features"
                            >
                                See features
                            </a>
                        </div>

                        <p className="text-sm mt-3 text-black/50">
                            Available soon on the App Store.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[5/4] w-full rounded-xl2 overflow-hidden border border-black/5 shadow-card">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://res.cloudinary.com/dvexnl19a/image/upload/v1755384930/lessn_image1_rag63f.jpg"
                                alt="Lessn app preview"
                                className="h-full w-full object-cover"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
