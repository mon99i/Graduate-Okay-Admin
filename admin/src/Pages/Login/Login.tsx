import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { submitLoginQuery } from '../../queries/loginQuery';
import { useMutation } from "@tanstack/react-query";
import useInput from "../../hooks/useInput";
import { isEmpty } from "../../utils/validate";
import { Cookies } from 'react-cookie';

const Login: React.FC = () => {
    const loginId = useInput("");
    const password = useInput("");
    const navigate = useNavigate();
    const [isError, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const cookies = new Cookies();

    const submitLoginMutation = useMutation({
      mutationFn: (formData: { loginId: string; password: string }) => {
        const { loginId, password } = formData;
        return submitLoginQuery(loginId, password);
      },
      onSuccess: (data: any) => {
        localStorage.setItem('accessToken', data.tokenInfo.accessToken);
        localStorage.setItem('refreshToken', data.tokenInfo.refreshToken);
        cookies.set('accessToken', data.tokenInfo.accessToken, { path: '/'});
        navigate("/main") 
      },
        onError: () => {
        setErrorMessage("올바른 아이디/비밀번호를 입력해주세요.");
        setError(true);
      },
    });

    const submitLogin = async () => {
      if (isEmpty(loginId.value, password.value)) {
        setErrorMessage("아이디/비밀번호가 비어있습니다.");
        setError(true);
        return;
      }
      submitLoginMutation.mutate({
        loginId: loginId.value,
        password: password.value,
      });
    };

    return (
        <LoginPage>
            <TitleWrap>
                <img src="/imgs/logo.png" alt="Logo" />
                관리자 페이지
            </TitleWrap>
                <ContentWrap>
                    <InputWrap>
                        <LoginInput
                            placeholder="아이디"
                            value={loginId.value}
                            onChange={loginId.onChange}
                            required
                        />
                    </InputWrap>
                    <InputWrap>
                        <LoginInput
                            placeholder="비밀번호"
                            type="password"
                            value={password.value}
                            onChange={password.onChange}
                            required
                        />
                    </InputWrap>
                {isError && <ErrorMessageWrap>{errorMessage}</ErrorMessageWrap>}
                </ContentWrap>
                <div>
                <LoginButton onClick={submitLogin} disabled={!loginId.value || !password.value}>로그인</LoginButton>
                </div>
        </LoginPage>
    );
}

const TitleWrap = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #c5b5f6;
  
  img {
    display: block;
    margin: 0 auto 10px;
  }
`;

const LoginPage = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    padding: 0 20px;
    left: 50%;
    top: 20%;
    bottom: 20%;
    box-shadow: 0 0 0 1px #ccc;
    background-color: #f2f1f1;
    transform: translate(-50%, 0);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const ContentWrap = styled.div`
    margin-top: 25px;
    flex: 1;
`;

const InputWrap = styled.div`
    display: flex;
    border-radius: 8px;
    padding: 16px;
    margin-top: 10px;
    margin-bottom: 5px;
    background-color: white;
    box-shadow: 0 0 0 0.5px #ccc;
`;

const LoginInput = styled.input`
    width: 100%;
    outline: none;
    border: none;
    font-size: 16px;

    &::placeholder {
        color: #dadada;
    }

    &:focus::placeholder {
        opacity: 0;
    }
`;

const ErrorMessageWrap = styled.div`
  color: #f43939c0;
  font-weight: 700;
  font-size: 14px;
  margin-top: 10px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  margin-top: 10px;
  margin-bottom: 30px;
  font-weight: 700;
  background-color: #c5b5f6;
  border-radius: 10px;
  cursor: pointer;

  &:disabled {
    background-color: #dadada;
    color: white;
  }
`;

export default Login;
