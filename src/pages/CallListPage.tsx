import { Card } from "../components/Card";
import { DataType } from "../types/dataTypes";

const CallListPage = () => {
  const rawHistory = localStorage.getItem("history");
  const data = rawHistory ? JSON.parse(rawHistory) : [];

  return (
    <div className='grid grid-cols-3 gap-10 px-8'>
      {data.map((callData: DataType) => (
        <Card data={callData} />
      ))}
    </div>
  );
};

export default CallListPage;
