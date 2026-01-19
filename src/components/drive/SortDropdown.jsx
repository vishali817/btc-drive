import { useState, useRef, useEffect } from 'react';
import { ArrowDown, ArrowUp, Check } from 'lucide-react';
import Tooltip from '../common/Tooltip';

const SortDropdown = ({ activeSort, sortDirection, placement, onSortChange, onDirectionChange, onPlacementChange, type = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const options = [
        { id: 'name', label: 'Name' },
        { id: 'dateModified', label: 'Date modified' },
        { id: 'dateModifiedByMe', label: 'Date modified by me' },
        { id: 'dateOpenedByMe', label: 'Date opened by me' },
    ];

    if (type === 'shared') {
        options.unshift({ id: 'dateShared', label: 'Date shared' });
    }

    const handleSortClick = (id) => {
        onSortChange(id);
        setIsOpen(false);
    };

    const getDirectionLabel = (currentSortId, direction) => {
        if (currentSortId === 'name') {
            return direction === 'asc' ? 'A → Z' : 'Z → A';
        }
        if (['dateModified', 'dateModifiedByMe', 'dateOpenedByMe', 'dateShared'].includes(currentSortId)) {
            return direction === 'desc' ? 'New → Old' : 'Old → New';
        }
        return direction === 'asc' ? 'Ascending' : 'Descending';
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Tooltip text="Sort by">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-auto active:bg-gray-200"
                >
                    <span className="whitespace-nowrap">{options.find(o => o.id === activeSort)?.label || 'Sort by'}</span>
                    {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </button>
            </Tooltip>

            {isOpen && (
                <>
                    {/* Mobile Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 z-[90] md:hidden backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown / Bottom Sheet */}
                    <div className={`
                        fixed bottom-0 left-0 right-0 w-full bg-white z-[100] overflow-y-auto 
                        rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-100 py-4 max-h-[80vh]
                        animate-in slide-in-from-bottom duration-300
                        md:absolute md:right-0 md:top-full md:mt-1 md:w-max md:min-w-[200px] md:bottom-auto md:left-auto md:rounded-lg md:shadow-xl md:py-2 md:border
                        md:animate-in md:fade-in md:zoom-in-95 md:duration-100 md:origin-top-right
                    `}>
                        <div className="px-4 md:px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 md:mb-0">
                            Sort by
                        </div>
                        {options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSortClick(option.id)}
                                className="w-full flex items-center justify-between px-6 md:px-4 py-3 md:py-2 text-base md:text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap active:bg-gray-100"
                            >
                                <span>{option.label}</span>
                                {activeSort === option.id && <Check size={18} className="text-gray-900 ml-3" />}
                            </button>
                        ))}

                        <div className="my-2 border-t border-gray-100" />

                        <div className="px-4 md:px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider md:hidden mb-2">
                            Order
                        </div>

                        <button
                            onClick={() => { onDirectionChange('asc'); setIsOpen(false); }}
                            className="w-full flex items-center justify-between px-6 md:px-4 py-3 md:py-2 text-base md:text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap active:bg-gray-100"
                        >
                            <span>{getDirectionLabel(activeSort, 'asc')}</span>
                            {sortDirection === 'asc' && <Check size={18} className="text-gray-900 ml-3" />}
                        </button>
                        <button
                            onClick={() => { onDirectionChange('desc'); setIsOpen(false); }}
                            className="w-full flex items-center justify-between px-6 md:px-4 py-3 md:py-2 text-base md:text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap active:bg-gray-100"
                        >
                            <span>{getDirectionLabel(activeSort, 'desc')}</span>
                            {sortDirection === 'desc' && <Check size={18} className="text-gray-900 ml-3" />}
                        </button>

                        {placement && (
                            <>
                                <div className="my-2 border-t border-gray-100" />
                                <div className="px-4 md:px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider md:hidden mb-2">
                                    Placement
                                </div>
                                <button
                                    onClick={() => { onPlacementChange('top'); setIsOpen(false); }}
                                    className="w-full flex items-center justify-between px-6 md:px-4 py-3 md:py-2 text-base md:text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap active:bg-gray-100"
                                >
                                    <span>Folders on top</span>
                                    {placement === 'top' && <Check size={18} className="text-gray-900 ml-3" />}
                                </button>
                                <button
                                    onClick={() => { onPlacementChange('mixed'); setIsOpen(false); }}
                                    className="w-full flex items-center justify-between px-6 md:px-4 py-3 md:py-2 text-base md:text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap active:bg-gray-100"
                                >
                                    <span>Mixed with files</span>
                                    {placement === 'mixed' && <Check size={18} className="text-gray-900 ml-3" />}
                                </button>
                            </>
                        )}

                        {/* Mobile handle/close indicator */}
                        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-4 mb-2 md:hidden"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SortDropdown;
