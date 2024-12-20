import { useEffect, useState } from "react";
import { DataListResponseType } from "../types/dataTypes";
import Cell from "../components/Cell";
import { mockData } from "../mock/mockData";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const colTitles = [
    "",
    "API 이름",
    "API 코드",
    "API 설명",
    "모듈 코드",
    "모듈 이름",
    "키워드 코드",
    "키워드 이름",
    "제공기관",
  ];

  console.log(data);

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
    <div className='p-10 text-5xl '>
      <h1 className='mb-10'>API 목록 조회 결과입니다.</h1>
      <div className='grid text-xl border'>
        <div className='grid grid-cols-9'>
          {colTitles.map((colTitle, idx) => (
            <Cell
              key={colTitle}
              size={`${idx === 0 ? "s" : "m"}`}
              className='border text-center font-bold'
            >
              {colTitle}
            </Cell>
          ))}
        </div>
        {mockData?.data.list.map((value, idx) => (
          <div key={value.apiNm} className='grid grid-cols-9'>
            <Cell size='s'>{idx}</Cell>
            <Cell>{value.apiNm}</Cell>
            <Cell>{value.apiCd}</Cell>
            <Cell>{value.apiDesc}</Cell>
            <Cell>{value.cmnCdLginType}</Cell>
            <Cell>{value.cmnCdLginTypeNm}</Cell>
            <Cell>{value.kwrdCd}</Cell>
            <Cell>{value.kwrdNm}</Cell>
            <Cell>{value.prvr}</Cell>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
