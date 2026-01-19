import { useState } from 'react';

const Tooltip = ({ text, children, position = 'bottom' }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`absolute ${position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded shadow-lg whitespace-nowrap z-[110] pointer-events-none animate-in fade-in zoom-in-95 duration-300`}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
