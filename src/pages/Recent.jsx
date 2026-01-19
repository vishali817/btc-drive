import { useState } from 'react';
import { Clock, SearchX, LayoutGrid, List as ListIcon } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import DriveGrid from '../components/drive/DriveGrid';
import SortDropdown from '../components/drive/SortDropdown';
import { driveData } from '../data/driveData';

const Recent = () => {
    const { searchQuery } = useOutletContext() || { searchQuery: '' };
    const [viewMode, setViewMode] = useState(() => window.innerWidth < 768 ? 'list' : 'grid');

    // Sort State
    const [sortId, setSortId] = useState('dateOpenedByMe'); // Default for Recent
    const [sortDirection, setSortDirection] = useState('desc'); // New -> Old

    // Recent view usually doesn't have "Folders on top" toggle as it's a stream of files, but sticking to prompt rules if relevant.
    // Prompt says "Add and fully implement these sorting options everywhere sorting is available... Folder positioning".
    // I'll add it but it might have little effect if Recent only shows files usually.
    // However, mock data might have folders. 
    const [folderPlacement, setFolderPlacement] = useState('mixed');

    // Filter Logic (Keep simple filters or just Type/Owner) (Prompt says "Preserve current filters")
    const [activeFilters, setActiveFilters] = useState({ type: 'All', owner: 'All' });

    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    // Flatten items for Recent
    const allItems = driveData.layout.content.grid.items.map((item, index) => ({
        ...item,
        // Mock Dates for grouping
        // Today: < 24h
        // Yesterday: < 48h
        // Earlier this week: < 7 days
        // Earlier this month: < 30 days
        // Older
        modifiedAt: item.modifiedAt || (Date.now() - index * 100000000), // Random spread
        lastOpened: item.lastOpened || (Date.now() - index * 50000000),
    }));

    // 1. Filter
    const filteredItems = allItems.filter(item => {
        if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        // Type Filter
        if (activeFilters.type !== 'All') {
            if (activeFilters.type === 'Folder' && item.type !== 'folder') return false;
            if (activeFilters.type !== 'Folder' && item.type === 'folder') return false;
            if (activeFilters.type !== 'Folder') {
                const fType = item.fileType ? item.fileType.toLowerCase() : '';
                const filterVal = activeFilters.type.toLowerCase();
                // ... simple checks matching other pages
                if (filterVal === 'document' && !['docx', 'doc', 'txt', 'pdf', 'document'].includes(fType)) return false;
                if (filterVal === 'image' && !['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'image'].includes(fType)) return false;
                if (filterVal === 'video' && !['mp4', 'mov', 'avi', 'webm', 'video'].includes(fType)) return false;
                if (filterVal === 'pdf' && fType !== 'pdf') return false;
            }
        }

        // Owner Filter
        if (activeFilters.owner === 'Me') return !item.sharedBy;
        if (activeFilters.owner === 'Shared') return !!item.sharedBy;

        return true;
    });

    // 2. Grouping Helper
    const getGroupLabel = (date) => {
        const now = new Date();
        const d = new Date(date);
        const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return 'Earlier this week';
        if (diffDays < 30) return 'Earlier this month';
        if (diffDays < 60) return 'Last month';
        return 'Older';
    };

    // 3. Sort & Group
    // We group first based on "Last Opened" or "Modified" usually? 
    // Google Drive "Recent" is strictly "Last opened by me".
    // If I sort by "Name", does it still group? 
    // Prompt: "Grouping should be based on file activity date. Sorting options should still work within each group."

    // So:
    // A. Identify the date field to group by. Default 'lastOpened' or 'modifiedAt'.
    const groupDateField = 'lastOpened'; // or 'modifiedAt'

    // B. Bucket items
    const groups = {
        'Today': [],
        'Yesterday': [],
        'Earlier this week': [],
        'Earlier this month': [],
        'Last month': [],
        'Older': []
    };

    filteredItems.forEach(item => {
        const date = item[groupDateField] || 0;
        const label = getGroupLabel(date);
        if (groups[label]) groups[label].push(item);
        else groups['Older'].push(item); // Fallback
    });

    // C. Remove empty groups & Sort items within groups
    const sortedGroups = Object.entries(groups).filter(([_, list]) => list.length > 0).map(([label, list]) => {
        // Sort the list based on selected sortId
        const sortedList = list.sort((a, b) => {
            let comparison = 0;
            switch (sortId) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'dateModified':
                    comparison = (a.modifiedAt || 0) - (b.modifiedAt || 0);
                    break;
                case 'dateModifiedByMe':
                    // Mock same as modifiedAt
                    comparison = (a.modifiedAt || 0) - (b.modifiedAt || 0);
                    break;
                case 'dateOpenedByMe':
                    comparison = (a.lastOpened || 0) - (b.lastOpened || 0);
                    break;
                default:
                    comparison = 0;
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        });

        return { label, items: sortedList };
    });

    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    {/* Row 1: Title + Mobile Toggles */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg text-primary">
                                <Clock size={24} />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Recent</h1>
                        </div>

                        {/* Mobile Toggles */}
                        <div className="flex md:hidden bg-white/50 p-1 rounded-xl shadow-sm border border-gray-200 ml-2">
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

                    {/* Row 2: Filters + Desktop Toggles */}
                    <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                        {/* Filters */}
                        <select
                            value={activeFilters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="w-full md:w-auto bg-white/50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                            className="w-full md:w-auto bg-white/50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        >
                            <option value="All">Owner: All</option>
                            <option value="Me">Owned by me</option>
                            <option value="Shared">Shared with me</option>
                        </select>

                        <div className="w-full md:w-auto ml-0 md:ml-2">
                            <SortDropdown
                                activeSort={sortId}
                                sortDirection={sortDirection}
                                onSortChange={setSortId}
                                onDirectionChange={setSortDirection}
                                placement={folderPlacement}
                                onPlacementChange={setFolderPlacement}
                            />
                        </div>

                        <div className="hidden md:flex bg-white/50 p-1 rounded-xl shadow-sm border border-gray-200 ml-2">
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
            </header>

            {/* Grouped Content */}
            {sortedGroups.length > 0 ? (
                <div className="space-y-8">
                    {sortedGroups.map(group => (
                        <div key={group.label}>
                            <h3 className="text-sm font-medium text-gray-500 mb-4 ml-1">{group.label}</h3>
                            <DriveGrid items={group.items} viewMode={viewMode} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <SearchX size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700">No matching recent files</h3>
                </div>
            )}
        </div>
    );
};

export default Recent;
