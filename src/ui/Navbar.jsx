import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Home, Coffee, Info, LogIn, ChefHat } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import Button from './Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { getTotalItems } = useCart();
    const { user } = useAuth();

    const totalItems = getTotalItems();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Menu', path: '/menu', icon: Coffee },
        { name: 'About', path: '/about', icon: Info },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                    isScrolled
                        ? "bg-zinc-950/80 backdrop-blur-xl border-white/5 py-4"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container-mobile flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                            <span className="text-2xl">🍔</span>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                            Enantra Food
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={cn(
                                            "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                            isActive ? "text-white" : "text-zinc-400 hover:text-white"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-zinc-800 rounded-full shadow-lg"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <link.icon className="w-4 h-4" />
                                            {link.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to="/cart">
                                <Button variant="ghost" className="relative group p-2">
                                    <ShoppingBag className="w-6 h-6 group-hover:text-orange-400 transition-colors" />
                                    {totalItems > 0 && (
                                        <span className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                                            {totalItems}
                                        </span>
                                    )}
                                </Button>
                            </Link>

                            {user ? (
                                <Link to="/admin">
                                    <Button variant="glass" size="sm" icon={ChefHat} className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                                        {user.email?.split('@')[0]}
                                    </Button>
                                </Link>
                            ) : (
                                <Link to="/admin/login">
                                    <Button variant="primary" size="sm" icon={LogIn}>
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-zinc-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-orange-500/50 transition-colors"
                                >
                                    <link.icon className="w-6 h-6 text-orange-500" />
                                    <span className="text-xl font-semibold text-white">{link.name}</span>
                                </Link>
                            ))}
                            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-orange-500/50 transition-colors">
                                    <ShoppingBag className="w-6 h-6 text-orange-500" />
                                    <span className="text-xl font-semibold text-white">Cart ({totalItems})</span>
                                </div>
                            </Link>

                            {user ? (
                                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="glass" className="w-full mt-4 border-orange-500/30 text-orange-400">
                                        Dashboard ({user.email?.split('@')[0]})
                                    </Button>
                                </Link>
                            ) : (
                                <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" className="w-full mt-4">
                                        Admin Entrance
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
