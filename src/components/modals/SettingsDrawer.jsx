import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Shield, HardDrive, Settings as SettingsIcon } from 'lucide-react';

const SettingsDrawer = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = React.useState('account');

    // Reset tab on open (optional, but good UX to start fresh or keep check persistence if we wanted)
    // For now, let's keep it simple.

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const sections = [
        { id: 'account', icon: User, label: 'Account' },
        { id: 'storage', icon: HardDrive, label: 'Storage' },
        { id: 'preferences', icon: SettingsIcon, label: 'Preferences' },
        { id: 'security', icon: Shield, label: 'Security' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <div className="space-y-4">
                        <div className="pt-2 space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Current Plan</label>
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                                <span className="font-medium text-gray-700">Pro Plan</span>
                                <button className="text-xs font-bold text-primary">Manage</button>
                            </div>
                        </div>
                        <div className="pt-2 space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Billing Cycle</label>
                            <div className="flex items-center justify-between text-sm text-gray-700">
                                <span>Next payment due</span>
                                <span className="font-medium">Feb 16, 2026</span>
                            </div>
                        </div>
                    </div>
                );
            case 'storage':
                return (
                    <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <h4 className="font-bold text-primary mb-2">75% Used</h4>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-3/4" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">15 GB of 20 GB used</p>
                        </div>
                        <button className="w-full py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">Buy Storage</button>
                    </div>
                );
            case 'preferences':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium text-gray-700">Dark Mode</span>
                            <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                            <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-4">
                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors text-sm font-medium text-red-500 border border-red-100">
                            Change Password
                        </button>
                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors text-sm font-medium text-gray-700 border border-gray-100">
                            Two-Factor Authentication
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Settings</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <div className="flex border-b border-gray-100 overflow-x-auto">
                                {sections.map(section => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveTab(section.id)}
                                        className={`flex-1 min-w-[80px] py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === section.id ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <section.icon size={18} />
                                            <span className="text-[10px]">{section.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 capitalize">{activeTab}</h3>
                                {renderContent()}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <p className="text-xs text-center text-gray-400">Version 2.4.0</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SettingsDrawer;
