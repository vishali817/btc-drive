import { useState } from 'react';
import { Star, LayoutGrid, List as ListIcon } from 'lucide-react';

const Starred = () => {
    const [viewMode, setViewMode] = useState('list');
    const [activeFilters, setActiveFilters] = useState({ type: 'All', date: 'Recent', owner: 'All' });

    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    {/* Row 1: Title + Mobile Toggles */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <h1 className="text-3xl font-bold text-gray-900">Starred</h1>

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

                <p className="text-gray-500 mt-1 mb-4">Your most important files, one click away.</p>

                {/* Date & Time Header */}
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium border-b border-gray-100 pb-2">
                    <span>Last modified: 18 Jan 2026 · 12:10 PM</span>
                </div>
            </header>

            <div className="flex flex-col items-center justify-center py-32">
                <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full" />
                    <Star size={80} className="text-gray-200 relative z-10" strokeWidth={1} />
                </div>
                <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">No starred files</h2>
                <p className="text-gray-400">Add chips to items to see them here.</p>
            </div>
        </div>
    );
};

export default Starred;
