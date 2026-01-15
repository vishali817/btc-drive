import { useState } from 'react';
import { motion } from 'framer-motion';
import FolderTile from './FolderTile';
import FileTile from './FileTile';
import ActionTile from './ActionTile';
import { useNavigate } from 'react-router-dom';
import FilePreviewModal from '../modals/FilePreviewModal';
import UploadModal from '../modals/UploadModal';

const DriveGrid = ({ items, viewMode }) => {
    const navigate = useNavigate();
    const [previewFile, setPreviewFile] = useState(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const handleItemClick = (item) => {
        if (item.type === 'folder') {
            navigate(`/folder/${item.id}`);
        } else if (item.type === 'file') {
            setPreviewFile(item);
        } else if (item.type === 'action') {
            setIsUploadOpen(true);
        }
    };

    // List View Render
    if (viewMode === 'list') {
        return (
            <>
                <div className="flex flex-col gap-2">
                    {items.map(item => (
                        <div
                            key={item.id || item.name}
                            onClick={() => handleItemClick(item)}
                            className="flex items-center gap-4 p-4 bg-white/40 rounded-xl hover:bg-white/80 transition-colors border border-transparent hover:border-gray-200 cursor-pointer group"
                        >
                            {/* Icon/Type */}
                            <div className="w-10 flex justify-center flex-shrink-0">
                                {/* Simplified Type Icon or Text */}
                                <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-primary transition-colors">
                                    {item.type === 'action' ? 'NEW' : item.type === 'folder' ? 'DIR' : item.fileType ? item.fileType.substring(0, 3) : 'FILE'}
                                </span>
                            </div>

                            {/* Name & Type Label */}
                            <div className="flex-1 flex items-center gap-4 min-w-0">
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="font-medium text-gray-700 truncate block text-sm">{item.name}</span>
                                </div>

                                {/* Fixed Type Label to prevent collision */}
                                <div className="w-24 hidden md:block flex-shrink-0">
                                    <span className="text-xs font-bold text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis block text-center">
                                        {item.type === 'folder' ? 'Folder' : item.fileType || 'File'}
                                    </span>
                                </div>
                            </div>

                            {/* Meta / Size */}
                            <div className="w-24 text-right flex-shrink-0">
                                <span className="text-sm text-gray-500 font-medium">{item.meta || item.size}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Preview Modal (List View Context) */}
                <FilePreviewModal file={previewFile} isOpen={!!previewFile} onClose={() => setPreviewFile(null)} />
            </>
        );
    }

    // Grid View Render
    return (
        <>
            <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
                {items.map((item, index) => {
                    const key = item.id || index;

                    if (item.type === 'folder') {
                        return <FolderTile key={key} folder={item} onClick={() => handleItemClick(item)} />;
                    }

                    if (item.type === 'file') {
                        // Pass onClick if FileTile supports it, otherwise wrap it
                        return (
                            <div key={key} onClick={() => handleItemClick(item)}>
                                <FileTile file={item} />
                            </div>
                        );
                    }

                    if (item.type === 'action') {
                        return <ActionTile key={key} action={item} onClick={() => handleItemClick(item)} />;
                    }

                    return null;
                })}
            </motion.div>

            {/* Preview Modal (Grid View Context) */}
            <FilePreviewModal file={previewFile} isOpen={!!previewFile} onClose={() => setPreviewFile(null)} />
            <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
        </>
    );
};

export default DriveGrid;
