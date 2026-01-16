import { Zap, Check, Shield } from 'lucide-react';
import Modal from '../common/Modal';

const UpgradeModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Upgrade Your Plan" maxWidth="max-w-2xl">
            <div className="flex flex-col gap-6">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-primary to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                        <Zap size={32} fill="currentColor" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Storage & Plans</h2>

                    {/* Storage Usage Bar */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 max-w-sm mx-auto">
                        <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                            <span>Storage Usage</span>
                            <span>65%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: '65%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>6.5 GB used</span>
                            <span>10 GB total</span>
                        </div>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Basic Plan (Current) */}
                    <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 opacity-90">
                        <h4 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Personal</h4>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-2xl font-bold text-gray-900">Free</span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Check size={16} className="text-green-500" /> 10 GB Storage
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Check size={16} className="text-green-500" /> Basic Support
                            </div>
                        </div>
                        <button disabled className="w-full py-2 rounded-xl border border-gray-300 text-gray-400 font-bold text-sm cursor-default">Current Plan</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative p-6 rounded-2xl border-2 border-primary bg-white shadow-xl transform scale-105">
                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
                            POPULAR
                        </div>
                        <h4 className="font-bold text-primary uppercase text-xs tracking-wider mb-2">Pro Account</h4>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl font-bold text-gray-900">$12</span>
                            <span className="text-gray-500 text-sm">/mo</span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Check size={16} className="text-primary" /> 2 TB Storage
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Check size={16} className="text-primary" /> Advanced Security
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Check size={16} className="text-primary" /> Priority Support
                            </div>
                        </div>
                        <button className="w-full py-2 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default UpgradeModal;
