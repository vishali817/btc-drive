import { FileText, Download, Share2, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilePreviewModal = ({ file, isOpen, onClose }) => {
    if (!file) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pt-20"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <FileText size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{file.name}</h3>
                                    <span className="text-xs text-gray-500">{file.size} • {file.fileType || 'File'}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                                    <Star size={20} />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                                    <Share2 size={20} />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                                    <Download size={20} />
                                </button>
                                <div className="w-px h-6 bg-gray-200 mx-2" />
                                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 overflow-hidden relative">
                            {/* Abstract Preview Placeholder */}
                            <div className="bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-20 max-w-lg w-full aspect-[3/4]">
                                <div className="w-24 h-24 mb-6 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300">
                                    <FileText size={48} />
                                </div>
                                <p className="text-gray-400 font-medium">Preview not available</p>
                                <p className="text-xs text-gray-300 mt-2 text-center max-w-[200px]">
                                    This is a mockup. In a real app, this would be the actual file viewer for {file.fileType}.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FilePreviewModal;
