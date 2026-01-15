import { FileText, Image, Video, Music, Folder } from 'lucide-react';

export const MOCK_FILES = [
    { id: '1', name: 'Project Proposal', type: 'doc', size: '2.4 MB', date: 'Jan 12, 2026', icon: FileText, color: 'text-blue-500' },
    { id: '2', name: 'Design Assets', type: 'folder', size: '1.2 GB', date: 'Jan 10, 2026', icon: Folder, color: 'text-yellow-500' },
    { id: '3', name: 'Launch Video', type: 'video', size: '450 MB', date: 'Jan 08, 2026', icon: Video, color: 'text-red-500' },
    { id: '4', name: 'Website Mocks', type: 'image', size: '12 MB', date: 'Jan 05, 2026', icon: Image, color: 'text-purple-500' },
    { id: '5', name: 'Audio Mix', type: 'audio', size: '45 MB', date: 'Jan 02, 2026', icon: Music, color: 'text-pink-500' },
    { id: '6', name: 'Financials_2025', type: 'sheet', size: '800 KB', date: 'Dec 28, 2025', icon: FileText, color: 'text-green-500' },
];

export const MOCK_FOLDERS = [
    { id: 'f1', name: 'Work', count: 12 },
    { id: 'f2', name: 'Personal', count: 8 },
    { id: 'f3', name: 'Designs', count: 34 },
    { id: 'f4', name: 'Invoices', count: 5 },
];
