import React, { useState } from 'react';
import axios from 'axios';
import api from '../../apis/api';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loginIdError, setLoginIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const pwLength = password.length;
    const navigate = useNavigate();

    const checkLoginId = async () => {
        try {
            const { data: { data: { adminList } } } = await axios.get(`${api.admin}`);
            const adminExists = adminList.some(({ loginId: adminLoginId }: { loginId: string }) => adminLoginId === loginId);
    
            if (adminExists) {
                setLoginIdError("이미 사용 중인 아이디입니다.");
                return false;
            } else {
                setLoginIdError("");
                return true;
            }
        } catch (error) {
            setLoginIdError("아이디 확인 중 오류가 발생했습니다.");
            return false;
        }
    };

    const checkPassword = () => {
        if (password !== confirmPassword) {
            setPasswordError("비밀번호가 일치하지 않습니다.");
            return false;
        } else if (pwLength < 4) {
            setPasswordError("비밀번호는 최소 4자 이상 입력해주세요.");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const isLoginIdValid = await checkLoginId();
        const isPasswordValid = checkPassword();
        
        if (!isLoginIdValid || !isPasswordValid) {
            alert("아이디/비밀번호를 확인해주세요.");
            return;
        }

        try {
            await axios.post(`${api.admin}s`, { loginId, password });
            alert("관리자 등록 성공!");
            navigate('/admin');
        } catch (error) {
            alert("관리자 등록에 실패했습니다. 입력 정보를 다시 확인해주세요.");
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form 
                onSubmit={handleSubmit}
                className="bg-white w-96 p-8 rounded-md shadow-md max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">관리자 등록</h2>

                <div className="flex mb-1">
                    <div className="flex-1 mr-2">
                        <label htmlFor="loginId" className="block text-gray-700 font-semibold mb-2">
                            아이디
                        </label>
                        <input
                            type="text"
                            id="loginId"
                            className="w-full w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={checkLoginId}
                        className="flex items-center justify-center border border-2 font-bold mt-8 px-2 rounded-md hover:bg-gray-300"
                    >
                        확인
                    </button>
                </div>
                {loginIdError && <p className="text-red-500">{loginIdError}</p>}

                <div className="mt-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder='최소 4자 이상 입력해주세요.'
                        className="w-full w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex mt-4">
                    <div className="flex-1 mr-2">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder='비밀번호를 다시 입력해주세요.'
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={checkPassword}
                        className="flex items-center justify-center border border-2 font-bold mt-8 px-2 rounded-md hover:bg-gray-300"
                    >
                        확인
                    </button>
                </div>
                {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}

                <button
                    type="submit"
                    className="w-full mt-6 bg-gray-200 text-white font-bold py-2 rounded-md hover:text-black hover:bg-gray-400"
                >
                    관리자 등록
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
