import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Cloud, SearchX, LayoutGrid, List as ListIcon, ArrowUp, ArrowDown } from 'lucide-react';
import DriveGrid from '../components/drive/DriveGrid';
import { driveData } from '../data/driveData';
import Tooltip from '../components/common/Tooltip';

const parseSize = (sizeStr) => {
    if (!sizeStr) return 0;
    const units = { 'B': 1, 'KB': 1024, 'MB': 1024 * 1024, 'GB': 1024 * 1024 * 1024 };
    const parts = sizeStr.split(' ');
    if (parts.length < 2) return 0;
    const value = parseFloat(parts[0]);
    const unit = parts[1].toUpperCase();
    return value * (units[unit] || 1);
};

const Storage = () => {
    const { searchQuery } = useOutletContext() || { searchQuery: '' };

    // View State
    const [viewMode, setViewMode] = useState('grid');

    // Sorting State
    // Storage page typically only sorts by Size or Name, but mainly Storage Used.
    // Google Drive Storage page: Sort Label "Storage used", clickable to toggle direction.
    const [sortDirection, setSortDirection] = useState('desc'); // High -> Low

    // Mock Data
    const allItems = driveData.layout.content.grid.items
        .filter(i => i.type !== 'action')
        .map((item, index) => ({
            ...item,
            createdAt: item.createdAt || (Date.now() - index * 10000000),
            modifiedAt: item.modifiedAt || (Date.now() - index * 500000),
            sizeBytes: item.type === 'folder'
                ? parseSize(item.meta ? item.meta.split('•')[1]?.trim() : '0 B')
                : parseSize(item.size || '0 B')
        }));

    // Filter & Sort Logic
    // Storage view lists biggest files first. 
    const getProcessedItems = () => {
        const filtered = allItems.filter(item => {
            if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });

        // Always sort by size for Storage view main column
        const sortFn = (a, b) => {
            const comparison = (a.sizeBytes || 0) - (b.sizeBytes || 0);
            return sortDirection === 'asc' ? comparison : -comparison;
        };

        return filtered.sort(sortFn);
    };

    const displayItems = getProcessedItems();

    const handleSortToggle = () => {
        setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 shadow-inner">
                            <Cloud size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-primary">Storage</h1>
                            <p className="text-gray-500 font-medium">View items taking up storage</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Toggle Sort Button specific to Storage */}
                        <Tooltip text={sortDirection === 'desc' ? "Sort large to small" : "Sort small to large"}>
                            <button
                                onClick={handleSortToggle}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <span>Storage used</span>
                                {sortDirection === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                            </button>
                        </Tooltip>

                        <div className="flex bg-white/50 p-1 rounded-xl shadow-sm border border-gray-200 ml-2">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white shadow text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <ListIcon size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white shadow text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <LayoutGrid size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm max-w-md">
                    <div className="flex justify-between text-sm font-medium mb-2">
                        <span className="text-gray-700">4.5 GB of 15 GB used</span>
                        <button className="text-primary hover:underline">Buy storage</button>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-[30%] bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </header>

            {displayItems.length > 0 ? (
                <DriveGrid items={displayItems} viewMode={viewMode} searchQuery={searchQuery} />
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <SearchX size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700">No storage items found</h3>
                </div>
            )}
        </div>
    );
};

export default Storage;
