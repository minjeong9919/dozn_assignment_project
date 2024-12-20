import { useEffect, useState } from "react";
import { DataListResponseType } from "../types/dataTypes";
import { DataType } from "../types/dataTypes";
import { Pagination } from "../components/Pagination";
import { mockData } from "../mock/mockData";

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

  const getDataList = async (): Promise<DataListResponseType | undefined> => {
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

  const getMockData = (page: number): DataListResponseType => {
    const { list, totalCount } = mockData.data;
    const totalPage = Math.ceil(totalCount / 10);

    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    if (page > totalPage || page < 1) {
      setLoading(false);
      return {
        errYn: "Y",
        code: "3000200",
        data: {
          list: [],
          totalCount: String(totalCount),
          totalPage: String(totalCount),
        },
        msg: "[ERROR] 요청된 페이지가 범위를 벗어났습니다.",
      };
    }

    setLoading(false);
    return {
      code: "3000200",
      data: {
        list: list.slice(startIndex, endIndex),
        totalCount: String(totalCount),
        totalPage: String(totalPage),
      },
      errYn: "N",
      msg: "[SUCCESS] 조회 성공",
    };
  };

  useEffect(() => {
    // getDataList();
    const response = getMockData(currentPage);
    setData(response.data.list);
    setTotalPage(Number(response.data.totalPage));
  }, [currentPage]);

  const handleClickPagination = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>로딩중</div>;
  }

  return (
    <div className='pt-5'>
      <table className='w-11/12 p-10 text-5xl mx-auto mb-5'>
        <caption className='mb-10 font-extrabold'>
          API 목록 조회 결과입니다.
        </caption>
        <thead className='text-xl border'>
          <tr>
            {colTitles.map((colTitle) => (
              <th key={colTitle} className='border text-center font-bold p-2'>
                {colTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='text-xl'>
          {data?.map((value) => (
            <tr key={value.apiNm}>
              <th className='border p-2'>{value.apiNm}</th>
              <th className='border p-2'>{value.apiCd}</th>
              <th className='border p-2 '>{value.apiDesc}</th>
              <th className='border p-2'>{value.cmnCdLginType}</th>
              <th className='border p-2'>{value.cmnCdLginTypeNm}</th>
              <th className='border p-2'>{value.kwrdCd}</th>
              <th className='border p-2'>{value.kwrdNm}</th>
              <th className='border p-2'>{value.prvr}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPage={totalPage} onClickPage={handleClickPagination} />
    </div>
  );
};

export default Home;
