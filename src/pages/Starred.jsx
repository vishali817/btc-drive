import { Star } from 'lucide-react';

const Starred = () => {
    return (
        <div className="animate-fade-in pb-20 px-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Starred</h1>
                <p className="text-gray-500 mt-1">Your most important files, one click away.</p>
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
