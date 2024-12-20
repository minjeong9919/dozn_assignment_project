import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

interface propsType {
  totalPage: number;
  onClickPage: () => void;
}

export const Pagination = ({ totalPage, onClickPage }: propsType) => {
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
          className={`hover:underline rounded-full w-8 bg-white ${
            page >= totalPage && "text-gray"
          }`}
          disabled={page >= totalPage}
          onClick={() => onClickPage()}
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
