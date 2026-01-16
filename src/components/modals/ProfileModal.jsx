import React from 'react';
import Modal from '../common/Modal';
import { User, Mail, Shield } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="My Profile" maxWidth="max-w-md">
            <div className="flex flex-col items-center gap-6 py-4">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-primary/20">
                        JD
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                {/* Info */}
                <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                        <Mail size={16} />
                        <span>john.doe@example.com</span>
                    </div>
                </div>

                {/* Account Details Card */}
                <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Account Type</span>
                        <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-xs">Pro Member</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Member Since</span>
                        <span className="text-gray-700 font-semibold">Jan 2024</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Security</span>
                        <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
                            <Shield size={12} />
                            Verified
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProfileModal;
