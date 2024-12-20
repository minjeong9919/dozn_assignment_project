import { useEffect, useState } from "react";
import { DataListResponseType } from "../types/dataTypes";
import { FaArrowLeft } from "react-icons/fa6";
import { DataType } from "../types/dataTypes";
// import { mockData } from "../mock/mockData";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataType[] | null>(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const colTitles = [
    "API 이름",
    "API 코드",
    "API 설명",
    "모듈 코드",
    "모듈 이름",
    "키워드 코드",
    "키워드 이름",
    "제공기관",
  ];

  const dataListAPI = async (): Promise<DataListResponseType | undefined> => {
    const url = `${BASE_URL}/admin/api/user/api/list?pageSize=10&pageIdx=${currentPage}`;
    const token = localStorage.getItem("accesstoken");

    if (!token) {
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setData(data.data.list);
    setTotalPage(data.data.totalPage);
    setLoading(false);
  };

  useEffect(() => {
    dataListAPI();
  }, [currentPage]);

  console.log(data);

  if (loading) {
    return <div>로딩중</div>;
  }

  return (
    <table className='p-10 text-5xl '>
      <caption className='mb-10'>API 목록 조회 결과입니다.</caption>
      <thead className='text-xl border'>
        <tr>
          {colTitles.map((colTitle) => (
            <th key={colTitle} className='border text-center font-bold'>
              {colTitle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='text-xl'>
        {data?.map((value) => (
          <tr key={value.apiNm}>
            <th className='border'>{value.apiNm}</th>
            <th className='border'>{value.apiCd}</th>
            <th className='border'>{value.apiDesc}</th>
            <th className='border'>{value.cmnCdLginType}</th>
            <th className='border'>{value.cmnCdLginTypeNm}</th>
            <th className='border'>{value.kwrdCd}</th>
            <th className='border'>{value.kwrdNm}</th>
            <th className='border'>{value.prvr}</th>
          </tr>
        ))}
      </tbody>
      <button>pagination</button>
    </table>
  );
};

export default Home;
