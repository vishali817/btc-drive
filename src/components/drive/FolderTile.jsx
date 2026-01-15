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

                <Folder className="text-primary relative z-10 fill-current/10" size={36} />

                <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-primary animate-bounce-slow border border-gray-100">
                    {parseInt(folder.meta) || 0}
                </div>
            </div>
            <div className="text-center">
                <span className="font-medium text-text-secondary text-sm group-hover:text-primary transition-colors block">{folder.name}</span>
                <span className="text-[10px] text-gray-400 block mt-1">{folder.meta}</span>
            </div>
        </motion.div>
    );
};

export default FolderTile;
