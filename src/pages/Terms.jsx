
import { Scale, Lock } from 'lucide-react';

const Terms = () => {
    return (
        <div className="animate-fade-in pb-20 px-8 py-8">
            <header className="mb-12 text-center">
                <div className="inline-flex p-3 bg-blue-100 rounded-2xl mb-4">
                    <Scale size={32} className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms & Policy</h1>
                <p className="text-gray-500 max-w-lg mx-auto">Please read our terms of service and privacy policy carefully.</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Terms of Service */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Scale size={20} className="text-primary" />
                        Terms of Service
                    </h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            <strong>1. Acceptance of Terms:</strong> By accessing and using BTC Drive, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                        <p>
                            <strong>2. Use License:</strong> Permission is granted to temporarily download one copy of the materials (information or software) on BTC Drive's website for personal, non-commercial transitory viewing only.
                        </p>
                        <p>
                            <strong>3. Disclaimer:</strong> The materials on BTC Drive's website are provided "as is". BTC Drive makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
                        </p>
                    </div>
                </div>

                {/* Privacy Policy */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Lock size={20} className="text-green-600" />
                        Privacy Policy
                    </h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            <strong>1. Data Collection:</strong> We collect information you provide directly to us. For example, we collect information when you create an account, subscribe, participate in any interactive features of our services, fill out a form, request customer support or otherwise communicate with us.
                        </p>
                        <p>
                            <strong>2. Data Protection:</strong> We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
                        </p>
                        <p>
                            <strong>3. Cookies:</strong> We use biscuits... wait, cookies, to understand and save your preferences for future visits.
                        </p>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-400 pt-8">
                    Last updated: January 2026
                </div>
            </div>
        </div>
    );
};

export default Terms;
