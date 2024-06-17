import React, { useState } from "react";
import styled from "styled-components";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </InputWrap>
                <ErrorMessageWrap>올바른 아이디를 입력해주세요.</ErrorMessageWrap>
                <InputWrap>
                    <LoginInput
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </InputWrap>
                <ErrorMessageWrap>올바른 비밀번호를 입력해주세요.</ErrorMessageWrap>
            </ContentWrap>

            <div>
                <LoginButton disabled={true}>로그인</LoginButton>
            </div>
        </LoginPage>
    );
}

// TODO: email, password 검사 과정 - hook 이용해서 확인
// https://www.youtube.com/watch?v=IhUN42R3OsM

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
`;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
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