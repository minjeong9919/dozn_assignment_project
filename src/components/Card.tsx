import { DataType } from "../types/dataTypes";

interface propsType {
  data: DataType;
}

export const Card = ({ data }: propsType) => {
  const { callTime, apiNm, apiCd, mdulCustCd, mdulNm } = data;
  return (
    <div className='shadow-xl w-full p-5 rounded'>
      <h2 className='text-primary text-2xl font-bold mb-6'>{apiNm}</h2>
      <ul className='flex flex-col gap-2'>
        <li>
          <strong>API 이름: </strong>
          {apiNm}
        </li>
        <li>
          <strong>API 코드: </strong>
          {apiCd}
        </li>
        <li>
          <strong>모듈 이름: </strong>
          {mdulNm}
        </li>
        <li>
          <strong>모듈 코드: </strong>
          {mdulCustCd}
        </li>
        <li>
          <strong>호출 시간: </strong> {callTime?.toString()}
        </li>
      </ul>
    </div>
  );
};
