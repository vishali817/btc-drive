import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import btcLogo from '../assets/logo/btc-logo.png';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            if (onLogin) onLogin();
            navigate('/my-drive');
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#E9F4FF] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>

            <div className="w-full max-w-md p-8 relative z-10">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-white p-3 rounded-2xl shadow-sm mb-4">
                        <img src={btcLogo} alt="BTC Drive" className="h-8 w-auto" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0B1F3B]">Sign in to BTC Drive</h2>
                    <p className="text-gray-500 text-sm mt-2">Secure access to your files</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 border border-white/50 backdrop-blur-sm">
                    <div className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-400 group-focus-within:text-[#0B1F3B] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-[#0B1F3B] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400 group-focus-within:text-[#0B1F3B] transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-[#0B1F3B] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#0B1F3B] hover:bg-[#144a8f] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Login
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-8">
                    &copy; 2026 BTC Drive. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
