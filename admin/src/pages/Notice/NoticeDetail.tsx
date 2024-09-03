import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../apis/api";

interface NoticeDetailProps {
    id: number;
    title: string;
    content: string;
    createdAt?: string;
}

const NoticeDetail: React.FC = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState<NoticeDetailProps>();
    const navigate = useNavigate();

    const fetchNotice = async (id: string) => {
        try {
            const { data } = await axios.get(`${api.notice}/${id}`);
            setNotice(data);    
        } catch (error) {
            console.error("Error fetching notice:", error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if (confirmDelete && id) {
            try {
                await axios.delete(`${api.notice}/${id}`);
                alert("삭제가 완료되었습니다.");
                navigate('/notice');
            } catch (error) {
                console.error("Error deleting notice:", error);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    useEffect(() => {   
        if (id) {
            fetchNotice(id);
        }
    }, [id]);

    if (!notice) {
        return (
            <div className="flex flex-col items-center justify-center">
                <p>존재하지 않는 글입니다.</p>
                <button 
                    onClick={() => navigate('/notice')} 
                    className="m-2 w-20 h-8 bg-black text-white rounded-md"
                >
                    돌아가기
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-60 py-16">
            <h1 className="text-2xl font-bold mb-2">{notice.title}</h1>
            <div className="flex items-center mb-3">
                <p className="text-gray-600">{notice.createdAt}</p>
                <button 
                    onClick={() => navigate(`/notice/edit/${id}`)} 
                    className="px-3 rounded-md flex items-center"
                >
                    <img 
                        src="/imgs/edit.png"
                        alt="수정"
                        className="w-4 h-4"
                    />
                </button>
                <button 
                    onClick={handleDelete}
                    className="rounded-md flex items-center"
                >
                    <img 
                        src="/imgs/delete.png"
                        alt="삭제"
                        className="w-4 h-4"
                    />
                </button>
            </div>
            <div className="px-3 py-2 whitespace-pre-wrap">{notice.content}</div>
        </div>
    );
};

export default NoticeDetail;