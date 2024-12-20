import { HTMLAttributes, useState } from "react";
import { DataType } from "../types/dataTypes";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface propsType extends HTMLAttributes<HTMLDivElement> {
  data: DataType;
  initialBookmarkStatus: boolean;
  onClickStar: (apiNm: string | undefined, addBookmark: boolean) => void;
}

export const Card = ({
  data,
  onClickStar,
  initialBookmarkStatus,
  ...rest
}: propsType) => {
  const { callTime, apiNm, apiCd, mdulCustCd, mdulNm } = data;
  const [clickedStar, setClickedStar] = useState(initialBookmarkStatus);

  const handleStar = () => {
    /**
     * 북마크 별을 누르면 실행되는 함수입니다.
     * 함수 파라미터로는 눌린 카드의 API 이름과 눌림의 상태를 전달합니다.
     */
    onClickStar(apiNm, !clickedStar);
    setClickedStar(!clickedStar);
  };

  return (
    <div className='shadow-xl w-full p-5 rounded cursor-pointer '>
      <div className='flex w-full items-center justify-between mb-6'>
        <h2 className='text-primary text-2xl font-extrabold'>{apiNm} </h2>
        {clickedStar ? (
          <FaStar size={25} onClick={handleStar} />
        ) : (
          <FaRegStar size={25} onClick={handleStar} />
        )}
      </div>
      <div {...rest}>
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
    </div>
  );
};
