import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Drive from './pages/Drive';
import Shared from './pages/Shared';
import Recent from './pages/Recent';
import Starred from './pages/Starred';
import Trash from './pages/Trash';
import LandingPage from './pages/LandingPage';
import Help from './pages/Help';

function ProtectedRoute({ children, isAuthenticated }) {
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('btc_drive_auth');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('btc_drive_auth', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('btc_drive_auth');
    };

    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<LandingPage onLogin={handleLogin} />} />

                {/* Protected Routes */}
                <Route element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Layout onLogout={handleLogout} />
                    </ProtectedRoute>
                }>
                    <Route path="my-drive" element={<Drive />} />
                    <Route path="folder/:folderId" element={<Drive />} />
                    <Route path="shared" element={<Shared />} />
                    <Route path="recent" element={<Recent />} />
                    <Route path="starred" element={<Starred />} />
                    <Route path="trash" element={<Trash />} />
                    <Route path="help" element={<Help />} />

                    {/* Virtual Routes for StaggeredMenu Actions */}
                    <Route path="settings" element={<div />} />
                    <Route path="profile" element={<div />} />
                    <Route path="logout" element={<div />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
