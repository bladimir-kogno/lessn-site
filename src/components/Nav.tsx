"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
    const IOS_URL = process.env.NEXT_PUBLIC_IOS_URL ?? "/download";
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelHeight, setPanelHeight] = useState(0);

    // Track if user is at top of page
    const [atTop, setAtTop] = useState(true);
    useEffect(() => {
        const onScroll = () => setAtTop(window.scrollY === 0);
        onScroll(); // initial
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Measure mobile panel height
    useEffect(() => {
        if (panelRef.current) setPanelHeight(panelRef.current.scrollHeight);
    }, [open]);

    // Close on Esc
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <nav className="sticky top-0 z-50 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo/leson_leaf_logo.svg"
                        alt="Lessn"
                        width={100}
                        height={100}
                        priority
                    />
                </Link>

                {/* Right: CTA + Desktop links + Burger */}
                <div className="flex items-center gap-4">
                    {/* CTA */}
                    <a
                        href={IOS_URL}
                        className="inline-flex items-center rounded-md bg-black px-4 py-2 text-xs md:text-sm font-semibold text-white leading-none active:scale-[0.99] transition"
                    >
                        Get Lessn free
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
                        <Link href="#features" className="hover:text-black transition">
                            Features
                        </Link>
                        <Link href="#contact" className="hover:text-black transition">
                            Contact
                        </Link>
                    </div>

                    {/* Burger (mobile only) */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={open}
                        aria-controls="mobile-panel"
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md md:hidden active:scale-[0.98] transition"
                    >
                        <svg
                            className="h-5 w-5 text-black"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Soft bottom border (only when scrolled) */}
            <div
                aria-hidden
                className={[
                    "pointer-events-none relative h-0",
                    "after:absolute after:inset-x-0 after:-bottom-px",
                    "after:h-px after:bg-black/10",
                    "after:transition-opacity after:duration-200",
                    atTop ? "after:opacity-0" : "after:opacity-100",
                ].join(" ")}
            />

            {/* Mobile slide-down menu */}
            <div
                id="mobile-panel"
                className="md:hidden overflow-hidden transition-[max-height] duration-200 ease-out border-t border-black/5"
                style={{ maxHeight: open ? panelHeight : 0 }}
            >
                <div ref={panelRef}>
                    <div className="px-4 py-2">
                        <Link
                            href="#features"
                            className="block px-1 py-3 text-sm text-gray-900"
                            onClick={() => setOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="#contact"
                            className="block px-1 py-3 text-sm text-gray-900"
                            onClick={() => setOpen(false)}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}