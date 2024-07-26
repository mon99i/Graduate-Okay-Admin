import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-2">
        <ul className="flex space-x-16 justify-center">
            <li><Link to="/notice" className='hover:text-gray-400'>공지사항 관리</Link></li>
            <li><Link to="/lecture" className='hover:text-gray-400'>강의 관리</Link></li>
            <li><Link to="/review" className='hover:text-gray-400'>리뷰 관리</Link></li>
            <li><Link to="/user" className='hover:text-gray-400'>사용자 관리</Link></li>
            <li><Link to="/admin" className='hover:text-gray-400'>관리자 관리</Link></li>
            <li><button onClick={handleLogout} className="text-white hover:text-gray-400">로그아웃</button></li>
            </ul>
      </nav>
    </header>
  );
};

export default Header;

