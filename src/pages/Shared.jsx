import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, SearchX } from 'lucide-react';
import DriveGrid from '../components/drive/DriveGrid';
import { driveData } from '../data/driveData';

const Shared = () => {
    const [activeTab, setActiveTab] = useState('People');
    const tabs = ['People', 'Folders', 'Files'];
    const { searchQuery } = useOutletContext() || { searchQuery: '' };

    // Filter States
    const [activeFilters, setActiveFilters] = useState({ type: 'All', date: 'Newest', owner: 'Shared' });

    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    // Mock items enriched with shared data
    const allItems = driveData.layout.content.grid.items
        .filter(i => i.type !== 'action')
        .map((item, index) => ({
            ...item,
            sharedBy: index % 3 === 0 ? 'Alice Chen' : index % 3 === 1 ? 'Bob Smith' : 'Carol Davis',
            sharedDate: index === 0 ? 'Shared on Jan 15, 2026 • 09:15 AM' :
                index === 1 ? 'Shared on Jan 14, 2026 • 02:30 PM' :
                    index === 2 ? 'Shared on Jan 12, 2026 • 11:00 AM' :
                        'Shared on Jan 10, 2026 • 10:45 AM',
            // Mock timestamp for sorting
            timestamp: index === 0 ? 1768468500000 :
                index === 1 ? 1768401000000 :
                    index === 2 ? 1768215600000 : 1768041900000
        }));

    // Filter Logic
    let displayItems = allItems.filter(item => {
        // 1. Tab Filter
        if (activeTab === 'Folders' && item.type !== 'folder') return false;
        if (activeTab === 'Files' && item.type === 'folder') return false;

        // 2. Search Filter
        if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        // 3. Dropdown - Type Filter
        if (activeFilters.type !== 'All') {
            if (activeFilters.type === 'Folder' && item.type !== 'folder') return false;
            // Simplified file type check
            if (activeFilters.type !== 'Folder' && item.type === 'folder') return false;
            if (activeFilters.type !== 'Folder') {
                const fType = item.fileType ? item.fileType.toLowerCase() : '';
                const filterVal = activeFilters.type.toLowerCase();
                if (filterVal === 'document' && !['docx', 'doc', 'txt', 'pdf', 'document'].includes(fType)) return false;
                if (filterVal === 'image' && !['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'image'].includes(fType)) return false;
                if (filterVal === 'video' && !['mp4', 'mov', 'avi', 'webm', 'video'].includes(fType)) return false;
                if (filterVal === 'pdf' && fType !== 'pdf') return false;
            }
        }

        // 4. Dropdown - Owner Filter (In context of Shared, 'Me' vs 'Shared')
        // All items here are shared. So 'Me' should result in none?
        // Or if we mix items? Assuming 'Shared' page only has shared items.
        // If filter is 'Me', show empty or owned items (if any).
        // Since all items here have sharedBy, 'Me' -> false?
        // Let's assume 'Me' filters items I shared? (Not in mock data).
        // For now, if activeFilters.owner === 'Me', we show nothing or alert?
        // Let's show nothing to be correct logically.
        if (activeFilters.owner === 'Me') return false;
        if (activeFilters.owner === 'Shared') return true; // Show all (as they are all shared)

        return true;
    }).sort((a, b) => {
        // 5. Date Sort
        if (activeFilters.date === 'Newest' || activeFilters.date === 'Recent') {
            return b.timestamp - a.timestamp;
        }
        if (activeFilters.date === 'Older') {
            return a.timestamp - b.timestamp;
        }
        return 0;
    });

    const isGrouped = activeTab === 'People' && activeFilters.owner !== 'Me';

    // Grouping for People View
    const groupedItems = isGrouped ? displayItems.reduce((acc, item) => {
        const user = item.sharedBy;
        if (!acc[user]) acc[user] = [];
        acc[user].push(item);
        return acc;
    }, {}) : {};

    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-8 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white/40 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 shadow-inner">
                            <Users size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#0B1F3B]">Shared with me</h1>
                            <p className="text-gray-500 font-medium">Files shared by your team</p>
                        </div>
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <select
                            value={activeFilters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 text-gray-700 outline-none focus:border-[#0B1F3B] focus:ring-2 focus:ring-[#0B1F3B]/20 shadow-sm transition-all hover:border-gray-300"
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
                            className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 text-gray-700 outline-none focus:border-[#0B1F3B] focus:ring-2 focus:ring-[#0B1F3B]/20 shadow-sm transition-all hover:border-gray-300"
                        >
                            <option value="Recent">Date: Recent</option>
                            <option value="Newest">Newest First</option>
                            <option value="Older">Oldest First</option>
                        </select>
                        <select
                            value={activeFilters.owner}
                            onChange={(e) => handleFilterChange('owner', e.target.value)}
                            className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 text-gray-700 outline-none focus:border-[#0B1F3B] focus:ring-2 focus:ring-[#0B1F3B]/20 shadow-sm transition-all hover:border-gray-300"
                        >
                            <option value="Shared">Shared with me</option>
                            <option value="Me">Owned by me</option>
                        </select>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mt-8 border-b border-gray-200/60 pb-1">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-bold text-sm transition-all relative rounded-t-lg ${activeTab === tab ? 'text-[#0B1F3B] bg-white/60' : 'text-gray-400 hover:text-gray-600 hover:bg-white/30'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B1F3B] rounded-t-full" />}
                        </button>
                    ))}
                </div>
            </header>

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
                                <DriveGrid items={items} viewMode="grid" searchQuery={searchQuery} />
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
                    <DriveGrid items={displayItems} viewMode="grid" searchQuery={searchQuery} />
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
