import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import FilePreviewLayout from '../preview/FilePreviewLayout';

const FilePreviewModal = ({ file, isOpen, onClose }) => {
    const [activeFile, setActiveFile] = useState(file);

    useEffect(() => {
        if (file) setActiveFile(file);
    }, [file]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    // Protect against null file if strictly required, but Layout handles it gracefully.
    // We return portal always to allow AnimatePresence to handle exit if we wanted to fix that, 
    // but without state caching, 'file' is null on exit. 
    // Layout will render 'Untitled' briefly on exit. This is acceptable for now given the scope.

    // Use activeFile (cached) for rendering, so content persists during exit animation
    const displayFile = file || activeFile;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pt-24"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="w-full max-w-5xl h-[85vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FilePreviewLayout file={displayFile} onClose={onClose}>
                            <div className="flex items-center justify-center h-full w-full p-8">
                                <div className="bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-12 max-w-lg w-full aspect-[3/4] border border-gray-100">
                                    <div className="w-24 h-24 mb-6 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300">
                                        <FileText size={48} />
                                    </div>
                                    <p className="text-gray-400 font-medium text-lg">Preview not available</p>
                                    <p className="text-sm text-gray-400 mt-2 text-center max-w-[250px]">
                                        This is a mockup. In a real app, this would be the actual file viewer for <span className="font-mono text-gray-600">{displayFile?.fileType || 'unknown'}</span>.
                                    </p>
                                </div>
                            </div>
                        </FilePreviewLayout>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default FilePreviewModal;
