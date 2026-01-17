import { useState } from 'react';
import { motion } from 'framer-motion';
import FolderTile from './FolderTile';
import FileTile from './FileTile';
import ActionTile from './ActionTile';
import { useNavigate } from 'react-router-dom';
import FilePreviewModal from '../modals/FilePreviewModal';
import UploadModal from '../modals/UploadModal';
import { Info } from 'lucide-react';

const DriveGrid = ({ items, viewMode, searchQuery }) => {
    const navigate = useNavigate();
    const [previewFile, setPreviewFile] = useState(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [detailsFile, setDetailsFile] = useState(null);

    // Highlight Helper
    const getHighlightedName = (name) => {
        if (!searchQuery || typeof name !== 'string') return name;
        const parts = name.split(new RegExp(`(${searchQuery})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ?
                        <span key={i} className="bg-yellow-200 text-gray-900 rounded-[2px] px-0.5">{part}</span> : part
                )}
            </>
        );
    };

    // Process items to include highlighted names
    // We clone the item to avoid mutation, replacing name with JSX if needed
    // However, if Tiles rely on 'name' being string for props/meta, this might cause shallow issues.
    // React renders Objects/Arrays? No. But it renders Components/Elements.
    // We trust Tiles simply render {item.name}.
    const processedItems = items.map(item => ({
        ...item,
        name: getHighlightedName(item.name)
    }));

    const handleItemClick = (item) => {
        if (item.type === 'folder') {
            navigate(`/folder/${item.id}`);
        } else if (item.type === 'file') {
            setPreviewFile(item);
        } else if (item.type === 'action') {
            setIsUploadOpen(true);
        }
    };

    const handleDetailsClick = (e, item) => {
        e.stopPropagation();
        setDetailsFile(item);
    };

    // Details Modal
    const DetailsModal = ({ file, onClose }) => {
        if (!file) return null;
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-end bg-black/20 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="w-full max-w-sm h-full bg-white shadow-2xl p-6 overflow-y-auto border-l border-gray-100"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-[#0B1F3A]">File Details</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">✕</button>
                    </div>

                    <div className="space-y-8">
                        <div className="flex flex-col items-center text-center p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-blue-50">
                                <span className="text-3xl font-bold text-[#0B1F3A] uppercase">
                                    {file.fileType || 'DIR'}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 break-all leading-tight">{file.name}</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1 block">Type</label>
                                <p className="text-gray-700 font-medium border-b border-gray-100 pb-2">{file.type === 'folder' ? 'Folder' : (file.fileType || 'File').toUpperCase()}</p>
                            </div>
                            <div className="group">
                                <label className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1 block">Size</label>
                                <p className="text-gray-700 font-medium border-b border-gray-100 pb-2">{file.size || file.meta || 'Unknown'}</p>
                            </div>
                            <div className="group">
                                <label className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1 block">Owner</label>
                                <p className="text-gray-700 font-medium border-b border-gray-100 pb-2">{file.sharedBy || 'Me'}</p>
                            </div>
                            <div className="group">
                                <label className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1 block">Created</label>
                                <p className="text-gray-700 font-medium border-b border-gray-100 pb-2">{file.createdAt || 'Jan 10, 2026'}</p>
                            </div>
                            <div className="group">
                                <label className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1 block">Modified</label>
                                <p className="text-gray-700 font-medium border-b border-gray-100 pb-2">{file.modifiedAt || 'Jan 14, 2026'}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

    // List View Render
    if (viewMode === 'list') {
        return (
            <>
                <div className="flex flex-col gap-2">
                    {processedItems.map(item => (
                        <div
                            key={item.id || item.name}
                            onClick={() => handleItemClick(item)}
                            className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white transition-all border border-transparent hover:border-blue-100 cursor-pointer group shadow-sm hover:shadow-md"
                        >
                            <div className="w-10 flex justify-center flex-shrink-0">
                                <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-[#0B1F3A] transition-colors">
                                    {item.type === 'action' ? 'NEW' : item.type === 'folder' ? 'DIR' : item.fileType ? item.fileType.substring(0, 3) : 'FILE'}
                                </span>
                            </div>

                            <div className="flex-1 flex items-center gap-4 min-w-0">
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="font-medium text-gray-700 truncate block text-sm group-hover:text-[#0B1F3A] transition-colors">{item.name}</span>
                                </div>
                                <div className="w-24 hidden md:block flex-shrink-0">
                                    <span className="text-xs font-bold text-gray-400 uppercase bg-gray-100/80 px-2 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis block text-center">
                                        {item.type === 'folder' ? 'Folder' : item.fileType || 'File'}
                                    </span>
                                </div>
                                {item.sharedDate ? (
                                    <div className="w-48 hidden lg:block flex-shrink-0 text-right">
                                        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                            {item.sharedDate}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="w-48 hidden lg:block flex-shrink-0 text-right">
                                        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() + ' • ' + new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Jan 16, 2026 • 10:00 AM'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="w-24 text-right flex-shrink-0">
                                <span className="text-sm text-gray-500 font-medium">{item.meta || item.size}</span>
                            </div>

                            <button
                                onClick={(e) => handleDetailsClick(e, item)}
                                className="p-2 text-gray-400 hover:text-[#0B1F3A] hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                title="View Details"
                            >
                                <Info size={18} />
                            </button>
                        </div>
                    ))}
                </div>
                <FilePreviewModal file={previewFile} isOpen={!!previewFile} onClose={() => setPreviewFile(null)} />
                {detailsFile && <DetailsModal file={detailsFile} onClose={() => setDetailsFile(null)} />}
            </>
        );
    }

    // Grid View Render ... uses existing logic mostly but updated styles
    return (
        <>
            <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
                {processedItems.map((item, index) => {
                    const key = item.id || index;
                    if (item.type === 'folder') {
                        return <FolderTile key={key} folder={item} onClick={() => handleItemClick(item)} />;
                    }
                    if (item.type === 'file') {
                        return (
                            <div key={key} onClick={() => handleItemClick(item)} className="relative group">
                                <FileTile file={item} />
                                {/* Overlay generic details button for Grid as well? FileTile logic might be internal. 
                                    But we can wrap it. */}
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
            {detailsFile && <DetailsModal file={detailsFile} onClose={() => setDetailsFile(null)} />}
        </>
    );
};

export default DriveGrid;
