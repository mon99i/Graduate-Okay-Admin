import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="page">
            <div className="titleWrap">
                <img src="/imgs/logo.png" alt="Logo" />
                <br/ >
                관리자 페이지
            </div>

            <div className="contentWrap">
                <div className="inputWrap">
                    <input className="input"
                    placeholder="아이디"
                    value={email} />
                </div>
                <div className="errorMessageWrap">올바른 아이디를 입력해주세요.</div>
                <div className="inputWrap">
                    <input className="input"
                    placeholder="비밀번호"
                    value={password} />
                </div>
                <div className="errorMessageWrap">올바른 비밀번호를 입력해주세요.</div>
            </div>

            <div>
                <button disabled={true} className="loginButton">로그인</button>
            </div>
        </div>
    );
}

// TODO: email, password 검사 과정 - hook 이용해서 확인
// https://www.youtube.com/watch?v=IhUN42R3OsM