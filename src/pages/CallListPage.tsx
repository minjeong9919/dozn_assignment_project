import { useState } from "react";
import { Card } from "../components/Card";
import { DataType } from "../types/dataTypes";

const CallListPage = () => {
  const rawHistory = localStorage.getItem("history");
  const [data, setData] = useState(rawHistory ? JSON.parse(rawHistory) : []);

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

  return (
    <div className='grid grid-cols-3 gap-10 px-8'>
      {data.map((callData: DataType) => (
        <Card
          key={callData.apiNm}
          data={callData}
          initialBookmarkStatus={data?.bookmark}
          onClickStar={handleAddBookmark}
        />
      ))}
    </div>
  );
};

export default CallListPage;
