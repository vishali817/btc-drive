import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';

const FolderTile = ({ folder, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.05 }}
            onClick={onClick}
            className="flex flex-col items-center gap-3 group cursor-pointer"
        >
            <div className="relative w-32 h-32 rounded-full bg-surface/50 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-primary/20 transition-all duration-300">
                <div className="absolute inset-2 bg-gradient-to-br from-white/80 to-transparent rounded-full pointer-events-none" />

                <Folder className="text-[#0B1F3B] relative z-10 fill-current/10" size={36} />

                <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-[#0B1F3B] animate-bounce-slow border border-gray-100">
                    {parseInt(folder.meta) || 0}
                </div>
            </div>
            <div className="text-center w-full px-2">
                <span className="font-bold text-[#0B1F3B] text-sm group-hover:text-blue-700 transition-colors block truncate">{folder.name}</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                    {folder.sharedDate ? folder.sharedDate.replace('Shared on ', '') :
                        folder.createdAt ? new Date(folder.createdAt).toLocaleDateString() : ''}
                </span>
                <span className="text-[9px] text-gray-400 block mt-0.5">{folder.meta}</span>
            </div>
        </motion.div>
    );
};

export default FolderTile;
