import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Main: React.FC = () => {
    const navigate = useNavigate();

    const logout = () => {
        
        localStorage.clear();
        navigate("/");
    };

    return (
        <MainPage>
            <h1>MainPage</h1>
            <LogoutButton
                onClick={logout}>로그아웃</LogoutButton>
        </MainPage>
    );
};

const MainPage = styled.div`

`;

const LogoutButton = styled.button`
    
`;

export default Main;

// TODO : Main 페이지 없이 로그인 -> 헤더 첫 부분인 notice(공지사항 관리)로 navigate 할지