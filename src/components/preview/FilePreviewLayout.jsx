import React from 'react';
import { FileText, Download, Share2, Star, X } from 'lucide-react';

const FilePreviewLayout = ({ file, onClose, children }) => {
    return (
        <div className="flex flex-col w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden relative">
            {/* Header: Sticky and Flex */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shadow-sm flex-shrink-0">
                {/* Left: File Info */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <FileText size={20} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h3 className="text-sm font-bold text-gray-800 truncate pr-4" title={file?.name}>
                            {file?.name || 'Untitled'}
                        </h3>
                        <span className="text-xs text-gray-500 truncate">
                            {file?.size || 'Unknown size'} • {file?.fileType || 'File'}
                        </span>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors" title="Star">
                        <Star size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors" title="Share">
                        <Share2 size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors" title="Download">
                        <Download size={20} />
                    </button>
                    <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block" />
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                        title="Close"
                    >
                        <X size={22} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-gray-50 relative">
                {children}
            </div>
        </div>
    );
};

export default FilePreviewLayout;
