import { LogOut, User, Settings, CreditCard } from 'lucide-react';

const ProfileMenu = ({ onAction }) => {
    return (
        <div className="flex flex-col py-2 w-64">
            <div className="px-4 py-3 border-b border-gray-100 mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                        JS
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm">John Smith</span>
                        <span className="text-xs text-gray-500">john.smith@example.com</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-2">
                <button
                    onClick={() => onAction('profile')}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                    <User size={16} className="text-gray-500" />
                    Profile
                </button>
                <button
                    onClick={() => onAction('billing')}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                    <CreditCard size={16} className="text-gray-500" />
                    Billing & Plans
                </button>
            </div>

            <div className="border-t border-gray-100 mt-2 pt-2 px-2">
                <button
                    onClick={() => onAction('logout')}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileMenu;
