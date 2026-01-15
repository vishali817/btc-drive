import { useState } from 'react';
import { Plus, FileUp, FolderUp, FolderPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadButton = ({ onAction }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { icon: FileUp, label: 'Upload File', color: 'bg-blue-600' },
        { icon: FolderUp, label: 'Upload Folder', color: 'bg-purple-600' },
        { icon: FolderPlus, label: 'New Folder', color: 'bg-emerald-600' },
    ];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsOpen(false)}
                />
            )}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-auto">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            className="mb-4 flex flex-col gap-3 items-end"
                        >
                            {menuItems.map((item, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => {
                                        onAction(item.label);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-3 group relative z-50 cursor-pointer"
                                >
                                    <span className="bg-white px-3 py-1 rounded-lg text-sm font-medium shadow-md text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {item.label}
                                    </span>
                                    <div className={`w-12 h-12 rounded-full ${item.color} text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
                                        <item.icon size={20} />
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-floating transition-all duration-300 z-50 cursor-pointer ${isOpen ? 'bg-white text-gray-800 rotate-45' : 'bg-primary text-white rotate-0'}`}
                >
                    <Plus size={28} />
                </motion.button>
            </div>
        </>
    );
};

export default UploadButton;
