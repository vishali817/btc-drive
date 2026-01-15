import { Clock, SearchX } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import DriveGrid from '../components/drive/DriveGrid';
import { driveData } from '../data/driveData';

const Recent = () => {
    const { searchQuery } = useOutletContext() || { searchQuery: '' };

    // Flatten logic for demo: just take files from main grid
    const recentItems = driveData.layout.content.grid.items.filter(i => i.type === 'file');

    // Filter
    const filteredItems = recentItems.filter(item => {
        if (!searchQuery) return true;
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg text-primary">
                        <Clock size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Recent</h1>
                </div>
                <p className="text-gray-500">Files you opened recently.</p>
            </header>

            {filteredItems.length > 0 ? (
                <DriveGrid items={filteredItems} viewMode="list" />
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
