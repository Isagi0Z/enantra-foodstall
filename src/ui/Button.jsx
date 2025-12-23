import { motion } from 'framer-motion';
import { cn } from '../utils/cn'; // We need to create this util or usage clsx directly

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon: Icon,
    isLoading,
    ...props
}) {
    const baseStyles = "relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

    const variants = {
        primary: "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02]",
        secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
        outline: "bg-transparent border-2 border-orange-500/50 text-orange-500 hover:bg-orange-500/10",
        ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
        glass: "bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "p-3"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            ) : Icon ? (
                <Icon className="w-5 h-5 mr-2" />
            ) : null}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>

            {/* Shine effect for primary variant */}
            {variant === 'primary' && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            )}
        </motion.button>
    );
}

// Helper for class merging if not already explicitly created, or I can create a new util file
// For now, I'll inline the import above but I need to ensure utils/cn exists.
