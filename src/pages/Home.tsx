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

  const commonTableContentStyle =
    "p-2 font-medium text-lg border-b-2 border-gray";

  return (
    <div className='pt-5'>
      {openPopup && calledData && (
        <Popup ref={popupRef} onClose={handleClosePopup} data={calledData} />
      )}
      <table className='w-11/12 p-10 text-5xl mx-auto mb-5'>
        <caption className='mb-10 font-extrabold'>
          API 목록 조회 결과입니다.
        </caption>
        <thead className='text-xl'>
          <tr>
            {colTitles.map((colTitle) => (
              <th
                key={colTitle}
                className='border-y-2 text-center font-bold p-2'
              >
                {colTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='text-xl'>
          {data?.data.list.map((value, idx) => (
            <tr key={value.apiNm}>
              <th className={commonTableContentStyle}>{value.apiCd || "-"}</th>
              <th className={commonTableContentStyle}>
                {value.apiDesc || "-"}
              </th>
              <th className={commonTableContentStyle}>{value.apiNm || "-"} </th>
              <th className={commonTableContentStyle}>
                {value.cmnCdLginType || "-"}
              </th>
              <th className={commonTableContentStyle}>
                {value.cmnCdLginTypeNm || "-"}
              </th>
              <th className={commonTableContentStyle}>{value.kwrdCd || "-"}</th>
              <th className={commonTableContentStyle}>{value.kwrdNm || "-"}</th>
              <th className={commonTableContentStyle}>{value.prvr || "-"}</th>
              <th className={commonTableContentStyle}>
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
