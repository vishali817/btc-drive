import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, SearchX, LayoutGrid, List as ListIcon } from 'lucide-react';
import DriveGrid from '../components/drive/DriveGrid';
import SortDropdown from '../components/drive/SortDropdown';
import { driveData } from '../data/driveData';

const Shared = () => {
    const [activeTab, setActiveTab] = useState('People');
    const tabs = ['People', 'Folders', 'Files'];
    const { searchQuery } = useOutletContext() || { searchQuery: '' };

    // Filter States
    const [viewMode, setViewMode] = useState('grid');
    const [activeFilters, setActiveFilters] = useState({ type: 'All', owner: 'Shared' });

    // Sort States
    const [sortId, setSortId] = useState('dateShared');
    const [sortDirection, setSortDirection] = useState('desc'); // New -> Old
    const [folderPlacement, setFolderPlacement] = useState('mixed');

    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    // Mock items enriched with shared data
    const allItems = driveData.layout.content.grid.items
        .filter(i => i.type !== 'action')
        .map((item, index) => ({
            ...item,
            sharedBy: index % 3 === 0 ? 'Alice Chen' : index % 3 === 1 ? 'Bob Smith' : 'Carol Davis',
            sharedDate: index === 0 ? '15/01/2026 · 09:15 AM' :
                index === 1 ? '14/01/2026 · 02:30 PM' :
                    index === 2 ? '12/01/2026 · 11:00 AM' :
                        '10/01/2026 · 10:45 AM',
            // Mock timestamps
            dateSharedMs: index === 0 ? 1768468500000 : index === 1 ? 1768401000000 : index === 2 ? 1768215600000 : 1768041900000,
            modifiedAt: item.modifiedAt || (Date.now() - (index * 500000)),
            lastOpened: item.lastOpened || (Date.now() - (index * 200000))
        }));

    // Filter Logic
    const getProcessedItems = () => {
        const filtered = allItems.filter(item => {
            // 1. Tab Filter
            if (activeTab === 'Folders' && item.type !== 'folder') return false;
            if (activeTab === 'Files' && item.type === 'folder') return false;

            // 2. Search Filter
            if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

            // 3. Dropdown - Type Filter
            if (activeFilters.type !== 'All') {
                if (activeFilters.type === 'Folder' && item.type !== 'folder') return false;
                if (activeFilters.type !== 'Folder' && item.type === 'folder') return false;
                if (activeFilters.type !== 'Folder') {
                    const fType = item.fileType ? item.fileType.toLowerCase() : '';
                    const filterVal = activeFilters.type.toLowerCase();
                    if (filterVal === 'document' && !['docx', 'doc', 'txt', 'pdf', 'document'].includes(fType)) return false;
                    if (filterVal === 'image' && !['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'image'].includes(fType)) return false;
                    // ... other types
                }
            }
            if (activeFilters.owner === 'Me') return false;
            return true;
        });

        const sortFn = (a, b) => {
            let comparison = 0;
            switch (sortId) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'dateShared':
                    comparison = (a.dateSharedMs || 0) - (b.dateSharedMs || 0);
                    break;
                case 'dateModified':
                    comparison = (a.modifiedAt || 0) - (b.modifiedAt || 0);
                    break;
                case 'dateOpenedByMe':
                    comparison = (a.lastOpened || 0) - (b.lastOpened || 0);
                    break;
                case 'dateModifiedByMe':
                    comparison = (a.modifiedAt || 0) - (b.modifiedAt || 0);
                    break;
                default:
                    comparison = 0;
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        };

        if (folderPlacement === 'top') {
            // Separate Folders and Files, Sort each, then Merge
            const folders = filtered.filter(i => i.type === 'folder').sort(sortFn);
            const files = filtered.filter(i => i.type !== 'folder').sort(sortFn);
            return [...folders, ...files];
        } else {
            return filtered.sort(sortFn);
        }
    };

    const displayItems = getProcessedItems();

    const isGrouped = activeTab === 'People' && activeFilters.owner !== 'Me';
    const groupedItems = isGrouped ? displayItems.reduce((acc, item) => {
        const user = item.sharedBy;
        if (!acc[user]) acc[user] = [];
        acc[user].push(item);
        return acc;
    }, {}) : {};

    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-2 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white/40 shadow-sm relative z-30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 shadow-inner">
                            <Users size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-primary">Shared with me</h1>
                            <p className="text-gray-500 font-medium">Files shared by your team</p>
                        </div>
                    </div>

                    {/* Filter Dropdowns & View Toggle */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <select
                            value={activeFilters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all hover:border-gray-300"
                        >
                            <option value="All">Type: All</option>
                            <option value="Folder">Folder</option>
                            <option value="PDF">PDF</option>
                            <option value="Image">Image</option>
                            <option value="Document">Document</option>
                            <option value="Video">Video</option>
                        </select>
                        <select
                            value={activeFilters.owner}
                            onChange={(e) => handleFilterChange('owner', e.target.value)}
                            className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all hover:border-gray-300"
                        >
                            <option value="Shared">Shared with me</option>
                            <option value="Me">Owned by me</option>
                        </select>

                        <div className="ml-2">
                            <SortDropdown
                                type="shared"
                                activeSort={sortId}
                                sortDirection={sortDirection}
                                onSortChange={setSortId}
                                onDirectionChange={setSortDirection}
                                placement={folderPlacement}
                                onPlacementChange={setFolderPlacement}
                            />
                        </div>

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

                {/* Tabs */}
                <div className="flex gap-1 mt-8 border-b border-gray-200/60 pb-1">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-bold text-sm transition-all relative rounded-t-lg ${activeTab === tab ? 'text-primary bg-white/60' : 'text-gray-400 hover:text-gray-600 hover:bg-white/30'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                        </button>
                    ))}
                </div>
            </header>

            {/* Date & Time Header */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 font-medium border-b border-gray-100 pb-2">
                <span>Last modified: 18 Jan 2026 · 12:10 PM</span>
            </div>

            {isGrouped ? (
                // People View (Grouped)
                Object.keys(groupedItems).length > 0 ? (
                    <div className="space-y-8">
                        {Object.entries(groupedItems).map(([user, items]) => (
                            <div key={user} className="bg-white/30 rounded-3xl p-6 border border-white/40">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-[#0B1F3B] flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {user.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h3 className="font-bold text-[#0B1F3B] text-lg">{user}</h3>
                                    <span className="text-sm font-medium text-gray-500 bg-white/50 px-3 py-1 rounded-full">{items.length} items</span>
                                </div>
                                <DriveGrid items={items} viewMode={viewMode} searchQuery={searchQuery} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <SearchX size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-700">No matching shared files</h3>
                    </div>
                )
            ) : (
                // Standard Grid Filters
                displayItems.length > 0 ? (
                    <DriveGrid items={displayItems} viewMode={viewMode} searchQuery={searchQuery} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <SearchX size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-700">No matching items found</h3>
                    </div>
                )
            )}
        </div>
    );
};

export default Shared;
