import { motion } from 'framer-motion';
import clsx from 'clsx';

const GlassCard = ({ children, className, hoverEffect = false, depth = 'sm', onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hoverEffect ? {
                y: -5,
                rotateX: 2,
                rotateY: 2,
                boxShadow: "0 20px 40px -5px rgba(25, 91, 172, 0.15), 0 10px 10px -5px rgba(25, 91, 172, 0.04)"
            } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={clsx(
                'relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem]', // Modern soft rounded styling
                'shadow-glass transition-all duration-300',
                `depth-${depth}`,
                className
            )}
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
