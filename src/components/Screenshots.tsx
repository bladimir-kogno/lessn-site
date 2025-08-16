"use client";
import {useState} from "react";

const SHOTS = [
    {src: "/images/screen-1.png", caption: "AI Lesson Generator"},
    {src: "/images/screen-2.png", caption: "Differentiated Activities"},
    {src: "/images/screen-3.png", caption: "Export & Share Instantly"},
];

export default function Screenshots() {
    const [i, setI] = useState(0);
    const go = (d: number) => setI((p) => (p + d + SHOTS.length) % SHOTS.length);

    return (
        <section id="screens" className="container-page py-16">
            <h2 className="h2 text-center">See Lessn in Action</h2>
            <div className="mt-8 relative max-w-4xl mx-auto">
                <div className="aspect-[9/16] w-full overflow-hidden rounded-xl2 border border-black/5 shadow-card bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={SHOTS[i].src} alt={SHOTS[i].caption} className="h-full w-full object-cover" />
                </div>

                <button
                    onClick={() => go(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/90 border border-black/10 shadow hover:bg-white"
                    aria-label="Previous"
                >‹</button>
                <button
                    onClick={() => go(1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/90 border border-black/10 shadow hover:bg-white"
                    aria-label="Next"
                >›</button>

                <p className="text-center mt-4 text-black/70">{SHOTS[i].caption}</p>

                <div className="mt-3 flex justify-center gap-2">
                    {SHOTS.map((_, idx) => (
                        <button key={idx}
                                onClick={() => setI(idx)}
                                className={`h-2.5 w-2.5 rounded-full ${i===idx ? "bg-brand" : "bg-black/15"}`}
                                aria-label={`Go to slide ${idx+1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
