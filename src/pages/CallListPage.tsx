import { useRef, useState } from "react";
import { Card } from "../components/Card";
import { DataType } from "../types/dataTypes";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Popup } from "../components/Popup";
import { Dropdown } from "../components/Dropdown";

const CallListPage = () => {
  const rawHistory = localStorage.getItem("history");

  const [openPopup, setOpenPopup] = useState(false);
  const [calledData, setCalledData] = useState<DataType | null>(null);
  const [data, setData] = useState(rawHistory ? JSON.parse(rawHistory) : []);

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
    const updatedData = data.map((value: DataType) => {
      if (value.apiNm === apiNm) {
        return { ...value, bookmark: addBookmark };
      }
      return value;
    });

    const sortedData = updatedData.sort((a: DataType, b: DataType) => {
      return (b.bookmark ? 1 : 0) - (a.bookmark ? 1 : 0);
    });

    setData(sortedData);
  };

  const handleClickDropdown = (item: string) => {
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
