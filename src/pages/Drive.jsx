import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { ChevronRight, LayoutGrid, List as ListIcon, SearchX } from 'lucide-react';
import DriveGrid from '../components/drive/DriveGrid';
import { driveData } from '../data/driveData';

const Drive = () => {
    const { folderId } = useParams();
    const navigate = useNavigate();
    const { searchQuery, fileSystem } = useOutletContext() || { searchQuery: '', fileSystem: { items: [] } };
    const { content } = driveData.layout;

    // State
    const [viewMode, setViewMode] = useState(content.viewControls.active);
    const [items, setItems] = useState(content.grid.items);
    const [breadcrumbs, setBreadcrumbs] = useState(content.breadcrumb);

    // Filter States
    const [filterType, setFilterType] = useState('All');
    const [filterDate, setFilterDate] = useState('Recent');
    const [filterOwner, setFilterOwner] = useState('Me'); // Default usually 'Me' or 'All' based on context? 
    // Requirement says Owner filter logic: Owned by me / Shared with me.
    // For 'My Drive', Owner works best as 'All' or 'Me'. Let's default to 'All' or allow filtering 'Shared' items in My Drive if they exist?
    // Usually My Drive contains Owned items. 
    // Let's stick to simple defaults but make them functional.
    const [activeFilters, setActiveFilters] = useState({ type: 'All', date: 'Recent', owner: 'All' });

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
                { id: `${folderId}-4`, type: 'action', name: 'Create New', createdAt: 0 } // Action always last or first? Usually separate.
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
                createdAt: item.createdAt || (Date.now() - (index * 10000000)) // Fallback mock dates
            }));

            setItems(enrichedItems);
            setBreadcrumbs(["My Files", "Work Projects"]);
        }
    }, [folderId, fileSystem]);

    // Handle Search & Filter Logic
    const filteredItems = items.filter(item => {
        // 1. Search Query
        const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Type Filter
        let matchesType = true;
        if (activeFilters.type !== 'All') {
            if (activeFilters.type === 'Folder') {
                matchesType = item.type === 'folder';
            } else {
                // Check exact type or fileType
                const fType = item.fileType ? item.fileType.toLowerCase() : '';
                const filterVal = activeFilters.type.toLowerCase();
                if (filterVal === 'document') matchesType = ['docx', 'doc', 'txt', 'pdf', 'document'].includes(fType);
                else if (filterVal === 'image') matchesType = ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'image'].includes(fType);
                else if (filterVal === 'video') matchesType = ['mp4', 'mov', 'avi', 'webm', 'video'].includes(fType);
                else if (filterVal === 'pdf') matchesType = fType === 'pdf';
                else matchesType = fType.includes(filterVal);
            }
        }

        // 3. Owner Filter
        let matchesOwner = true;
        if (activeFilters.owner !== 'All') {
            if (activeFilters.owner === 'Me') {
                matchesOwner = !item.sharedBy; // Assuming sharedBy exists for shared items
            } else if (activeFilters.owner === 'Shared') {
                matchesOwner = !!item.sharedBy;
            }
        }

        return matchesSearch && matchesType && matchesOwner;
    }).sort((a, b) => {
        // 4. Date Sort
        // Action items (Create New) should stay at specific spot? Usually first or last.
        // Let's assume action tiles have type 'action' and we handle them separately or give them specific sort weight.
        if (a.type === 'action') return 1;
        if (b.type === 'action') return -1;

        const dateA = a.timestamp || a.createdAt || 0;
        const dateB = b.timestamp || b.createdAt || 0;

        if (activeFilters.date === 'Recent' || activeFilters.date === 'Newest') {
            return dateB - dateA; // Descending
        }
        if (activeFilters.date === 'Older') {
            return dateA - dateB; // Ascending
        }
        return 0;
    });

    // Navigate to root on breadcrumb click
    const handleBreadcrumbClick = (index) => {
        if (index === 0) {
            navigate('/my-drive');
        }
    };

    return (
        <div className="animate-fade-in pb-20 px-8">
            {/* Header: Breadcrumbs & View Controls */}
            <header className="flex items-center justify-between mb-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-lg font-medium text-gray-500">
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
                <div className="flex items-center gap-2">
                    {/* Filters */}
                    <select
                        value={activeFilters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="bg-white/50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-[#0B1F3B] focus:ring-1 focus:ring-[#0B1F3B]"
                    >
                        <option value="All">Type: All</option>
                        <option value="Folder">Folder</option>
                        <option value="PDF">PDF</option>
                        <option value="Image">Image</option>
                        <option value="Document">Document</option>
                        <option value="Video">Video</option>
                    </select>
                    <select
                        value={activeFilters.date}
                        onChange={(e) => handleFilterChange('date', e.target.value)}
                        className="bg-white/50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-[#0B1F3B] focus:ring-1 focus:ring-[#0B1F3B]"
                    >
                        <option value="Recent">Date: Recent</option>
                        <option value="Newest">Newest First</option>
                        <option value="Older">Oldest First</option>
                    </select>
                    <select
                        value={activeFilters.owner}
                        onChange={(e) => handleFilterChange('owner', e.target.value)}
                        className="bg-white/50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-[#0B1F3B] focus:ring-1 focus:ring-[#0B1F3B]"
                    >
                        <option value="All">Owner: All</option>
                        <option value="Me">Owned by me</option>
                        <option value="Shared">Shared with me</option>
                    </select>

                    <div className="flex bg-white/50 p-1 rounded-xl shadow-sm border border-gray-200 ml-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white shadow text-[#0B1F3B]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white shadow text-[#0B1F3B]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <ListIcon size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Grid or Empty State */}
            {filteredItems.length > 0 ? (
                <DriveGrid items={filteredItems} viewMode={viewMode} searchQuery={searchQuery} />
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
