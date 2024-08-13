import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white px-4 py-2 flex justify-center space-x-16">
      <button onClick={() => navigate('/notice')} className='hover:text-gray-400'>공지사항 관리</button>
      <button onClick={() => navigate('/lecture')} className='hover:text-gray-400'>강의 관리</button>
      <button onClick={() => navigate('/review')} className='hover:text-gray-400'>리뷰 관리</button>
      <button onClick={() => navigate('/user')} className='hover:text-gray-400'>사용자 관리</button>
      <button onClick={() => navigate('/admin')} className='hover:text-gray-400'>관리자 관리</button>
      <button onClick={handleLogout} className='hover:text-gray-400'>로그아웃</button>
    </header>
  );
};

export default Header;

