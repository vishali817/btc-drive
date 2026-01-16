export const driveData = {
    "app": {
        "name": "BTC Drive",
        "accountType": "Personal Account"
    },
    "layout": {
        "type": "dashboard",
        "sidebar": {
            "width": 260,
            "sections": [
                {
                    "title": "Navigation",
                    "items": [
                        { "id": "my_files", "label": "My Files", "icon": "folder", "active": true, "path": "/my-drive" },
                        { "id": "shared", "label": "Shared with me", "icon": "users", "path": "/shared" },
                        { "id": "recent", "label": "Recent", "icon": "clock", "path": "/recent" },
                        { "id": "starred", "label": "Starred", "icon": "star", "path": "/starred" },
                        { "id": "trash", "label": "Trash", "icon": "trash", "path": "/trash" }
                    ]
                },
                {
                    "title": "Storage",
                    "usage": {
                        "used": "6.5GB",
                        "total": "10GB",
                        "percentage": 65
                    },
                    "action": {
                        "label": "Upgrade Plan",
                        "type": "link"
                    }
                }
            ]
        },
        "topbar": {
            "search": {
                "placeholder": "Search files, folders..."
            },
            "actions": [
                { "id": "upload", "label": "Upload", "type": "primary_button" },
                { "id": "notifications", "icon": "bell" },
                { "id": "settings", "icon": "gear" },
                { "id": "profile", "icon": "avatar" }
            ]
        },
        "content": {
            "breadcrumb": ["My Files", "Work Projects"],
            "viewControls": {
                "modes": ["grid", "list"],
                "active": "grid"
            },
            "grid": {
                "columns": 4,
                "gap": 24,
                "items": [
                    { "id": "1", "type": "folder", "name": "Project Assets", "meta": "12 files • 240 MB" },
                    { "id": "2", "type": "folder", "name": "Q4 Reports", "meta": "8 files • 45 MB" },
                    { "id": "3", "type": "folder", "name": "Client Presentations", "meta": "5 files • 120 MB" },
                    { "id": "4", "type": "file", "fileType": "pdf", "name": "Annual_Review_2024.pdf", "size": "2.4 MB" },
                    { "id": "5", "type": "file", "fileType": "spreadsheet", "name": "Budget_Forecast.xlsx", "size": "890 KB" },
                    { "id": "6", "type": "file", "fileType": "image", "name": "Branding_Guide.png", "size": "5.1 MB" },
                    { "id": "7", "type": "file", "fileType": "document", "name": "Meeting_Notes_Q1.docx", "size": "156 KB" },
                    { "id": "8", "type": "file", "fileType": "video", "name": "Hero_Video_Final.mp4", "size": "48 MB" },
                    { "id": "9", "type": "action", "name": "Create New", "style": "dashed" }
                ]
            }
        }
    }
};
