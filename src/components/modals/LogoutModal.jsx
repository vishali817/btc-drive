import React from 'react';
import Modal from '../common/Modal';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Log Out" maxWidth="max-w-sm">
            <div className="flex flex-col gap-4">
                <p className="text-gray-600">
                    Are you sure you want to log out?
                </p>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default LogoutModal;
