import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ITEMS_PER_PAGE from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../apis/api";
import { useAuth } from "../../context/AuthContext";

interface AdminProps {
    id: number;
    loginId: string;
    createdAt: string;
    updatedAt?: string | null;
}

const Admin: React.FC = () => {
    const [admins, setAdmins] = useState<AdminProps[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [loggedInId, setLoggedInId] = useState<string | null>(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const itemsPerPage = ITEMS_PER_PAGE;

    const handleNewAdmin = () => {
        navigate('/admin/new');
    }

    const handleEditAdmin = (id: number) => {
        navigate(`/admin/${id}`);
    }

    const handleDeleteAdmin = async (id: number) => {
        const confirmDelete = window.confirm("관리자를 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                if (loggedInId === process.env.REACT_APP_ADMIN_ID) {  
                    await axios.delete(`${api.admin}/${id}`);
                } else {
                    await axios.delete(`${api.admin}`);
                    alert("계정이 삭제되어 로그인 화면으로 돌아갑니다.");
                    logout();
                }
                setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.id !== id));
            } catch (error) {
                console.error("관리자 삭제 중 오류 발생:", error);
                alert("관리자를 삭제하는 중 오류가 발생했습니다.");
            }
        }
    };
    

    const fetchAdmins = async (page: number = 0) => {
        try {
            const { data } = await axios.get(api.admin, {
                params: { page, limit: itemsPerPage }
            });
            const { adminList, totalCount } = data.data;
            const sortedAdmins = adminList.sort((a: AdminProps, b: AdminProps) => a.id - b.id);

            setAdmins(sortedAdmins);
            setPageCount(Math.ceil(totalCount / itemsPerPage));
        } catch (error) {
            console.error("관리자 목록 조회 중 오류 발생", error);
        }
    };

    useEffect(() => {
        fetchAdmins(currentPage);

        const storedLoginId = localStorage.getItem("loginId");
        setLoggedInId(storedLoginId);
    }, [currentPage]);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentAdmins = admins.slice(offset, offset + itemsPerPage);
    
    return (
        <div className="container mx-96 py-16">
            <div className='flex justify-end'>
                <button
                    className='border border-black rounded-md border-2 p-1 text-l my-4 ml-2 hover:bg-gray-300 flex items-center'
                    onClick={handleNewAdmin}
                >
                    <img
                            src="/imgs/add.png"
                            alt="새 관리자 등록"
                            className="w-4 h-4 mr-1"
                        />
                    <span>관리자 등록</span>
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="w-full bg-gray-100 border">
                        <th className="border-x py-2 px-4 text-left text-gray-600">id</th>
                        <th className="border-x py-2 px-4 text-left text-gray-600">관리자 아이디</th>
                        <th className="border-x py-2 px-4 text-left text-gray-600">생성일</th>
                        <th className="border-x py-2 px-4 text-left text-gray-600">비밀번호 수정일</th>
                        <th className="border-x py-2 px-2 text-center text-sm text-gray-600">수정</th>
                        <th className="border-x py-2 px-2 text-center text-sm text-gray-600">삭제</th>
                    </tr>
                </thead>
                <tbody>
                {currentAdmins.map((admin) => (
                    <tr key={admin.id} className="border hover:bg-gray-50">
                        <td className="border w-8 py-2 px-4">{admin.id}</td>
                        <td className="w-32 border py-2 px-4">
                            <div className='w-32 truncate'>
                                {loggedInId !== admin.loginId && admin.id === 1 ? '*****' : admin.loginId}
                            </div>
                        </td>
                        <td className="w-32 border py-2 px-4">
                            <div className='w-32'>{admin.createdAt}</div>
                        </td>
                        <td className="w-32 border py-2 px-4">
                            <div className='w-32'>{admin.updatedAt}</div>
                        </td>
                        <td className="w-8 border py-2 px-4">
                            {loggedInId === admin.loginId && (
                            <button className="flex items-center">
                                <img 
                                    src="/imgs/edit.png"
                                    alt="수정"
                                    className="w-4 h-4"
                                    onClick={() => handleEditAdmin(admin.id)}
                                />
                            </button>
                            )}
                        </td>
                        <td className="w-8 border py-2 px-4">
                            { (loggedInId === process.env.REACT_APP_ADMIN_ID
                                ? loggedInId !== admin.loginId
                                : loggedInId === admin.loginId
                            )
                            && (
                            <button className="flex items-center">
                                <img 
                                    src="/imgs/delete.png"
                                    alt="삭제"
                                    className="w-4 h-4"
                                    onClick={() => handleDeleteAdmin(admin.id)}
                                />
                            </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
            <div className="mt-8">
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"flex justify-center space-x-2"}
                    pageClassName={"mx-1"}
                    pageLinkClassName={"px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200 flex items-center justify-center"}
                    previousClassName={"mx-1"}
                    previousLinkClassName={"px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200 flex items-center justify-center"}
                    nextClassName={"mx-1"}
                    nextLinkClassName={"px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200 flex items-center justify-center"}
                    breakClassName={"mx-1"}
                    breakLinkClassName={"px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200 flex items-center justify-center"}
                    activeClassName={"bg-black text-white rounded-full flex items-center justify-center"}
                />
            </div>
        </div>
    );
}

export default Admin;