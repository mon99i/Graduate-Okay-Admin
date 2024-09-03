import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login.tsx';
import Main from './Pages/Main';
import Notice from './Pages/Notice/Notice';
import Lecture from './Pages/Lecture/Lecture';
import Review from './Pages/Review/Review';
import User from './Pages/User/User';
import Admin from './Pages/Admin/Admin';
import Layout from './component/Layout/Layout';
import { useAuth } from './context/AuthContext';
import NoticeDetail from './Pages/Notice/NoticeDetail';
import NoticeWrite from './Pages/Notice/NoticeWrite';
import NoticeEdit from './Pages/Notice/NoticeEdit';

const App: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Layout>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />
            <Route path="/notice/new" element={<NoticeWrite />} />
            <Route path="/notice/edit/:id" element={<NoticeEdit />} />
            <Route path="/lecture" element={<Lecture />} />
            <Route path="/review" element={<Review />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} /> 
          </>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
