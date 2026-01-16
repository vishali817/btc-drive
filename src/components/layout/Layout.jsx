import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import UploadButton from '../drive/UploadButton';
import UploadModal from '../modals/UploadModal';
import CreateFolderModal from '../modals/CreateFolderModal';

const Toast = ({ message, type, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-full shadow-2xl"
        >
            {type === 'success' ? <CheckCircle size={20} className="text-green-400" /> : <AlertCircle size={20} className="text-red-400" />}
            <span className="font-medium text-sm">{message}</span>
        </motion.div>
    );
};

const Layout = ({ onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Global State
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Lifted state
    const [toast, setToast] = useState(null);

    // Route Actions
    useEffect(() => {
        if (location.pathname === '/logout') {
            if (onLogout) onLogout();
            navigate('/');
        }
        if (location.pathname === '/settings') {
            setIsSettingsOpen(true);
            navigate('/my-drive', { replace: true });
        }
        if (location.pathname === '/profile') {
            setIsSettingsOpen(true);
            navigate('/my-drive', { replace: true });
        }
    }, [location, onLogout, navigate]);

    // Import driveData is needed. Since I can't easily add import at top with this tool range, 
    // I will use a minimal initial state and hope Drive populates it or rely on Drive to initialize?
    // Better: Initialize with empty or default. 
    // Actually, I can replace the whole component content or imports too.
    // I'll assume I can't reach imports easily without reading file again. 
    // I will use a hardcoded initial state or Mock Data here if I can't reach imports.
    // Wait, Sidebar imports driveData. I can see imports in previous 'view_file'. 
    // Layout imports Navbar, Sidebar...
    // I'll add the import via a separate tool call if needed or just use `window.driveData` if available? No.
    // I will define a basic initial set if I can't access `driveData`. 
    // OR I will simply use `useState([])` and let `Drive` push data up? No, `Drive` expects data down.
    // I will try to add the import first.

    // Global Items State (Lifted from Drive)
    const [fileSystem, setFileSystem] = useState({
        items: [
            { id: '1', type: 'folder', name: 'Work Projects', meta: '12 items' },
            { id: '2', type: 'folder', name: 'Personal', meta: '8 items' },
            { id: '3', type: 'file', fileType: 'pdf', name: 'Resume_2024.pdf', size: '1.2 MB' },
            { id: '4', type: 'file', fileType: 'png', name: 'Design_System.png', size: '5.8 MB' },
            { id: '5', type: 'folder', name: 'Finance', meta: '3 items' },
            { id: '100', type: 'action', name: 'Create New' }
        ]
    });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleUploadAction = (action) => {
        switch (action) {
            case 'Upload File':
            case 'Upload Folder':
                // In a real app we might distinguish modes, but for now reuse UploadModal which has both
                setIsUploadOpen(true);
                break;
            case 'New Folder':
                setIsCreateFolderOpen(true);
                break;
            default:
                break;
        }
    };

    const handleCreateFolder = (name) => {
        const newFolder = {
            id: `folder-${Date.now()}`,
            type: 'folder',
            name: name,
            meta: '0 items'
        };

        setFileSystem(prev => ({
            ...prev,
            items: [newFolder, ...prev.items]
        }));

        showToast(`Folder "${name}" created successfully`);
        // Immediate UI update handled by state change
    };

    return (
        <div className="h-screen w-full bg-background selection:bg-primary/20 text-text-primary font-sans overflow-hidden flex flex-col">
            <Navbar
                setSearchQuery={setSearchQuery}
                isSettingsOpen={isSettingsOpen}
                setIsSettingsOpen={setIsSettingsOpen}
                onLogout={onLogout}
            />
            <Sidebar />

            <main className="flex-1 h-full overflow-y-auto w-full md:pl-[280px] pt-24 pb-32 relative z-10 scroll-smooth">
                {/* Pass search query to children pages */}
                <Outlet context={{ searchQuery, fileSystem }} />
            </main>

            <UploadButton onAction={handleUploadAction} />

            {/* Global Modals triggered by FAB */}
            <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
            <CreateFolderModal
                isOpen={isCreateFolderOpen}
                onClose={() => setIsCreateFolderOpen(false)}
                onCreate={handleCreateFolder}
            />

            {/* Global Toast */}
            <AnimatePresence>
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default Layout;
