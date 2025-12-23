import { useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { ChevronRight, ShoppingBag } from 'lucide-react';

const Hero3D = lazy(() => import('./Hero3D'));

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center -mt-20 pt-20">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-zinc-950" />}>
        <Hero3D />
      </Suspense>
      <div className="absolute inset-0 bg-zinc-950/30" />

      <div className="container-mobile relative z-10 grid lg:grid-cols-2 gap-12 items-center py-12">
        {/* Text Content */}
        <div className="text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-4 backdrop-blur-sm">
              🚀 The Future of Campus Dining
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-tight text-white drop-shadow-2xl">
              Taste the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Extraordinary
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 mt-6 leading-relaxed">
              Experience the fastest, freshest, and most futuristic food ordering platform.
              Your cravings, delivered with style.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/menu')}
              icon={ChevronRight}
              className="text-lg"
            >
              Start Ordering
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => navigate('/menu')}
              icon={ShoppingBag}
              className="text-lg"
            >
              Browse Menu
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8"
          >
            {[
              { label: 'Wait Time', value: '< 15m' },
              { label: 'Rating', value: '4.3/5' },
              { label: 'Active Stalls', value: '1' },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative Space (can be used for more 3D interactions or left open for the background) */}
        <div className="hidden lg:block h-full min-h-[500px]" />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}

