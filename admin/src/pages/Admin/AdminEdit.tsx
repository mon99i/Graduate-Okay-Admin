import React, { useState } from 'react';
import axios from 'axios';
import api from '../../apis/api';
import { useNavigate } from 'react-router-dom';

const AdminEdit = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const pwLength = password.length;
    const navigate = useNavigate();

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
        
        const isPasswordValid = checkPassword();
        
        if (!isPasswordValid) {
            alert("비밀번호를 확인해주세요.");
            return;
        }

        try {
            await axios.patch(`${api.admin}/password`, {password});
            alert("관리자 비밀번호 변경 성공!");
            navigate('/admin');
        } catch (error) {
            console.error("patch 오류 발생:", error);
            alert("비밀번호 변경에 실패했습니다.");
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form 
                onSubmit={handleSubmit}
                className="bg-white w-96 p-8 rounded-md shadow-md max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">관리자 비밀번호 변경</h2>
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
                    변경하기
                </button>
            </form>
        </div>
    );
};

export default AdminEdit;