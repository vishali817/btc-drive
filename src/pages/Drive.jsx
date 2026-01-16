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

    useEffect(() => {
        if (folderId) {
            // Mock Data for Sub-folder
            const folderName = items.find(i => i.id === folderId)?.name || "Unknown Folder";

            // Generate some items (reuse previous mock logic)
            const mockSubItems = [
                { id: `${folderId}-1`, type: 'folder', name: 'Sub Project A', meta: '3 files • 12 MB' },
                { id: `${folderId}-2`, type: 'file', fileType: 'docx', name: 'Requirements.docx', size: '15 KB' },
                { id: `${folderId}-3`, type: 'file', fileType: 'png', name: 'Mockup_final.png', size: '2.4 MB' },
                { id: `${folderId}-4`, type: 'action', name: 'Create New' }
            ];

            setItems(mockSubItems);

            const folderTitle = folderName === "Unknown Folder" ? `Folder ${folderId}` : folderName;
            setBreadcrumbs(["My Files", "Work Projects", folderTitle]);

        } else {
            // Root
            if (fileSystem && fileSystem.items) {
                setItems(fileSystem.items);
            } else {
                setItems(content.grid.items);
            }
            setBreadcrumbs(["My Files", "Work Projects"]);
        }
    }, [folderId, fileSystem]);

    // Handle Search Filtering
    const filteredItems = items.filter(item => {
        if (!searchQuery) return true;
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
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
                <div className="flex bg-white/50 p-1 rounded-xl shadow-sm border border-gray-200">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white shadow text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <LayoutGrid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white shadow text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <ListIcon size={20} />
                    </button>
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
