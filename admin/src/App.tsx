import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Notice from './pages/Notice/Notice';
import Review from './pages/Review/Review';
import User from './pages/User/User';
import Admin from './pages/Admin/Admin';
import Layout from './component/Layout/Layout';

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
