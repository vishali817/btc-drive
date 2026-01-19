import { useState } from 'react';
import { AlertCircle, SearchX, LayoutGrid, List as ListIcon } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import DriveGrid from '../components/drive/DriveGrid';

const Spam = () => {
    const { searchQuery } = useOutletContext() || { searchQuery: '' };
    const [viewMode, setViewMode] = useState(() => window.innerWidth < 768 ? 'list' : 'list'); // Always list default for Spam, but respecting prompt rules if grid was possible
    const [activeFilters, setActiveFilters] = useState({ type: 'All', date: 'Recent', owner: 'All' });

    // Mock Spam Items (Empty by default as per requirement)
    const [spamItems, setSpamItems] = useState([]);

    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    {/* Row 1: Title + Mobile Toggles */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                <AlertCircle size={24} />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Spam</h1>
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
                    <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
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
                            value={activeFilters.date}
                            onChange={(e) => handleFilterChange('date', e.target.value)}
                            className="w-full md:w-auto bg-white/50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        >
                            <option value="Recent">Date: Recent</option>
                            <option value="Newest">Newest First</option>
                            <option value="Older">Oldest First</option>
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

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6 text-sm text-gray-600 flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>Items in spam will be permanently deleted after 30 days.</span>
                </div>

                {/* Date & Time Header */}
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium border-b border-gray-100 pb-2">
                    <span>Last modified: 18 Jan 2026 · 12:10 PM</span>
                </div>
            </header>

            {spamItems.length > 0 ? (
                <DriveGrid items={spamItems} viewMode={viewMode} searchQuery={searchQuery} />
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 border border-white shadow-inner">
                        <AlertCircle size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700">No items in spam</h3>
                    <p className="text-gray-500 max-w-xs mx-auto mt-2">
                        Your spam folder is empty.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Spam;
