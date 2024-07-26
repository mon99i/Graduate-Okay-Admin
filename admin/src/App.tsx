import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Notice from './pages/Notice/Notice';
import Lecture from './pages/Lecture/Lecture';
import Review from './pages/Review/Review';
import User from './pages/User/User';
import Admin from './pages/Admin/Admin';
import Layout from './component/Layout/Layout';
import Main from './pages/Main';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<RedirectToAppropriatePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/lecture" element={<Lecture />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Layout>
        </Router>
    );
}

// 로그인 상태에 따라 적절한 페이지로 리다이렉션
const RedirectToAppropriatePage: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/main");
      } else {
        navigate("/login");
      }
    }, [isLoggedIn, navigate]);
  
    return null;
  };

export default App;
