import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Share2, Clock, Star, Trash2, User, MessageCircle, Cloud } from 'lucide-react';
import { driveData } from '../../data/driveData';
import UpgradeModal from '../modals/UpgradeModal';
import Dock from '../animations/Dock';
import { useState } from 'react';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sidebar } = driveData.layout;
    const { sections } = sidebar;

    // Upgrade Modal State
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

    const storageSection = sections.find(s => s.title === "Storage");

    const dockItems = [
        { icon: <Home size={24} className="text-white" />, label: "My Drive", onClick: () => navigate('/my-drive') },
        { icon: <Share2 size={24} className="text-white" />, label: "Shared", onClick: () => navigate('/shared') },
        { icon: <Clock size={24} className="text-white" />, label: "Recent", onClick: () => navigate('/recent') },
        { icon: <Star size={24} className="text-white" />, label: "Starred", onClick: () => navigate('/starred') },
        { icon: <Trash2 size={24} className="text-white" />, label: "Trash", onClick: () => navigate('/trash') },
        { icon: <MessageCircle size={24} className="text-white" />, label: "Help", onClick: () => navigate('/help') },
    ];

    const navItems = [
        { id: 'my-drive', label: 'My Drive', icon: Home, path: '/my-drive' },
        { id: 'shared', label: 'Shared with me', icon: Share2, path: '/shared' },
        { id: 'recent', label: 'Recent', icon: Clock, path: '/recent' },
        { id: 'starred', label: 'Starred', icon: Star, path: '/starred' },
        { id: 'trash', label: 'Trash', icon: Trash2, path: '/trash' },
        { id: 'help', label: 'Help', icon: MessageCircle, path: '/help' },
    ];

    const isActive = (path) => location.pathname === path || (path === '/my-drive' && location.pathname.startsWith('/folder'));

    return (
        <>
            {/* Desktop Vertical Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[260px] flex-col pt-24 pb-8 z-40 bg-[#195BAC] text-white overflow-y-auto border-r border-white/10 shadow-xl">
                <div className="flex flex-col gap-2 px-4">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group text-sm font-medium
                                    ${active
                                        ? 'bg-white/20 text-white shadow-lg shadow-black/5 font-bold'
                                        : 'hover:bg-white/10 text-blue-50'
                                    }
                                `}
                            >
                                <item.icon
                                    size={20}
                                    className={`${active ? 'text-white' : 'text-blue-200 group-hover:text-white'} transition-colors`}
                                />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-auto px-6 py-4">
                    <p className="text-[10px] text-blue-200 text-center opacity-60">
                        &copy; 2026 BTC Drive.
                    </p>
                </div>
            </aside>

            {/* Mobile Dock Navigation - Hide on Desktop */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <Dock items={dockItems} />
            </div>

            {/* Upgrade Modal */}
            <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />
        </>
    );
};

export default Sidebar;
