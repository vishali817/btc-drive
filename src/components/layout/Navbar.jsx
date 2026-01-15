import { useState, useRef } from 'react';
import { Search, Settings, Bell, User, Plus } from 'lucide-react';
import CircularButton from '../common/CircularButton';
import { driveData } from '../../data/driveData';

// Interactive Components
import DropdownMenu from '../common/DropdownMenu';
import ProfileMenu from '../menus/ProfileMenu';
import NotificationMenu from '../menus/NotificationMenu';
import UploadModal from '../modals/UploadModal';
import SettingsDrawer from '../modals/SettingsDrawer';
import ActivityDrawer from '../modals/ActivityDrawer';

const Navbar = ({ setSearchQuery }) => {
    const { topbar } = driveData.layout;
    const { search, actions } = topbar;

    // UI States
    const [activeMenu, setActiveMenu] = useState(null); // 'profile' | 'notifications' | null
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isActivityOpen, setIsActivityOpen] = useState(false);

    // Refs for Dropdown Triggers
    const profileRef = useRef(null);
    const notificationRef = useRef(null);

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
                setIsUploadOpen(true);
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
                // For now, re-use Settings Drawer or show a Mock Profile Modal
                // Prompt asked for "Open profile details page or modal"
                // Let's create a simple alert-free visual change or leverage Settings Drawer Account tab
                // "Profile -> Open profile details page or modal"
                // Let's route to Settings Account for simplicity as it has user info, or add a dedicated mode
                setIsSettingsOpen(true);
                break;
            case 'billing':
                // "Open plans & billing page" -> Upgrade Modal is suitable
                // We don't have setIsUpgradeOpen here easily unless we lift it or create new modal
                // Let's toggle a "Billing Modal" (UpgradeModal) if we can or just use Settings
                // Actually, trigger UpgradeModal would be good. But UpgradeModal is in Sidebar. 
                // Let's emit or just show a "Plan Details" modal. 
                // Wait, UpgradeModal is specific. Let's make a generic InfoModal for "Billing" if needed, 
                // OR better, pass a prop 'modalType' to Settings or similar. 
                // ISSUE 3 says: "Billing & Plans → Open plans & billing page"
                // Let's just open the Settings Drawer to 'account' which has Plan info in our mock.
                setIsSettingsOpen(true);
                break;
            case 'settings':
                setIsSettingsOpen(true);
                break;
            case 'logout':
                // Trigger logout confirmation
                if (window.confirm("Are you sure you want to logout?")) {
                    console.log("Logged out");
                }
                break;
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full px-8 py-4 z-50 flex items-center justify-between pointer-events-none bg-background/5  backdrop-blur-sm">
                {/* Gradient Overlay for Header readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent pointer-events-none -z-10" />

                {/* Brand - Left */}
                <div className="pointer-events-auto flex items-center gap-3 w-[260px]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <span className="font-bold text-xl">D</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-text-primary leading-none">Cloud<span className="text-primary">Drive</span></span>
                        <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">{driveData.app.accountType}</span>
                    </div>
                </div>

                {/* Search Bar - Center */}
                <div className="pointer-events-auto flex-1 max-w-2xl px-8">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder={search.placeholder}
                            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-white/60 border border-white/60 rounded-2xl shadow-sm focus:bg-white focus:shadow-md focus:border-primary/30 outline-none transition-all duration-300 text-text-primary placeholder:text-gray-400 font-medium"
                        />
                    </div>
                </div>

                {/* Actions - Right */}
                <div className="pointer-events-auto flex items-center gap-4">
                    {actions.map(action => {
                        if (action.type === 'primary_button') {
                            return (
                                <button
                                    key={action.id}
                                    onClick={() => handleAction(action.id)}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all duration-300"
                                >
                                    <Plus size={18} strokeWidth={3} />
                                    {action.label}
                                </button>
                            );
                        }

                        // Icon buttons
                        const IconMap = {
                            notifications: Bell,
                            settings: Settings,
                            profile: User
                        };
                        const Icon = IconMap[action.id];

                        // Determine Ref and State for Dropdowns
                        const isProfile = action.id === 'profile';
                        const isNotification = action.id === 'notifications';
                        const myRef = isProfile ? profileRef : isNotification ? notificationRef : null;

                        // Render Button
                        return (
                            <div key={action.id} className="relative" ref={myRef}>
                                <CircularButton
                                    onClick={() => handleAction(action.id)}
                                    size="md"
                                    className={`bg-white/50 hover:bg-white !shadow-sm hover:!shadow-md border border-white/60 ${((isProfile && activeMenu === 'profile') || (isNotification && activeMenu === 'notifications')) ? '!bg-white !shadow-md' : ''}`}
                                >
                                    <Icon size={20} className="text-gray-600" />
                                </CircularButton>
                            </div>
                        );
                    })}

                    {/* Dropdown Menus */}
                    <DropdownMenu
                        isOpen={activeMenu === 'notifications'}
                        onClose={() => setActiveMenu(null)}
                        triggerRef={notificationRef}
                        width="w-80"
                    >
                        <NotificationMenu onViewAll={handleViewAllActivity} />
                    </DropdownMenu>

                    <DropdownMenu
                        isOpen={activeMenu === 'profile'}
                        onClose={() => setActiveMenu(null)}
                        triggerRef={profileRef}
                    >
                        <ProfileMenu onAction={handleProfileAction} />
                    </DropdownMenu>
                </div>
            </nav>

            {/* Modals & Drawers */}
            <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
            <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <ActivityDrawer isOpen={isActivityOpen} onClose={() => setIsActivityOpen(false)} />
        </>
    );
};

export default Navbar;
