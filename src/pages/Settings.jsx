import { useState } from 'react';
import { ArrowLeft, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('general');
    const [isMobile] = useState(window.innerWidth < 768);

    // State for Settings
    const [settings, setSettings] = useState({
        // General
        startPage: 'home',
        appearance: 'device',
        density: 'comfortable',
        openPdfs: 'preview',
        convertUploads: false,
        offline: false,
        showPreviewDetails: true,
        navSounds: false,
        language: 'English (US)',

        // Notifications
        browserNotifications: true,
        emailNotifications: false,

        // Data Usage
        transferWifiOnly: true,

        // Apps
        apps: [
            { id: 1, name: 'Google Docs', scope: 'Create and edit documents', connected: true },
            { id: 2, name: 'Google Sheets', scope: 'Create and edit spreadsheets', connected: true },
            { id: 3, name: 'Google Slides', scope: 'Create and edit presentations', connected: true },
            { id: 4, name: 'PDF Viewer', scope: 'Read PDF files', connected: true },
        ]
    });

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const toggleAppConnection = (id) => {
        setSettings(prev => ({
            ...prev,
            apps: prev.apps.map(app =>
                app.id === id ? { ...app, connected: !app.connected } : app
            )
        }));
    };

    const navSections = [
        { id: 'general', label: 'General' },
        { id: 'privacy', label: 'Privacy' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'manage-apps', label: 'Manage apps' },
    ];

    // Mobile Section Component
    const MobileSection = ({ title, children }) => (
        <div className="mb-8 last:mb-24">
            <h3 className="text-[#195bac] text-sm font-medium px-4 mb-4 uppercase tracking-wide">{title}</h3>
            {children}
        </div>
    );

    const MobileSettingItem = ({ title, description, action, showToggle, toggleValue, onToggle }) => (
        <div className="flex items-center justify-between px-4 py-3 min-h-[64px] active:bg-gray-50 transition-colors">
            <div className="flex-1 pr-4">
                <div className="text-gray-900 font-medium text-[16px] mb-0.5">{title}</div>
                {description && <div className="text-gray-500 text-sm leading-snug">{description}</div>}
            </div>
            {action}
            {showToggle && (
                <div
                    onClick={onToggle}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${toggleValue ? 'bg-primary' : 'bg-gray-300'}`}
                >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${toggleValue ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
            )}
        </div>
    );

    const renderDesktopContent = () => {
        switch (activeSection) {
            case 'general':
                return (
                    <div className="space-y-8 max-w-4xl text-sm animate-fade-in">
                        {/* Storage */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Storage</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="text-gray-700">4.5 GB of 15 GB used</div>
                                <div className="flex gap-4">
                                    <button className="text-primary font-medium hover:text-blue-700 transition-colors">
                                        Buy storage
                                    </button>
                                    <button className="text-primary font-medium hover:text-blue-700 transition-colors">
                                        View items taking up storage
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Start Page */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Start page</h3>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="startPage"
                                        checked={settings.startPage === 'home'}
                                        onChange={() => updateSetting('startPage', 'home')}
                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-gray-700">Home</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="startPage"
                                        checked={settings.startPage === 'my-drive'}
                                        onChange={() => updateSetting('startPage', 'my-drive')}
                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-gray-700">My Drive</span>
                                </label>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Appearance */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Appearance</h3>
                            </div>
                            <div className="space-y-3">
                                {['Light', 'Dark', 'Device default'].map((mode) => (
                                    <label key={mode} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="appearance"
                                            checked={settings.appearance === mode.toLowerCase().replace(' ', '') || (mode === 'Device default' && settings.appearance === 'device')}
                                            onChange={() => updateSetting('appearance', mode === 'Device default' ? 'device' : mode.toLowerCase())}
                                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="text-gray-700">{mode}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Density */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Density</h3>
                            </div>
                            <div className="space-y-3">
                                {['comfortable', 'cozy', 'compact'].map((d) => (
                                    <label key={d} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="density"
                                            checked={settings.density === d}
                                            onChange={() => updateSetting('density', d)}
                                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="text-gray-700 capitalize">{d}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="space-y-8 max-w-4xl text-sm animate-fade-in">
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Data Privacy</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <button className="text-primary font-medium hover:text-blue-700 transition-colors block mb-1">
                                        Manage Workspace smart feature settings
                                    </button>
                                    <p className="text-sm text-gray-500">
                                        Control whether your content is used to provide smart features and personalization in Gmail, Chat, and Meet.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-8 max-w-4xl text-sm animate-fade-in">
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Browser</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.browserNotifications}
                                        onChange={(e) => updateSetting('browserNotifications', e.target.checked)}
                                        className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-gray-700">Enable browser notifications</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'manage-apps':
                return (
                    <div className="space-y-6 max-w-5xl text-sm animate-fade-in">
                        <div className="space-y-0 text-gray-700">
                            {settings.apps.map((app, index) => (
                                <div key={app.id}>
                                    <div className="flex items-start justify-between py-4">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{app.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{app.scope}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleAppConnection(app.id)}
                                            className="text-primary hover:text-blue-700 text-sm font-medium transition-colors"
                                        >
                                            {app.connected ? 'Disconnect from Drive' : 'Connect'}
                                        </button>
                                    </div>
                                    {index < settings.apps.length - 1 && <div className="h-px bg-gray-200" />}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            default:
                return null;
        }
    };

    if (isMobile) {
        return (
            <div className="flex flex-col h-screen bg-white overflow-hidden">
                {/* Mobile Header - Native App Style */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center h-14 px-4 shadow-sm">
                    <button onClick={() => navigate('/my-drive')} className="p-2 -ml-2 rounded-full active:bg-gray-100 text-gray-600">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="flex-1 text-[20px] font-normal text-gray-800 ml-4">Settings</h1>
                </div>

                {/* Mobile Scroll Content */}
                <div className="flex-1 overflow-y-auto pt-4 pb-20">
                    {/* Storage Section - Custom Pill UI */}
                    <MobileSection title="Storage">
                        <div className="px-4 mb-4">
                            <p className="text-[15px] text-gray-800 mb-4">4.5 GB of 15 GB used</p>
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-300 bg-white text-primary font-medium text-sm active:bg-gray-50 transition-colors">
                                <Cloud size={18} className="text-primary" />
                                Manage storage
                            </button>
                        </div>
                        <div className="px-4">
                            <div className="h-1 w-full bg-blue-100 rounded-full mb-1">
                                <div className="h-1 bg-primary rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>
                    </MobileSection>

                    <div className="h-px bg-gray-100 mx-4 mb-6" />

                    {/* Notifications */}
                    <MobileSection title="Notifications">
                        <MobileSettingItem
                            title="Browser notifications"
                            description="Get updates about Google Drive items in your browser"
                            showToggle={true}
                            toggleValue={settings.browserNotifications}
                            onToggle={() => updateSetting('browserNotifications', !settings.browserNotifications)}
                        />
                        <MobileSettingItem
                            title="Email notifications"
                            description="Receive email updates"
                            showToggle={true}
                            toggleValue={settings.emailNotifications}
                            onToggle={() => updateSetting('emailNotifications', !settings.emailNotifications)}
                        />
                    </MobileSection>

                    <div className="h-px bg-gray-100 mx-4 mb-6" />

                    {/* Theme */}
                    <MobileSection title="Theme">
                        <MobileSettingItem
                            title="Choose theme"
                            description={settings.appearance === 'device' ? 'System default' : settings.appearance.charAt(0).toUpperCase() + settings.appearance.slice(1)}
                            action={<button
                                onClick={() => {
                                    const next = settings.appearance === 'light' ? 'dark' : 'light';
                                    updateSetting('appearance', next);
                                }}
                                className="text-primary font-medium text-sm"
                            >
                                Change
                            </button>}
                        />
                    </MobileSection>

                    <div className="h-px bg-gray-100 mx-4 mb-6" />

                    {/* Documents Cache */}
                    <MobileSection title="Documents Cache">
                        <MobileSettingItem
                            title="Clear cached files"
                            description="Remove offline files stored on this device"
                            action={<button className="text-gray-600 font-medium text-sm">Clear</button>}
                        />
                    </MobileSection>

                    <div className="h-px bg-gray-100 mx-4 mb-6" />

                    {/* Data Usage */}
                    <MobileSection title="Data Usage">
                        <MobileSettingItem
                            title="Transfer files only over Wi-Fi"
                            description="Uploading and updating of files will pause when Wi-Fi connection is not available"
                            showToggle={true}
                            toggleValue={settings.transferWifiOnly}
                            onToggle={() => updateSetting('transferWifiOnly', !settings.transferWifiOnly)}
                        />
                    </MobileSection>

                    <div className="h-px bg-gray-100 mx-4 mb-6" />

                    {/* Privacy */}
                    <MobileSection title="Privacy">
                        <MobileSettingItem
                            title="Data Privacy"
                            description="Manage use of personal data"
                            action={<button className="text-primary font-medium text-sm">Manage</button>}
                        />
                    </MobileSection>

                    <div className="h-px bg-gray-100 mx-4 mb-6" />

                    {/* About */}
                    <div className="px-4 py-4 text-center">
                        <p className="text-xs text-gray-400">Version 2.45.102</p>
                    </div>
                </div>
            </div>
        );
    }

    // DESKTOP LAYOUT (Unchanged logic, just wrapped)
    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
                <button onClick={() => navigate('/my-drive')} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-normal text-gray-800">Settings</h1>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar */}
                <aside className="w-64 pt-6 pb-6 overflow-y-auto border-r border-gray-200">
                    <nav className="flex flex-col">
                        {navSections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center w-full px-8 py-2 text-[0.9rem] font-medium transition-colors text-left border-l-4 ${activeSection === section.id
                                    ? 'border-primary text-blue-700 bg-blue-50'
                                    : 'border-transparent text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Right Content */}
                <main className="flex-1 overflow-y-auto pt-8 pl-8 pr-16 pb-20 bg-white">
                    {renderDesktopContent()}
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;
