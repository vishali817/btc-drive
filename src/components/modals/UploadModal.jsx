import { UploadCloud, FolderUp, FileUp } from 'lucide-react';
import Modal from '../common/Modal';

const UploadModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Upload to Drive" maxWidth="max-w-xl">
            <div className="flex flex-col gap-6">
                {/* Drag Drop Zone */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud size={32} />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700">Drag & Drop files here</h4>
                    <p className="text-gray-400 text-sm mt-1">or click to browse your files</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                    <div className="h-px bg-gray-200 flex-1" />
                    <span>OR</span>
                    <div className="h-px bg-gray-200 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md hover:text-primary transition-all font-semibold text-gray-600">
                        <FileUp size={20} />
                        Upload File
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md hover:text-primary transition-all font-semibold text-gray-600">
                        <FolderUp size={20} />
                        Upload Folder
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default UploadModal;
