import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Trash = () => {
    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Trash</h1>
                    <p className="text-gray-500 mt-1">Items in trash are deleted forever after 30 days.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-primary font-medium hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors"
                >
                    Empty Trash
                </motion.button>
            </header>

            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center mb-6 border border-white shadow-inner">
                    <Trash2 size={48} className="text-gray-300" />
                </div>
                <h2 className="text-lg font-medium text-gray-600">Trash is empty</h2>
                <p className="text-gray-400 text-sm mt-2">Good for you! Keeping things clean.</p>
            </div>
        </div>
    );
};

export default Trash;
