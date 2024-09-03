import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/api';

const NoticeWrite: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${api.notice}`, {
                title,
                content
            });

            if (response.status === 201) {
                alert('공지사항이 성공적으로 등록되었습니다.');
                navigate('/notice');
            }
        } catch (error) {
            console.error("Error creating notice:", error);
            alert('공지사항 등록 중 오류가 발생했습니다.');
        }
    };

    const handleCancel = () => {
        navigate('/notice');
    };

    return (
        <div className="container mx-60 py-16">
            <h2 className="text-2xl font-bold mb-4">새 공지사항 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        제목
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        내용
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={10}
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="border border-gray-300 rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="border border-black rounded-md px-4 py-2 bg-black text-white hover:bg-gray-800"
                    >
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoticeWrite;
