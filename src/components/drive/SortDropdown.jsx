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
                <div className="absolute right-0 top-full mt-1 w-max min-w-[200px] bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[100] max-h-[60vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Sort by
                    </div>
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSortClick(option.id)}
                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap"
                        >
                            <span>{option.label}</span>
                            {activeSort === option.id && <Check size={16} className="text-gray-900 ml-3" />}
                        </button>
                    ))}

                    <div className="my-2 border-t border-gray-100" />

                    <button
                        onClick={() => { onDirectionChange('asc'); setIsOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap"
                    >
                        <span>{getDirectionLabel(activeSort, 'asc')}</span>
                        {sortDirection === 'asc' && <Check size={16} className="text-gray-900 ml-3" />}
                    </button>
                    <button
                        onClick={() => { onDirectionChange('desc'); setIsOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap"
                    >
                        <span>{getDirectionLabel(activeSort, 'desc')}</span>
                        {sortDirection === 'desc' && <Check size={16} className="text-gray-900 ml-3" />}
                    </button>

                    {placement && (
                        <>
                            <div className="my-2 border-t border-gray-100" />
                            <button
                                onClick={() => { onPlacementChange('top'); setIsOpen(false); }}
                                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap"
                            >
                                <span>Folders on top</span>
                                {placement === 'top' && <Check size={16} className="text-gray-900 ml-3" />}
                            </button>
                            <button
                                onClick={() => { onPlacementChange('mixed'); setIsOpen(false); }}
                                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left whitespace-nowrap"
                            >
                                <span>Mixed with files</span>
                                {placement === 'mixed' && <Check size={16} className="text-gray-900 ml-3" />}
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
