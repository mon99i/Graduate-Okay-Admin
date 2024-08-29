import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getButtonClass = (path: string) => 
    location.pathname === path ? 'hover:text-gray-400 text-sky-400' : 'hover:text-gray-400';

  return (
    <header className="bg-gray-800 text-white px-4 py-2 flex justify-center space-x-8">
      <button onClick={() => navigate('/notice')} className={getButtonClass('/notice')}>공지사항</button>
      <span className="text-gray-400 text-sm mx-1">|</span>
      <button onClick={() => navigate('/lecture')} className={getButtonClass('/lecture')}>강의</button>
      <span className="text-gray-400 text-sm mx-1">|</span>
      <button onClick={() => navigate('/review')} className={getButtonClass('/review')}>리뷰</button>
      <span className="text-gray-400 text-sm mx-1">|</span>
      <button onClick={() => navigate('/user')} className={getButtonClass('/user')}>사용자</button>
      <span className="text-gray-400 text-sm mx-1">|</span>
      <button onClick={() => navigate('/admin')} className={getButtonClass('/admin')}>관리자</button>
      <span className="text-gray-400 text-sm mx-1">|</span>
      <button onClick={handleLogout} className='hover:text-gray-400'>로그아웃</button>
    </header>
  );
};

export default Header;

