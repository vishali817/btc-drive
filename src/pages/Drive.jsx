import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { ChevronRight, LayoutGrid, List as ListIcon, SearchX } from 'lucide-react';
import DriveGrid from '../components/drive/DriveGrid';
import SortDropdown from '../components/drive/SortDropdown';
import { driveData } from '../data/driveData';

const Drive = () => {
    const { folderId } = useParams();
    const navigate = useNavigate();
    const { searchQuery, fileSystem } = useOutletContext() || { searchQuery: '', fileSystem: { items: [] } };
    const { content } = driveData.layout;

    // State
    const [viewMode, setViewMode] = useState('grid');
    const [items, setItems] = useState(content.grid.items);
    const [breadcrumbs, setBreadcrumbs] = useState(content.breadcrumb);

    // Filter States
    const [activeFilters, setActiveFilters] = useState({ type: 'All', owner: 'All' });

    // Sorting State
    const [sortId, setSortId] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [folderPlacement, setFolderPlacement] = useState('top');

    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (folderId) {
            // Mock Data for Sub-folder
            const folderName = items.find(i => i.id === folderId)?.name || "Unknown Folder";

            // Generate some items (reuse previous mock logic)
            const mockSubItems = [
                { id: `${folderId}-1`, type: 'folder', name: 'Sub Project A', meta: '3 files • 12 MB', createdAt: Date.now() - 10000000 },
                { id: `${folderId}-2`, type: 'file', fileType: 'docx', name: 'Requirements.docx', size: '15 KB', createdAt: Date.now() - 5000000 },
                { id: `${folderId}-3`, type: 'file', fileType: 'png', name: 'Mockup_final.png', size: '2.4 MB', createdAt: Date.now() - 2000000 },
                { id: `${folderId}-4`, type: 'action', name: 'Create New', createdAt: 0 }
            ];

            setItems(mockSubItems);

            const folderTitle = folderName === "Unknown Folder" ? `Folder ${folderId}` : folderName;
            setBreadcrumbs(["My Files", "Work Projects", folderTitle]);

        } else {
            // Root
            let initialItems = [];
            if (fileSystem && fileSystem.items) {
                initialItems = fileSystem.items;
            } else {
                initialItems = content.grid.items;
            }

            // Enrich with timestamps if missing (for sorting)
            const enrichedItems = initialItems.map((item, index) => ({
                ...item,
                createdAt: item.createdAt || (Date.now() - (index * 10000000)),
                modifiedAt: item.modifiedAt || (Date.now() - (index * 500000))
            }));

            setItems(enrichedItems);
            setBreadcrumbs(["My Files", "Work Projects"]);
        }
    }, [folderId, fileSystem]);

    // Navigate to root on breadcrumb click
    const handleBreadcrumbClick = (index) => {
        if (index === 0) {
            navigate('/my-drive');
        }
    };

    // Sorting Helper
    const sortItems = (itemList) => {
        return itemList.sort((a, b) => {
            // Actions always first or last? Let's keep 'action' type (Create New) at the very start always for grid
            if (a.type === 'action' && b.type !== 'action') return -1;
            if (b.type === 'action' && a.type !== 'action') return 1;
            if (a.type === 'action' && b.type === 'action') return 0;

            let comparison = 0;
            switch (sortId) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'dateModified':
                    comparison = (a.modifiedAt || 0) - (b.modifiedAt || 0);
                    break;
                case 'dateOpenedByMe':
                    // Mock: using createdAt or modifiedAt as proxy
                    comparison = (a.lastOpened || a.modifiedAt || 0) - (b.lastOpened || b.modifiedAt || 0);
                    break;
                default:
                    comparison = 0;
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        });
    };

    // Core Filter & Grouping Logic
    const getProcessedItems = () => {
        // 1. Filter
        const filtered = items.filter(item => {
            // Search
            const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());

            // Type Filter
            let matchesType = true;
            if (activeFilters.type !== 'All') {
                if (activeFilters.type === 'Folder') {
                    matchesType = item.type === 'folder';
                } else {
                    const fType = item.fileType ? item.fileType.toLowerCase() : '';
                    const filterVal = activeFilters.type.toLowerCase();
                    if (filterVal === 'document') matchesType = ['docx', 'doc', 'txt', 'pdf', 'document'].includes(fType);
                    else if (filterVal === 'image') matchesType = ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'image'].includes(fType);
                    else if (filterVal === 'video') matchesType = ['mp4', 'mov', 'avi', 'webm', 'video'].includes(fType);
                    else if (filterVal === 'pdf') matchesType = fType === 'pdf';
                    else matchesType = fType.includes(filterVal);
                }
            }

            // Owner Filter
            let matchesOwner = true;
            if (activeFilters.owner !== 'All') {
                if (activeFilters.owner === 'Me') {
                    matchesOwner = !item.sharedBy;
                } else if (activeFilters.owner === 'Shared') {
                    matchesOwner = !!item.sharedBy;
                }
            }

            return matchesSearch && matchesType && matchesOwner;
        });

        // 2. Sort & Group
        if (folderPlacement === 'top') {
            const actions = filtered.filter(i => i.type === 'action');
            const folders = filtered.filter(i => i.type === 'folder' && i.type !== 'action');
            const files = filtered.filter(i => i.type !== 'folder' && i.type !== 'action');

            return [
                ...actions, // Keep actions at top
                ...sortItems(folders),
                ...sortItems(files)
            ];
        } else {
            // Mixed
            // Pull actions to top first, sort rest
            const actions = filtered.filter(i => i.type === 'action');
            const rest = filtered.filter(i => i.type !== 'action');
            return [...actions, ...sortItems(rest)];
        }
    };

    const displayItems = getProcessedItems();

    return (
        <div className="animate-fade-in pb-20 px-4 md:px-8">
            {/* Header: Breadcrumbs & View Controls */}
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-lg font-medium text-gray-500 mb-2 md:mb-0">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span
                                onClick={() => handleBreadcrumbClick(index)}
                                className={`cursor-pointer hover:text-primary transition-colors ${index === breadcrumbs.length - 1 ? 'text-gray-900 font-bold' : ''}`}
                            >
                                {crumb}
                            </span>
                            {index < breadcrumbs.length - 1 && <ChevronRight size={18} className="text-gray-400" />}
                        </div>
                    ))}
                </div>

                {/* View Controls */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    {/* Filters */}
                    <select
                        value={activeFilters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="bg-white/50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                        className="bg-white/50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                        <option value="All">Owner: All</option>
                        <option value="Me">Owned by me</option>
                        <option value="Shared">Shared with me</option>
                    </select>

                    <div className="ml-2">
                        <SortDropdown
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
            </header>

            {/* Date & Time Header */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 font-medium border-b border-gray-100 pb-2">
                <span>Last modified: 18 Jan 2026 · 12:10 PM</span>
            </div>

            {/* Content Grid or Empty State */}
            {displayItems.length > 0 ? (
                <DriveGrid items={displayItems} viewMode={viewMode} searchQuery={searchQuery} />
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <SearchX size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700">No results found</h3>
                    <p className="text-gray-500 max-w-xs mx-auto mt-2">
                        We couldn't find any files matching "{searchQuery}". Try different keywords.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Drive;
