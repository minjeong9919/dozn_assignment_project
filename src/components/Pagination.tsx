import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

interface propsType {
  totalPage: number;
  onClickPage: (page: number) => void;
}

export const Pagination = ({ totalPage, onClickPage }: propsType) => {
  /**
   * 페이지네이션의 초기 페이지 값은 '1,2,3,4,5' 입니다.
   * 다음과 이전 버튼이 존재합니다.
   * 다음 클릭 시: '1,2,3,4,5' => '6,7,8,9,10'
   * 이전 클릭 시: '6,7,8,9,10' => '1,2,3,4,5'
   */
  const [currentPages, setCurrentPages] = useState([1, 2, 3, 4, 5]);

  const handlePreviousButtonClick = () => {
    setCurrentPages((prev) => {
      return prev.map((val) => val - 5);
    });
  };

  const handleNextButtonClick = () => {
    setCurrentPages((prev) => {
      return prev.map((val) => val + 5);
    });
  };

  return (
    <div className='w-max flex mx-auto'>
      <button
        className={`${
          currentPages[0] === 1 ? "bg-gray" : "bg-primary"
        } rounded-full p-1`}
        disabled={currentPages[0] === 1}
        onClick={handlePreviousButtonClick}
      >
        <FaAngleLeft size={20} color='white' />
      </button>
      {currentPages.map((page) => (
        <button
          key={page}
          className={`hover:underline rounded-full w-8 bg-gray100 ${
            page >= totalPage && "text-gray"
          }`}
          disabled={page >= totalPage}
          onClick={() => onClickPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`${
          currentPages[4] >= totalPage ? "bg-gray" : "bg-primary"
        } rounded-full p-1`}
        onClick={handleNextButtonClick}
        disabled={currentPages[4] >= totalPage}
      >
        <FaAngleRight size={20} color='white' />
      </button>
    </div>
  );
};
