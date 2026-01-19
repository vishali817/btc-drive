import { motion } from 'framer-motion';
import { FileText, MoreVertical } from 'lucide-react';

const FileTile = ({ file }) => {
    const getFileConfig = (type) => {
        switch (type) {
            case 'pdf': return { icon: FileText, color: 'bg-red-500' };
            case 'spreadsheet': return { icon: FileText, color: 'bg-green-500' }; // simplified icon import
            case 'image': return { icon: FileText, color: 'bg-blue-500' };
            case 'video': return { icon: FileText, color: 'bg-purple-500' };
            case 'document': return { icon: FileText, color: 'bg-blue-400' };
            default: return { icon: FileText, color: 'bg-gray-500' };
        }
    };

    const { icon: Icon, color } = getFileConfig(file.fileType);

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex flex-col items-center gap-3 group cursor-pointer"
        >
            <div className="relative w-32 h-32 rounded-full bg-surface/50 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-primary/20 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-2 bg-gradient-to-br from-white/80 to-transparent rounded-full pointer-events-none" />

                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white shadow-md z-10`}>
                    <Icon size={24} />
                </div>

                {/* Type Badge */}
                <div className="absolute bottom-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">
                    {file.fileType}
                </div>
            </div>

            <div className="text-center w-full px-2">
                <h3 className="font-bold text-[#0B1F3B] text-sm group-hover:text-blue-700 transition-colors truncate w-full block">{file.name}</h3>
                <div className="flex flex-col gap-0.5 mt-1">
                    <span className="text-[10px] text-gray-400">
                        {file.sharedDate ? file.sharedDate.replace('Shared on ', '') :
                            file.createdAt ? new Date(file.createdAt).toLocaleDateString() : 'Jan 16, 2026'}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">{file.size}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default FileTile;
