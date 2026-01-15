import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Drive from './pages/Drive';
import Shared from './pages/Shared';

import Recent from './pages/Recent';
import Starred from './pages/Starred';
import Trash from './pages/Trash';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/my-drive" replace />} />
                    <Route path="my-drive" element={<Drive />} />
                    <Route path="folder/:folderId" element={<Drive />} />
                    <Route path="shared" element={<Shared />} />
                    <Route path="recent" element={<Recent />} />
                    <Route path="starred" element={<Starred />} />
                    <Route path="trash" element={<Trash />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
