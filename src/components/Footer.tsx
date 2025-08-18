export default function Footer() {
    return (
        <footer className="border-t border-black/5">
            <div className="container-page py-10 text-sm flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-lg bg-brand" />
                    <span className="font-semibold">Lessn</span>
                </div>

                {/* Center: Links */}
                <div className="flex gap-5 text-black/60 sm:justify-center">
                    <a href="/privacy" className="hover:opacity-70">Privacy</a>
                    <a href="/terms" className="hover:opacity-70">Terms</a>
                    <a href="mailto:hello@lessn.app" className="hover:opacity-70">Contact</a>
                </div>

                {/* Right: Company + Copyright */}
                <div className="flex flex-col sm:items-end text-black/60 gap-1">
                    <span>Lessn is built by Brinl, LLC.</span>
                    <span>© {new Date().getFullYear()} Brinl, LLC. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
