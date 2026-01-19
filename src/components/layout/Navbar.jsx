import { useState, useRef } from 'react';
import btcLogo from '../../assets/logo/btc-logo.png';
import { Search, Settings, Bell, User, Plus, Cloud, FilePlus, FolderPlus, Sparkles } from 'lucide-react';
import StaggeredMenu from '../animations/StaggeredMenu';
import CircularButton from '../common/CircularButton';
import { driveData } from '../../data/driveData';

// Interactive Components
import DropdownMenu from '../common/DropdownMenu';
import ProfileMenu from '../menus/ProfileMenu';
import NotificationMenu from '../menus/NotificationMenu';
import UploadModal from '../modals/UploadModal';
import SettingsDrawer from '../modals/SettingsDrawer';
import ActivityDrawer from '../modals/ActivityDrawer';
import UpgradeModal from '../modals/UpgradeModal';
import LogoutModal from '../modals/LogoutModal';
import ProfileModal from '../modals/ProfileModal';

import AIChatWidget from '../ai/AIChatWidget';

const Navbar = ({ setSearchQuery, isSettingsOpen, setIsSettingsOpen, onLogout }) => {
    const { topbar } = driveData.layout;
    const { search, actions } = topbar;

    // UI States
    const [activeMenu, setActiveMenu] = useState(null); // 'profile' | 'notifications' | null
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    // isSettingsOpen comes from props now
    const [isActivityOpen, setIsActivityOpen] = useState(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);

    // Refs for Dropdown Triggers
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    const newMenuRef = useRef(null);

    const toggleMenu = (menu) => {
        if (activeMenu === menu) {
            setActiveMenu(null);
        } else {
            setActiveMenu(menu);
        }
    };

    const handleAction = (id) => {
        switch (id) {
            case 'upload':
                // Handled in local state for dropdown now
                break;
            case 'settings':
                setIsSettingsOpen(true);
                break;
            case 'notifications':
                toggleMenu('notifications');
                break;
            case 'profile':
                toggleMenu('profile');
                break;
            case 'new-menu':
                toggleMenu('new-menu');
                break;
            default:
                console.log(`Unknown action: ${id}`);
        }
    };

    // Handlers for Menu Actions
    const handleViewAllActivity = () => {
        setActiveMenu(null);
        setIsActivityOpen(true);
    };

    const handleProfileAction = (actionId) => {
        setActiveMenu(null);
        switch (actionId) {
            case 'profile':
                setIsProfileOpen(true);
                break;
            case 'billing':
                setIsUpgradeOpen(true);
                break;
            case 'settings':
                setIsSettingsOpen(true);
                break;
            case 'logout':
                setIsLogoutOpen(true);
                break;
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full px-8 py-4 z-50 flex items-center justify-between pointer-events-none bg-[#195bac] border-b border-white/10 shadow-lg">
                {/* Brand - Left */}
                <div className="pointer-events-auto flex items-center gap-3 w-[260px]">
                    <div className="bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
                        <img src={btcLogo} alt="BTC Drive" className="h-5 w-auto" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-white leading-none">BTC <span className="text-blue-200">Drive</span></span>
                        <span className="text-xs font-semibold text-blue-100 tracking-wider uppercase">{driveData.app.accountType}</span>
                    </div>
                </div>

                {/* Search Bar - Center */}
                <div className="pointer-events-auto flex-1 max-w-2xl px-8">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="text-blue-200 group-focus-within:text-white transition-colors" size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder={search.placeholder}
                            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-white/10 border border-white/20 rounded-2xl shadow-sm focus:bg-white/20 focus:shadow-md focus:border-white/40 outline-none transition-all duration-300 text-white placeholder:text-blue-200/70 font-medium"
                        />
                    </div>
                </div>

                {/* AI Button - Next to Search */}
                <div className="pointer-events-auto mr-4 hidden md:block">
                    <button
                        onClick={() => setIsAIChatOpen(!isAIChatOpen)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full font-medium shadow-lg transition-all duration-300 ${isAIChatOpen ? 'bg-white text-primary scale-105' : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-purple-500/20 hover:scale-105'}`}
                    >
                        <Sparkles size={18} />
                    </button>
                    <AIChatWidget isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
                </div>

                {/* Actions - Right */}
                <div className="pointer-events-auto flex items-center gap-4">
                    {/* Notification Bell */}
                    <div className="relative" ref={notificationRef}>
                        <CircularButton
                            onClick={() => handleAction('notifications')}
                            size="md"
                            className={`bg-white/10 hover:bg-white/20 border-white/10 text-white`}
                        >
                            <Bell size={20} />
                        </CircularButton>
                    </div>
                    <DropdownMenu
                        isOpen={activeMenu === 'notifications'}
                        onClose={() => setActiveMenu(null)}
                        triggerRef={notificationRef}
                        width="w-80"
                    >
                        <NotificationMenu onViewAll={handleViewAllActivity} />
                    </DropdownMenu>

                    <div className="relative" ref={newMenuRef}>
                        <button
                            onClick={() => handleAction('new-menu')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-white text-primary rounded-xl font-bold shadow-lg shadow-black/10 hover:shadow-black/20 active:scale-95 transition-all duration-300 mr-2"
                        >
                            <Plus size={18} strokeWidth={3} />
                            New
                        </button>

                        {/* New Menu Dropdown */}
                        <DropdownMenu
                            isOpen={activeMenu === 'new-menu'}
                            onClose={() => setActiveMenu(null)}
                            triggerRef={newMenuRef}
                            width="w-56"
                        >
                            <div className="p-2 space-y-1">
                                <button
                                    onClick={() => {
                                        setActiveMenu(null);
                                        setIsUploadOpen(true);
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left"
                                >
                                    <FilePlus size={18} className="text-blue-500" />
                                    <span>File Upload</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveMenu(null);
                                        window.dispatchEvent(new CustomEvent('open-create-folder'));
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left"
                                >
                                    <FolderPlus size={18} className="text-yellow-500" />
                                    <span>New Folder</span>
                                </button>
                            </div>
                        </DropdownMenu>
                    </div>

                    {/* Profile Avatar & Menu */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => handleAction('profile')}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center font-bold shadow-lg ring-2 ring-white/20 hover:ring-white/40 transition-all text-sm"
                        >
                            JS
                        </button>
                        <DropdownMenu
                            isOpen={activeMenu === 'profile'}
                            onClose={() => setActiveMenu(null)}
                            triggerRef={profileRef}
                            width="w-64"
                        >
                            <ProfileMenu onAction={handleProfileAction} />
                        </DropdownMenu>
                    </div>
                </div>
            </nav>

            {/* Modals & Drawers */}
            <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
            <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <ActivityDrawer isOpen={isActivityOpen} onClose={() => setIsActivityOpen(false)} />
            <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />
            <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onLogout={onLogout} />
            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </>
    );
};

export default Navbar;
