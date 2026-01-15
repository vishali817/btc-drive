import { useState, useCallback } from 'react';

export const useDriveActions = () => {
    const [selectedItems, setSelectedItems] = useState(new Set());

    const toggleSelection = useCallback((id) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedItems(new Set());
    }, []);

    const uploadFile = useCallback((file) => {
        console.log("Uploading file:", file);
    }, []);

    return {
        selectedItems,
        toggleSelection,
        clearSelection,
        uploadFile
    };
};
