import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import FolderTile from './FolderTile';
import FileTile from './FileTile';
import ActionTile from './ActionTile';
import { useNavigate } from 'react-router-dom';
import FilePreviewModal from '../modals/FilePreviewModal';
import UploadModal from '../modals/UploadModal';
import { Info, MoreVertical, Share2, Users, Star, Link, Edit, Palette, CornerUpRight, FolderInput, Trash2 } from 'lucide-react';

const DriveGrid = ({ items, viewMode, searchQuery }) => {
    const navigate = useNavigate();
    const [previewFile, setPreviewFile] = useState(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [detailsFile, setDetailsFile] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);

    // Action States
    const [deletedIds, setDeletedIds] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [renameValue, setRenameValue] = useState('');
    const [showShareModal, setShowShareModal] = useState(false);
    const [sharedItem, setSharedItem] = useState(null);

    // Ref for outside click
    const menuRef = useRef(null);

    // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    const handleItemClick = (item) => {
        if (editingId === item.id) return; // Don't navigate if editing
        if (item.type === 'folder') {
            navigate(`/folder/${item.id}`);
        } else if (item.type === 'file') {
            setPreviewFile(item);
        } else if (item.type === 'action') {
            setIsUploadOpen(true);
        }
    };

    const handleMenuAction = (e, action, item) => {
        e.stopPropagation();
        setActiveMenuId(null);
        switch (action) {
            case 'details':
                setDetailsFile(item);
                break;
            case 'trash':
                setDeletedIds(prev => [...prev, item.id]);
                break;
            case 'rename':
                setEditingId(item.id);
                setRenameValue(item.name);
                break;
            case 'share':
                setSharedItem(item);
                setShowShareModal(true);
                break;
            case 'star':
                // Visual feedback only for now
                // In a real app, update state/backend
                console.log('Starred', item.name);
                break;
            case 'copy-link':
                navigator.clipboard.writeText(`https://btcdrive.com/share/${item.id}`);
                break;
            default:
                console.log(action, item);
                break;
        }
    };

    const handleRenameSubmit = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        // In reality, call API. Here we just close edit mode.
        // To persist locally in this mock, we would need to update 'items', but props are read-only.
        // For visual interaction:
        console.log('Renamed', item.id, 'to', renameValue);
        setEditingId(null);
    };

    // Filter out deleted items
    const visibleItems = items.filter(item => !deletedIds.includes(item.id));

    const processedItems = visibleItems.map(item => ({
        ...item,
        name: getHighlightedName(item.name)
    }));

    const ContextMenu = ({ item }) => (
        <div ref={menuRef} className="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-[100] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            <div className="py-1">
                <button onClick={(e) => handleMenuAction(e, 'share', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <Share2 size={16} /> Share
                </button>
                <button onClick={(e) => handleMenuAction(e, 'access', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <Users size={16} /> Manage access
                </button>
                <button onClick={(e) => handleMenuAction(e, 'star', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <Star size={16} /> Add to starred
                </button>
                <button onClick={(e) => handleMenuAction(e, 'copy-link', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <Link size={16} /> Copy link
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button onClick={(e) => handleMenuAction(e, 'rename', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <Edit size={16} /> Rename
                </button>
                <button onClick={(e) => handleMenuAction(e, 'color', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <Palette size={16} /> Change color
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button onClick={(e) => handleMenuAction(e, 'shortcut', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <CornerUpRight size={16} /> Add shortcut
                </button>
                <button onClick={(e) => handleMenuAction(e, 'move', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <FolderInput size={16} /> Move
                </button>
                <button onClick={(e) => handleMenuAction(e, 'details', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <Info size={16} /> View information
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button onClick={(e) => handleMenuAction(e, 'trash', item)} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                    <Trash2 size={16} /> Move to trash
                </button>
            </div>
        </div>
    );

    const ShareModal = ({ item, onClose }) => {
        if (!item) return null;
        return (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold mb-4">Share "{item.name}"</h2>
                    <div className="space-y-4">
                        <input type="text" placeholder="Add people or groups" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary focus:ring-2 ring-primary/20" />
                        <div className="flex justify-between items-center">
                            <button className="flex items-center gap-2 text-primary font-bold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                                <Link size={18} /> Copy Link
                            </button>
                            <button onClick={onClose} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">Done</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }

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
                        <h2 className="text-xl font-bold text-primary">File Details</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">✕</button>
                    </div>

                    <div className="space-y-8">
                        <div className="flex flex-col items-center text-center p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-blue-50">
                                <span className="text-3xl font-bold text-primary uppercase">
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

    if (viewMode === 'list') {
        return (
            <>
                <div className="flex flex-col gap-2 pb-24">
                    {processedItems.map(item => (
                        <div
                            key={item.id}
                            style={{ zIndex: activeMenuId === item.id ? 50 : 1 }}
                            onClick={() => handleItemClick(item)}
                            className={`relative flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white transition-all border border-transparent hover:border-blue-100 cursor-pointer group shadow-sm hover:shadow-md ${activeMenuId === item.id ? 'bg-white shadow-md border-blue-100' : ''}`}
                        >
                            <div className="w-10 flex justify-center flex-shrink-0">
                                <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-primary transition-colors">
                                    {item.type === 'action' ? 'NEW' : item.type === 'folder' ? 'DIR' : item.fileType ? item.fileType.substring(0, 3) : 'FILE'}
                                </span>
                            </div>

                            <div className="flex-1 flex items-center gap-4 min-w-0">
                                <div className="flex flex-col min-w-0 flex-1 justify-center">
                                    {editingId === item.id ? (
                                        <form onSubmit={(e) => handleRenameSubmit(e, item)} className="flex items-center gap-2">
                                            <input
                                                autoFocus
                                                type="text"
                                                value={renameValue}
                                                onChange={(e) => setRenameValue(e.target.value)}
                                                onBlur={() => setEditingId(null)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="bg-white border border-primary px-2 py-1 rounded-md text-sm outline-none w-full"
                                            />
                                        </form>
                                    ) : (
                                        <>
                                            <span className="font-medium text-gray-700 truncate block text-sm group-hover:text-primary transition-colors">{item.name}</span>
                                            <span className="text-xs text-gray-400 font-medium truncate mt-0.5">
                                                {item.sharedDate || (item.createdAt ? new Date(item.createdAt).toLocaleDateString() + ' • ' + new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Jan 16, 2026 • 10:00 AM')}
                                                <span className="sm:hidden"> • {item.meta || item.size}</span>
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="w-24 hidden md:block flex-shrink-0">
                                    <span className="text-xs font-bold text-gray-400 uppercase bg-gray-100/80 px-2 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis block text-center">
                                        {item.type === 'folder' ? 'Folder' : item.fileType || 'File'}
                                    </span>
                                </div>
                            </div>

                            <div className="w-24 text-right flex-shrink-0 hidden sm:block">
                                <span className="text-sm text-gray-500 font-medium">{item.meta || item.size}</span>
                            </div>

                            {/* 3-Dot Menu */}
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenuId(activeMenuId === item.id ? null : item.id);
                                    }}
                                    className={`p-2 rounded-full transition-all ${activeMenuId === item.id ? 'bg-blue-50 text-primary opacity-100' : 'text-gray-400 hover:text-primary hover:bg-blue-50 opacity-0 group-hover:opacity-100'}`}
                                >
                                    <MoreVertical size={18} />
                                </button>
                                {activeMenuId === item.id && <ContextMenu item={item} />}
                            </div>
                        </div>
                    ))}
                </div>
                <FilePreviewModal file={previewFile} isOpen={!!previewFile} onClose={() => setPreviewFile(null)} />
                {detailsFile && <DetailsModal file={detailsFile} onClose={() => setDetailsFile(null)} />}
                {showShareModal && <ShareModal item={sharedItem} onClose={() => setShowShareModal(false)} />}
            </>
        );
    }

    // Grid View
    return (
        <>
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-24"
            >
                {processedItems.map((item, index) => {
                    const key = item.id || index;
                    return (
                        <div key={key} style={{ zIndex: activeMenuId === key ? 50 : 1 }} className="relative group" onClick={() => handleItemClick(item)}>
                            {item.type === 'folder' && <FolderTile folder={item} />}
                            {item.type === 'file' && <FileTile file={item} />}
                            {item.type === 'action' && <ActionTile action={item} />}

                            {/* Grid Context Menu Button (Overlay) - Only for files/folders */}
                            {item.type !== 'action' && (
                                <div className="absolute top-2 right-2 z-20">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenuId(activeMenuId === key ? null : key);
                                        }}
                                        className={`p-1.5 rounded-full bg-white/90 shadow-sm border border-gray-100 transition-all ${activeMenuId === key ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100 text-gray-500 hover:text-primary'}`}
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                    {activeMenuId === key && <ContextMenu item={item} />}
                                </div>
                            )}
                        </div>
                    );
                })}
            </motion.div>

            <FilePreviewModal file={previewFile} isOpen={!!previewFile} onClose={() => setPreviewFile(null)} />
            <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
            {detailsFile && <DetailsModal file={detailsFile} onClose={() => setDetailsFile(null)} />}
            {showShareModal && <ShareModal item={sharedItem} onClose={() => setShowShareModal(false)} />}
        </>
    );
};

export default DriveGrid;
