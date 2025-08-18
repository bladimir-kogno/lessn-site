"use client";
import Link from "next/link";
import Image from "next/image";

export default function MobileNav() {
    const IOS_URL = process.env.NEXT_PUBLIC_IOS_URL ?? "/download";

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5">
            {/* Safe area + compact height like the screenshot */}
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/brinl_logo.svg" // your logo in /public
                        alt="Lessn"
                        width={28}
                        height={28}
                        priority
                    />
                </Link>

                {/* Right: CTA + Hamburger */}
                <div className="flex items-center gap-3">
                    <a
                        href={IOS_URL}
                        className="inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white leading-none active:scale-[0.99] transition"
                    >
                        Get Lessn free
                    </a>

                    <button
                        type="button"
                        aria-label="Open menu"
                        className="inline-flex h-9 w-9 items-center justify-center hover:bg-gray-100 active:scale-[0.98] transition rounded-md"
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
        </nav>
    );
}
