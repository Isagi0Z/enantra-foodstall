import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import { useEffect } from 'react';

export default function RootLayout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-white/5 bg-zinc-950 py-8 mt-20">
                <div className="container-mobile text-center">
                    <p className="text-zinc-500">
                        © {new Date().getFullYear()} Enantra Food Stall. Crafted with 🧡 by your friendly CEGian.
                    </p>
                </div>
            </footer>
        </div>
    );
}
