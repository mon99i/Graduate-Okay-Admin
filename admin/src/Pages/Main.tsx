import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Main: React.FC = () => {
    const navigate = useNavigate();
    //const [cookies, , removeCookie] = useCookies(["accessToken"]);

    const logout = () => {
        
        //removeCookie("accessToken");
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