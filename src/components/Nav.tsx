"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Nav() {
    const IOS_URL = process.env.NEXT_PUBLIC_IOS_URL ?? "/download";

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Heights for pushing page content down when nav (and mobile panel) is fixed
    const navRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [navHeight, setNavHeight] = useState(0);
    const [panelHeight, setPanelHeight] = useState(0);

    // Track scroll to toggle soft bottom line
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        onScroll(); // initial
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Measure nav height and (when open) panel height
    const measure = () => {
        if (navRef.current) setNavHeight(navRef.current.offsetHeight);
        if (panelRef.current) setPanelHeight(panelRef.current.scrollHeight);
    };
    useLayoutEffect(() => {
        measure();
        const onResize = () => measure();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        // Recalc when menu opens/closes (panel height can change)
        measure();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // Close on Esc (mobile)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    // Total space to reserve below the fixed nav
    const spacerHeight = navHeight + (open ? panelHeight : 0);

    return (
        <>
            {/* FIXED NAV */}
            <nav className="fixed inset-x-0 top-0 z-50 bg-white">
                <div ref={navRef} className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
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

                    {/* Right: CTA + Links (desktop) + Burger (mobile) */}
                    <div className="flex items-center gap-4">
                        {/* CTA */}
                        <a
                            href={IOS_URL}
                            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-xs md:text-sm font-semibold text-white leading-none active:scale-[0.99] transition"
                        >
                            Get Lessn free
                        </a>

                        {/* Desktop links (order: Features, Contact) */}
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
                            <Link href="#features" className="hover:text-black transition">Features</Link>
                            <Link href="#contact" className="hover:text-black transition">Contact</Link>
                        </div>

                        {/* Burger (mobile only, no hover bg) */}
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

                {/* Soft bottom line: ONLY when scrolled */}
                <div
                    aria-hidden
                    className={[
                        "pointer-events-none relative h-0",
                        "after:absolute after:inset-x-0 after:-bottom-px",
                        "after:h-px after:bg-black/10",
                        "after:transition-opacity after:duration-200",
                        scrolled ? "after:opacity-100" : "after:opacity-0",
                    ].join(" ")}
                />

                {/* MOBILE COLLAPSIBLE PANEL (in-flow inside fixed nav) */}
                <div
                    id="mobile-panel"
                    className={[
                        "md:hidden overflow-hidden transition-[max-height] duration-200 ease-out",
                        open ? "border-t border-black/5" : "", // no constant line when closed
                    ].join(" ")}
                    style={{ maxHeight: open ? panelHeight : 0 }}
                >
                    <div ref={panelRef}>
                        <div className="px-4 py-2">
                            <Link href="#features" className="block px-1 py-3 text-sm text-gray-900" onClick={() => setOpen(false)}>
                                Features
                            </Link>
                            <Link href="#contact" className="block px-1 py-3 text-sm text-gray-900" onClick={() => setOpen(false)}>
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* SPACER so content is pushed down by the fixed nav + mobile panel */}
            <div style={{ height: spacerHeight }} />
        </>
    );
}
