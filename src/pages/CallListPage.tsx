import { useRef, useState } from "react";
import { Card } from "../components/Card";
import { DataType } from "../types/dataTypes";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Popup } from "../components/Popup";
import { Dropdown } from "../components/Dropdown";
import { checkAccessToken } from "../utils/checkAccessToken";

const CallListPage = () => {
  checkAccessToken();
  const rawHistory = localStorage.getItem("history");

  const [openPopup, setOpenPopup] = useState(false);
  const [calledData, setCalledData] = useState<DataType | null>(null);
  const [data, setData] = useState(rawHistory ? JSON.parse(rawHistory) : []);

  /**
   * 팝업창의 외부 클릭 시 닫히도록 하였습니다.
   */
  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: popupRef, handler: handleClosePopup });

  const handleOpenPopup = (idx: number) => {
    setOpenPopup(true);
    if (data) {
      setCalledData({
        ...data[idx],
      });
    }
  };

  const handleAddBookmark = (
    apiNm: string | undefined,
    addBookmark: boolean
  ) => {
    /**
     * 북마크를 추가할 경우, 기존의 데이터에 'bookmark' 라는 키값을 추가하여 해당 value로는 true를 넣습니다.
     * 만약, 북마크를 제거하는 경우 'bookmark' 키의 값으로 false를 넣어 data를 업데이트합니다.
     */
    const updatedData = data.map((value: DataType) => {
      if (value.apiNm === apiNm) {
        return { ...value, bookmark: addBookmark };
      }
      return value;
    });

    /**
     * 북마크가 추가된 데이터의 경우 앞으로 오게 정렬합니다.
     */
    const sortedData = updatedData.sort((a: DataType, b: DataType) => {
      return (b.bookmark ? 1 : 0) - (a.bookmark ? 1 : 0);
    });

    setData(sortedData);
  };

  const handleClickDropdown = (item: string) => {
    /**
     * 호출 시간 값을 이용해 정렬을 진행합니다.
     */
    if (item === "최신순") {
      const sortByNewest = [...data].sort(
        (a, b) =>
          new Date(b.callTime).getTime() - new Date(a.callTime).getTime()
      );
      return setData(sortByNewest);
    }

    if (item === "오래된순") {
      const sortByOldest = [...data].sort(
        (a, b) =>
          new Date(a.callTime).getTime() - new Date(b.callTime).getTime()
      );
      return setData(sortByOldest);
    }
  };

  return (
    <div>
      {openPopup && calledData ? (
        <Popup ref={popupRef} onClose={handleClosePopup} data={calledData} />
      ) : (
        <>
          <div className='w-fit ml-auto mr-8 mb-8'>
            <Dropdown
              list={["최신순", "오래된순"]}
              initialValue='관련도순'
              onClickItem={handleClickDropdown}
            />
          </div>
          <div className='grid grid-cols-3 gap-10 px-8'>
            {data.map((callData: DataType, idx: number) => (
              <Card
                key={callData.apiNm}
                data={callData}
                initialBookmarkStatus={data?.bookmark}
                onClickStar={handleAddBookmark}
                onClick={() => handleOpenPopup(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CallListPage;
