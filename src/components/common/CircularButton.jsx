import { motion } from 'framer-motion';
import clsx from 'clsx';

const CircularButton = ({
    children,
    onClick,
    className,
    active = false,
    size = 'md'
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10', // Made slightly smaller for modern look
        lg: 'w-14 h-14',
        xl: 'w-16 h-16'
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={clsx(
                'rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden',
                'backdrop-blur-sm border border-transparent hover:shadow-md',
                active ? 'bg-primary text-white shadow-primary/30' : 'bg-surface text-text-secondary hover:bg-white hover:text-primary hover:border-gray-100',
                sizeClasses[size],
                className
            )}
        >
            {/* Glow Effect on Active */}
            {active && (
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 opacity-100 z-[-1]" />
            )}
            {children}
        </motion.button>
    );
};

export default CircularButton;
