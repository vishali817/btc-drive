/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#E9F4FF', // Light Blue Background
                primary: {
                    DEFAULT: '#195BAC', // Primary Blue (Corrected)
                    light: '#2d7bd1',   // Lighter Blue
                    dark: '#103d75',    // Darker Blue
                },
                navy: {
                    DEFAULT: '#0B1F3B', // Dark Navy Blue (For Navbar Only)
                },
                secondary: '#4B5563', // Gray 600
                surface: {
                    DEFAULT: '#FFFFFF',
                    glass: 'rgba(255, 255, 255, 0.7)',
                },
                text: {
                    primary: '#0F172A',
                    secondary: '#64748B',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
                'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }
        },
    },
    plugins: [],
}
