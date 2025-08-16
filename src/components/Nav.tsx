"use client";

import Link from "next/link";
import { useState } from "react";
import GetTestFlightButton from "@/components/GetTestFlightButton";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-[#1c1c4c] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Brand */}
                    <Link href="/" className="text-2xl font-bold text-[#5f5ffd]">
                        Lessn
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="#features" className="hover:text-[#7f7ffd]">
                            Features
                        </Link>
                        <Link href="#contact" className="hover:text-[#7f7ffd]">
                            Contact
                        </Link>
                        {/* TestFlight Button */}
                        <GetTestFlightButton className="ml-4" />
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {menuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    <Link
                        href="#features"
                        className="block hover:text-[#7f7ffd]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Features
                    </Link>
                    <Link
                        href="#pricing"
                        className="block hover:text-[#7f7ffd]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#contact"
                        className="block hover:text-[#7f7ffd]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </Link>
                    {/* TestFlight Button in mobile */}
                    <GetTestFlightButton className="block w-full mt-3" />
                </div>
            )}
        </nav>
    );
}
