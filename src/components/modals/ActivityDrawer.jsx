import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ActivityDrawer = ({ isOpen, onClose }) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Detailed Activity List */}
                            <div className="space-y-6 relative">
                                {[1, 2, 3, 4, 5].map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 rounded-full bg-primary z-10" />
                                            {index !== 4 && <div className="w-px h-full bg-gray-200 mt-1" />}
                                        </div>
                                        <div className="pb-6">
                                            <p className="text-sm font-medium text-gray-800">File uploaded</p>
                                            <p className="text-xs text-gray-500 mt-1">Project_Specs_v2.pdf</p>
                                            <p className="text-[10px] text-gray-400 mt-2">Today, 10:23 AM</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ActivityDrawer;
