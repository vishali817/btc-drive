import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownMenu = ({ isOpen, onClose, triggerRef, children, align = "right", width = "w-64" }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, triggerRef]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full mt-2 ${align === "right" ? "right-0" : "left-0"} ${width} bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden`}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DropdownMenu;
