import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const ActionTile = ({ action, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex flex-col items-center gap-3 cursor-pointer group"
        >
            <div className={`relative w-32 h-32 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all duration-300`}>
                <Plus className="text-primary" size={32} />
            </div>
            <span className="font-medium text-primary text-sm">{action.name}</span>
        </motion.div>
    );
};

export default ActionTile;
