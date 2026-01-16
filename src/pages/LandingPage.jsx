import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextType from '../components/animations/TextType';
import ScrollFloat from '../components/animations/ScrollFloat';
import GlareHover from '../components/animations/GlareHover';
import { Cloud, Share2, Shield, Folder, Activity, Lock } from 'lucide-react';
import btcLogo from '../assets/logo/btc-logo.png';

const LandingPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email.trim() && password.trim()) {
            onLogin();
            navigate('/my-drive');
        } else {
            setError('Fields cannot be empty');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const features = [
        { title: 'Cloud Storage', icon: <Cloud size={40} className="text-white" />, desc: 'Securely store all your files in the cloud.' },
        { title: 'Easy Sharing', icon: <Share2 size={40} className="text-white" />, desc: 'Share files and folders with anyone, anywhere.' },
        { title: 'Secure Vault', icon: <Shield size={40} className="text-white" />, desc: 'Bank-grade encryption for your sensitive data.' },
        { title: 'Smart Folders', icon: <Folder size={40} className="text-white" />, desc: 'Organize content automatically with smart tags.' },
        { title: 'Activity Tracking', icon: <Activity size={40} className="text-white" />, desc: 'Monitor file access and changes in real-time.' },
        { title: 'Privacy First', icon: <Lock size={40} className="text-white" />, desc: 'Your data belongs to you. No tracking.' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E9F4FF] via-white to-blue-50 overflow-y-auto font-sans relative selection:bg-[#195BAC] selection:text-white">
            {/* Header / Login */}
            <header className="absolute top-0 right-0 p-6 z-50 flex items-center justify-between w-full px-8">
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={scrollToTop}
                >
                    <img
                        src={btcLogo}
                        alt="BTC Drive Logo"
                        className="h-10 w-auto transition-transform duration-200 ease-in-out group-hover:scale-105"
                    />
                    <span className="text-xl font-bold text-[#195BAC]">BTC Drive</span>
                </div>

                {!isLoginOpen ? (
                    <button
                        onClick={() => setIsLoginOpen(true)}
                        className="px-8 py-3 bg-[#195BAC] text-white rounded-full font-bold hover:bg-[#144a8f] transition-all transform hover:scale-105 shadow-xl shadow-blue-200"
                    >
                        Login
                    </button>
                ) : (
                    <form onSubmit={handleLogin} className="flex flex-col gap-3 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/50 animate-in fade-in slide-in-from-top-4 w-72">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-[#195BAC] text-lg">Welcome Back</h3>
                            <button type="button" onClick={() => setIsLoginOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">&times;</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:border-[#195BAC] focus:ring-2 focus:ring-blue-100 transition-all shadow-inner"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:border-[#195BAC] focus:ring-2 focus:ring-blue-100 transition-all shadow-inner"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <span className="text-red-500 text-xs font-bold ml-1">{error}</span>}
                        <button type="submit" className="w-full bg-[#195BAC] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#144a8f] shadow-lg shadow-blue-200 active:scale-95 transition-all mt-2">
                            Access Drive
                        </button>
                    </form>
                )}
            </header>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center pt-32 px-4 text-center relative overflow-hidden">
                {/* Background Blobs (Decoration) */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-pulse"></div>
                <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>

                <div className="mb-6 relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-[#195BAC] font-bold text-xs tracking-wider uppercase mb-8 shadow-sm">
                        Future of Cloud Storage
                    </span>
                    <TextType
                        text={["Secure. Fast. Infinite.", "Welcome to BTC Drive"]}
                        typingSpeed={50}
                        pauseDuration={2000}
                        showCursor={true}
                        cursorCharacter="_"
                        className="text-5xl md:text-7xl font-black text-[#195BAC] tracking-tight drop-shadow-sm"
                    />
                </div>

                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-10 leading-relaxed font-medium">
                    Experience the next generation of file management. <br className="hidden md:block" />
                    Bank-grade encryption meets futuristic design.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-24 relative z-10">
                    <button onClick={() => setIsLoginOpen(true)} className="px-8 py-4 bg-[#195BAC] text-white rounded-2xl font-bold text-lg hover:bg-[#144a8f] transition-all transform hover:translate-y-[-4px] shadow-xl shadow-blue-300">
                        Get Started Free
                    </button>
                    <button
                        onClick={() => {
                            const section = document.getElementById('features-section');
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="px-8 py-4 bg-white text-[#195BAC] border-2 border-[#195BAC]/10 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:translate-y-[-4px]"
                    >
                        View Features
                    </button>
                </div>

                {/* Features Section */}
                <div id="features-section" className="w-full max-w-7xl mx-auto pb-32 relative z-10">
                    <div className="mb-20">
                        <ScrollFloat
                            containerClassName="flex justify-center"
                            textClassName="text-[#195BAC] font-black text-4xl md:text-5xl opacity-90"
                        >
                            Why Choose BTC Drive
                        </ScrollFloat>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {features.map((f, i) => (
                            <GlareHover key={i} width="100%" height="320px" borderRadius="32px" background="rgba(255,255,255,0.8)" glareColor="#195BAC" className="shadow-2xl shadow-blue-100/50 backdrop-blur-sm border border-white/60">
                                <div className="flex flex-col items-center justify-center p-8 text-center h-full w-full group">
                                    <div className="w-20 h-20 bg-gradient-to-tr from-[#195BAC] to-blue-400 rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500 flex items-center justify-center mb-8 shadow-xl shadow-blue-200">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{f.title}</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
                                </div>
                            </GlareHover>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
