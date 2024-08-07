import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavLinks: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <ul className="flex space-x-16 justify-center">
      <li><button onClick={() => navigate('/notice')} className='hover:text-gray-400'>공지사항 관리</button></li>
      <li><button onClick={() => navigate('/lecture')} className='hover:text-gray-400'>강의 관리</button></li>
      <li><button onClick={() => navigate('/review')} className='hover:text-gray-400'>리뷰 관리</button></li>
      <li><button onClick={() => navigate('/user')} className='hover:text-gray-400'>사용자 관리</button></li>
      <li><button onClick={() => navigate('/admin')} className='hover:text-gray-400'>관리자 관리</button></li>
      <li><button onClick={handleLogout} className='hover:text-gray-400'>로그아웃</button></li>
    </ul>
  );
};

export default NavLinks;
