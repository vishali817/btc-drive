import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Folder, Users, Clock, Star, Trash2, Cloud } from 'lucide-react';
import { driveData } from '../../data/driveData';
import UpgradeModal from '../modals/UpgradeModal';

const iconMap = {
    folder: Folder,
    users: Users,
    clock: Clock,
    star: Star,
    trash: Trash2
};

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sidebar } = driveData.layout;
    const { sections } = sidebar;

    // Upgrade Modal State
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

    const navSection = sections.find(s => s.title === "Navigation");
    const storageSection = sections.find(s => s.title === "Storage");

    return (
        <>
            <aside className="fixed left-4 top-24 bottom-4 w-[260px] flex flex-col z-40">
                {/* Glass Panel */}
                <div className="flex-1 flex flex-col justify-between p-4 rounded-3xl bg-surface/80 backdrop-blur-xl border border-white/40 shadow-card hover:shadow-floating transition-shadow duration-500">

                    {/* Navigation */}
                    <div className="flex flex-col gap-2">
                        <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{navSection?.title}</h3>
                        {navSection?.items.map((item) => {
                            const Icon = iconMap[item.icon] || Folder;
                            const isActive = location.pathname === item.path || (item.path === '/my-drive' && location.pathname === '/');

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => navigate(item.path)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group
                                        ${isActive
                                            ? 'bg-primary/10 text-primary font-bold shadow-inner-light'
                                            : 'hover:bg-white/50 text-text-secondary hover:text-text-primary'
                                        }
                                    `}
                                >
                                    <Icon size={20} className={`transition-colors ${isActive ? 'fill-current/20' : 'group-hover:scale-110'}`} />
                                    <span className="">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Storage */}
                    {storageSection && (
                        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white/40 border border-white/50">
                            <div className="flex items-center gap-2 text-text-primary font-semibold">
                                <Cloud size={18} className="text-primary" />
                                <span>{storageSection.title}</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${storageSection.usage.percentage}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 font-medium">
                                    <span>{storageSection.usage.used} used</span>
                                    <span>{storageSection.usage.total}</span>
                                </div>
                            </div>

                            {storageSection.action && (
                                <button
                                    onClick={() => setIsUpgradeOpen(true)}
                                    className="w-full py-2 rounded-xl border border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    {storageSection.action.label}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </aside>

            {/* Upgrade Modal */}
            <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />
        </>
    );
};

export default Sidebar;
