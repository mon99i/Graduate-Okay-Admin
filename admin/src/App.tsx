import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Page/Login/Login';
import Main from './Page/Main';
import Notice from './Page/Notice/Notice';
import Lecture from './Page/Lecture/Lecture';
import Review from './Page/Review/Review';
import User from './Page/User/User';
import Admin from './Page/Admin/Admin';
import Layout from './component/Layout/Layout';
import { useAuth } from './context/AuthContext';
import NoticeDetail from './Page/Notice/NoticeDetail';
import NoticeWrite from './Page/Notice/NoticeWrite';
import NoticeEdit from './Page/Notice/NoticeEdit';

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
