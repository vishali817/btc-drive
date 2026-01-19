import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Share2, Clock, Star, Trash2, User, MessageCircle, Cloud, AlertCircle, Settings } from 'lucide-react';
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
        { id: 'spam', label: 'Spam', icon: AlertCircle, path: '/spam' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
        { id: 'help', label: 'Help', icon: MessageCircle, path: '/help' },
    ];

    const isActive = (path) => location.pathname === path || (path === '/my-drive' && location.pathname.startsWith('/folder'));

    return (
        <>
            {/* Desktop Vertical Sidebar */}
            {/* Desktop Vertical Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[260px] flex-col pt-24 pb-8 z-40 bg-[#0D2B45] text-white overflow-y-auto border-r border-white/10 shadow-xl transition-colors duration-300">
                <div className="flex flex-col gap-2 px-4">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group text-sm font-medium
                                    ${active
                                        ? 'bg-[#195BAC] text-white shadow-lg shadow-black/5 font-bold'
                                        : 'hover:bg-[#195BAC] text-blue-50'
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

                <div className="mt-auto px-6 py-4 space-y-4">
                    {/* Storage Section */}
                    <div className="group cursor-pointer" onClick={() => navigate('/storage')}>
                        <div className="flex items-center gap-2 mb-2 text-blue-100 group-hover:text-white transition-colors">
                            <Cloud size={20} />
                            <span className="text-sm font-medium">Storage</span>
                        </div>
                        <div className="w-full h-1 bg-blue-900/30 rounded-full overflow-hidden mb-1">
                            <div className="h-full w-[30%] bg-white/90 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        </div>
                        <div className="text-[11px] text-blue-200 group-hover:text-blue-100 transition-colors">
                            4.5 GB of 15 GB used
                        </div>
                    </div>

                    {/* Offline Mode Toggle */}
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-xs font-medium text-blue-100">Offline Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-400"></div>
                        </label>
                    </div>

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
