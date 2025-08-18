"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
    const IOS_URL = process.env.NEXT_PUBLIC_IOS_URL ?? "/download";
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) setOpen(false);
        }
        if (open) document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    // Close on Escape
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center">
                    <Image src="/brinl_logo.svg" alt="Lessn" width={28} height={28} priority />
                </Link>

                {/* Right: CTA + Links (desktop) + Burger (mobile) */}
                <div className="relative flex items-center gap-4" ref={menuRef}>
                    {/* CTA button (always visible) */}
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

                    {/* Mobile burger (no hover effect) */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
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

                    {/* Mobile dropdown */}
                    {open && (
                        <div
                            id="mobile-menu"
                            role="menu"
                            aria-label="Main menu"
                            className="absolute right-0 top-[calc(100%+8px)] w-48 overflow-hidden rounded-lg border border-black/10 bg-white shadow-lg ring-1 ring-black/5 md:hidden"
                        >
                            <Link
                                href="#features"
                                role="menuitem"
                                className="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-50"
                                onClick={() => setOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#contact"
                                role="menuitem"
                                className="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-50"
                                onClick={() => setOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
