import { useRef, useState } from "react";
import { DataListResponseType, DataType } from "../types/dataTypes";
import { Pagination } from "../components/Pagination";
import { useFetch } from "../hooks/useFetch";
import { checkAccessToken } from "../utils/checkAccessToken";
import { Popup } from "../components/Popup";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Home = () => {
  checkAccessToken();

  const [currentPage, setCurrentPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [calledData, setCalledData] = useState<DataType | null>(null);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: popupRef, handler: handleClosePopup });

  const { loading, error, data } = useFetch<DataListResponseType>(
    `/admin/api/user/api/list?pageSize=10&pageIdx=${currentPage}`
  );

  if (loading) {
    <div>loading</div>;
  }
  if (error) {
    <div>error</div>;
  }

  const colTitles = [
    "API 이름",
    "API 코드",
    "API 설명",
    "모듈 코드",
    "모듈 이름",
    "키워드 코드",
    "키워드 이름",
    "제공기관",
    "스크래핑 데이터",
  ];

  const handleClickPagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenPopup = (idx: number) => {
    if (data) {
      setCalledData({
        ...data.data.list[idx],
        callTime: new Date(),
      });
    }

    setOpenPopup(true);
  };

  return (
    <div className='pt-5'>
      {openPopup && calledData && (
        <Popup ref={popupRef} onClose={handleClosePopup} data={calledData} />
      )}
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
          {data?.data.list.map((value, idx) => (
            <tr key={value.apiNm}>
              <th className='border p-2'>{value.apiNm || "-"} </th>
              <th className='border p-2'>{value.apiCd || "-"}</th>
              <th className='border p-2 '>{value.apiDesc || "-"}</th>
              <th className='border p-2'>{value.cmnCdLginType || "-"}</th>
              <th className='border p-2'>{value.cmnCdLginTypeNm || "-"}</th>
              <th className='border p-2'>{value.kwrdCd || "-"}</th>
              <th className='border p-2'>{value.kwrdNm || "-"}</th>
              <th className='border p-2'>{value.prvr || "-"}</th>
              <th className='border p-2'>
                <button
                  className='bg-primary p-2 text-white rounded'
                  onClick={() => handleOpenPopup(idx)}
                >
                  호출하기
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPage={Number(data?.data.totalPage)}
        onClickPage={handleClickPagination}
      />
    </div>
  );
};

export default Home;
