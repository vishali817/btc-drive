import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, SearchX } from 'lucide-react';
import DriveGrid from '../components/drive/DriveGrid';
import { driveData } from '../data/driveData';

const Shared = () => {
    const [filter, setFilter] = useState('People');
    const filters = ['People', 'Folders', 'Files'];
    const { searchQuery } = useOutletContext() || { searchQuery: '' };

    // Mock items enriched with shared data
    const allItems = driveData.layout.content.grid.items
        .filter(i => i.type !== 'action')
        .map((item, index) => ({
            ...item,
            sharedBy: index % 3 === 0 ? 'Alice Chen' : index % 3 === 1 ? 'Bob Smith' : 'Carol Davis',
            sharedDate: '2 days ago'
        }));

    // Filter Logic
    let displayItems = [];
    let isGrouped = false;

    if (filter === 'Folders') {
        displayItems = allItems.filter(i => i.type === 'folder');
    } else if (filter === 'Files') {
        displayItems = allItems.filter(i => i.type === 'file');
    } else {
        // People - distinct render logic handled below, but we can filter search here
        displayItems = allItems;
        isGrouped = true;
    }

    // Apply Search Filter
    displayItems = displayItems.filter(item => {
        if (!searchQuery) return true;
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Grouping for People View
    const groupedItems = isGrouped ? displayItems.reduce((acc, item) => {
        const user = item.sharedBy;
        if (!acc[user]) acc[user] = [];
        acc[user].push(item);
        return acc;
    }, {}) : {};

    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        <Users size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Shared with me</h1>
                </div>

                {/* Filters */}
                <div className="flex gap-2 border-b border-gray-200">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-3 font-medium text-sm transition-all relative ${filter === f ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {f}
                            {filter === f && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                        </button>
                    ))}
                </div>
            </header>

            {isGrouped ? (
                // People View (Grouped)
                Object.keys(groupedItems).length > 0 ? (
                    <div className="space-y-8">
                        {Object.entries(groupedItems).map(([user, items]) => (
                            <div key={user}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                        {user.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h3 className="font-bold text-gray-700">{user}</h3>
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
