import { Share2, File, CheckCircle } from 'lucide-react';
import CircularButton from '../common/CircularButton';

const NotificationMenu = ({ onViewAll }) => {
    // Mock notifications
    const notifications = [
        { id: 1, type: 'upload', message: 'Project_Specs.pdf uploaded', time: '2m ago', icon: CheckCircle, color: 'text-green-500' },
        { id: 2, type: 'share', message: 'Alice shared "Design Assets"', time: '1h ago', icon: Share2, color: 'text-blue-500' },
        { id: 3, type: 'file', message: 'Meeting notes updated', time: '3h ago', icon: File, color: 'text-gray-500' },
    ];

    return (
        <div className="flex flex-col py-2 max-h-80 overflow-y-auto">
            <h4 className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Activity</h4>

            {notifications.map(note => (
                <div key={note.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className={`mt-0.5 ${note.color}`}>
                        <note.icon size={16} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 leading-snug">{note.message}</p>
                        <span className="text-xs text-gray-400">{note.time}</span>
                    </div>
                </div>
            ))}

            <div className="border-t border-gray-100 mt-2 pt-2 px-4 pb-2">
                <button
                    onClick={onViewAll}
                    className="text-xs text-primary font-bold hover:underline"
                >
                    View All
                </button>
            </div>
        </div>
    );
};

export default NotificationMenu;
