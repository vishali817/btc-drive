import { useNavigate } from 'react-router-dom';
import { HelpCircle, BookOpen, FileText, MessageSquare } from 'lucide-react';

const SupportMenu = ({ onClose }) => {
    const navigate = useNavigate();

    const menuItems = [
        { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
        { id: 'training', label: 'Training', icon: BookOpen, action: 'placeholder' },
        { id: 'terms', label: 'Terms and Policy', icon: FileText, action: 'placeholder' },
        { id: 'feedback', label: 'Send feedback', icon: MessageSquare, action: 'feedback' },
    ];

    const handleClick = (item) => {
        onClose();
        if (item.path) {
            navigate(item.path);
        } else if (item.action === 'placeholder') {
            console.log(`Action: ${item.label} clicked - Coming soon`);
        } else if (item.action === 'feedback') {
            console.log('Open Send Feedback Modal');
        }
    };

    return (
        <div className="flex flex-col py-2">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleClick(item)}
                    className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-[#E9F4FF] transition-colors duration-300 w-full text-left"
                >
                    <item.icon size={18} className="text-gray-500" />
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
};

export default SupportMenu;
