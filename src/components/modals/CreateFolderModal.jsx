import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, X } from 'lucide-react';

const CreateFolderModal = ({ isOpen, onClose, onCreate }) => {
    const [folderName, setFolderName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (folderName.trim()) {
            onCreate(folderName);
            setFolderName('');
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <FolderPlus className="text-primary" size={20} />
                                    New Folder
                                </h3>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Folder name"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all mb-6"
                                />

                                <div className="flex gap-3 justify-end">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!folderName.trim()}
                                        className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-lg shadow-lg shadow-primary/30 disabled:opacity-50 disabled:shadow-none transition-all"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateFolderModal;
