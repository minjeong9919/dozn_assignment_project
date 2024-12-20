import { DataType } from "../types/dataTypes";

interface PropsType {
  onClose: (open: boolean) => void;
  data: DataType;
}

export const Popup = ({ onClose, data }: PropsType) => {
  console.log(data);
  const { apiNm, apiCd, callTime, mdulCustCd, mdulNm } = data;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white rounded p-10 flex flex-col justify-center items-center'>
        <h2 className='text-4xl mb-4 font-bold'>{apiNm}</h2>
        <ol className='flex flex-col gap-2 mb-5'>
          <li>
            <strong>호출 시간:</strong> {callTime?.toString()}
          </li>
          <li>
            <strong>API 이름:</strong> {apiNm}
          </li>
          <li>
            <strong>API 코드:</strong> {apiCd}
          </li>
          <li>
            <strong>모듈 코드:</strong> {mdulCustCd}
          </li>
          <li>
            <strong>모듈 이름:</strong> {mdulNm}
          </li>
        </ol>
        <button
          onClick={() => onClose(false)}
          className='bg-primary text-white rounded w-full py-2 text-xl hover:bg-primary100'
        >
          닫기
        </button>
      </div>
    </div>
  );
};
