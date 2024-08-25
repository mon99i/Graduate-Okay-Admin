import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import api from '../../apis/api';
import ITEMS_PER_PAGE from './../../utils/constants';

interface NoticeProps {
    id: number;
    title: string;
    content: string;
}

const Notice: React.FC = () => {
    const [notices, setNotices] = useState<NoticeProps[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();
    const itemsPerPage = ITEMS_PER_PAGE;

    const handleNewNotice = () => {
        navigate('/notice/new');
    }

    const handleNotice = (id: number) => {
        navigate(`/notice/${id}`);
    };

    const fetchNotices = async (page: number = 0) => {
        try {
            const { data } = await axios.get(api.notice, {
                params: { page, limit: itemsPerPage }
            });
            const { noticeList, totalCount } = data.data;
            const sortedNotices = noticeList.sort((a: NoticeProps, b: NoticeProps) => a.id - b.id);

            setNotices(sortedNotices);
            setTotalCount(totalCount);
            setPageCount(Math.ceil(totalCount / itemsPerPage));
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };

    useEffect(() => {
        fetchNotices(currentPage);
    }, [currentPage]);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentNotices = notices.slice(offset, offset + itemsPerPage);

    return (
        <div className="container mx-16 py-16">
            <div className='grid justify-items-end'>
                <button
                    className='border border-black rounded-md border-2 p-1 text-xl m-4'
                    onClick={handleNewNotice}
                >
                새 글 작성
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="w-full bg-gray-100 border">
                        <th className="border-x py-2 px-4 text-left text-gray-600">id</th>
                        <th className="border-x py-2 px-4 text-left text-gray-600">제목</th>
                        <th className="py-2 px-4 text-left text-gray-600">내용</th>
                    </tr>
                </thead>
                <tbody>
                    {currentNotices.map((notice) => (
                        <tr key={notice.id} className="border hover:bg-gray-50" onClick={() => handleNotice(notice.id)}>
                            <td className="border w-8 py-2 px-4">{notice.id}</td>
                            <td className="w-[38rem] border py-2 px-4">
                                <div className='w-[38rem] truncate'>{notice.title}</div>
                            </td>
                            <td className="w-[44rem] py-2 px-4">
                                <div className='w-[44rem] truncate'>{notice.content}</div>
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
};

export default Notice;
