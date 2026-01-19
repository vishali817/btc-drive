import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('general');

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


    const renderContent = () => {
        switch (activeSection) {
            case 'general':
                return (
                    <div className="space-y-8 max-w-4xl text-sm">
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

                        <div className="h-px bg-gray-200" />

                        {/* Open PDFs */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Open PDFs</h3>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="openPdfs"
                                        checked={settings.openPdfs === 'new-tab'}
                                        onChange={() => updateSetting('openPdfs', 'new-tab')}
                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-gray-700">New tab</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="openPdfs"
                                        checked={settings.openPdfs === 'preview'}
                                        onChange={() => updateSetting('openPdfs', 'preview')}
                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-gray-700">Preview</span>
                                </label>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Uploads */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Uploads</h3>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.convertUploads}
                                    onChange={(e) => updateSetting('convertUploads', e.target.checked)}
                                    className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
                                />
                                <span className="text-gray-700">Convert uploaded files to Google Docs editor format</span>
                            </label>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Offline */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Offline</h3>
                            </div>
                            <div>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.offline}
                                        onChange={(e) => updateSetting('offline', e.target.checked)}
                                        className="mt-0.5 w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-gray-700">Enable offline access</span>
                                </label>
                                <p className="text-xs text-gray-500 mt-1 ml-7">
                                    Sync your most recent Google Docs, Sheets, and Slides files to this device so you can edit offline. <br />Not recommended on public or shared computers.
                                </p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Preview Cards */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Preview cards</h3>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.showPreviewDetails}
                                    onChange={(e) => updateSetting('showPreviewDetails', e.target.checked)}
                                    className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
                                />
                                <span className="text-gray-700">Show details card when hovering on a file or folder</span>
                            </label>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Sounds */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Sounds</h3>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.navSounds}
                                    onChange={(e) => updateSetting('navSounds', e.target.checked)}
                                    className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
                                />
                                <span className="text-gray-700">Allow sounds for navigation actions</span>
                            </label>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Language */}
                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Language</h3>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-gray-700">{settings.language}</span>
                                <button className="text-primary font-medium hover:text-blue-700 transition-colors">
                                    Change language settings
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="space-y-8 max-w-4xl text-sm">
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
                                <div className="h-px bg-gray-100" />
                                <div>
                                    <button className="text-primary font-medium hover:text-blue-700 transition-colors block mb-1">
                                        Manage search history
                                    </button>
                                    <p className="text-sm text-gray-500">
                                        Decide whether to save your search history to help improve your search spread results.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-8 max-w-4xl text-sm">
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
                                <p className="text-gray-500 text-xs ml-7">
                                    Get updates about Google Drive items in your browser.
                                </p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200" />

                        <div className="grid grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900">Email</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailNotifications}
                                        onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                                        className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-gray-700">Receive email updates</span>
                                </label>
                                <p className="text-gray-500 text-xs ml-7">
                                    Get updates about Google Drive items via email.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 'manage-apps':
                return (
                    <div className="space-y-6 max-w-5xl text-sm">
                        <div className="space-y-0 text-gray-700">
                            {settings.apps.map((app, index) => (
                                <div key={app.id}>
                                    <div className="flex items-start justify-between py-4">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{app.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{app.scope}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {/* Options dropdown mocked as text button for now */}
                                            <button className="text-gray-500 hover:text-gray-700 text-xs font-medium uppercase tracking-wide">
                                                Options
                                            </button>
                                            <button
                                                onClick={() => toggleAppConnection(app.id)}
                                                className="text-primary hover:text-blue-700 text-sm font-medium transition-colors"
                                            >
                                                {app.connected ? 'Disconnect from Drive' : 'Connect'}
                                            </button>
                                        </div>
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

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
                <button onClick={() => navigate('/my-drive')} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-normal text-gray-800">Settings</h1>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Left Sidebar (Desktop) / Top Nav (Mobile) */}
                <aside className="w-full md:w-64 bg-gray-50 md:bg-white border-b md:border-b-0 border-gray-200 overflow-x-auto md:overflow-y-auto flex-shrink-0">
                    <nav className="flex md:flex-col p-2 md:p-6 gap-2 md:gap-0">
                        {navSections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center whitespace-nowrap px-4 md:px-8 py-2 md:py-2 text-sm md:text-[0.9rem] font-medium transition-colors rounded-full md:rounded-none md:border-l-4 flex-shrink-0 ${activeSection === section.id
                                    ? 'bg-primary text-white md:bg-blue-50 md:text-blue-700 md:border-primary shadow-sm md:shadow-none'
                                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 md:border-transparent'
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Right Content */}
                <main className="flex-1 overflow-y-auto px-4 py-6 md:pt-8 md:pl-8 md:pr-16 md:pb-20 bg-white">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;
