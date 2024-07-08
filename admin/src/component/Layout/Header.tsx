import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
            <li><Link to="/notice">공지사항 관리</Link></li>
            <li><Link to="/review">리뷰 관리</Link></li>
            <li><Link to="/user">사용자 관리</Link></li>
            <li><Link to="/admin">관리자 관리</Link></li>
            <li><Link to="/login">로그아웃</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
