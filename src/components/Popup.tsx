import { forwardRef } from "react";
import { DataType, ScrappingDataResonseType } from "../types/dataTypes";
import { useFetch } from "../hooks/useFetch";
import spinner from "../assets/spinner.svg";
import { MdError } from "react-icons/md";

interface PropsType {
  onClose: (open: boolean) => void;
  data: DataType;
}

export const Popup = forwardRef<HTMLDivElement, PropsType>(
  ({ onClose, data }, ref) => {
    const { apiCd, mdulCustCd } = data;

    const {
      loading,
      error,
      data: scrappingData,
    } = useFetch<ScrappingDataResonseType>(
      `/admin/api/recruit/scrp-recruit?mdulCustCd=${mdulCustCd}&apiCd=${apiCd}`
    );

    if (!error) {
      const history = JSON.parse(localStorage.getItem("history") || "[]");

      const isDuplicate = history.some(
        (item: DataType) => item.apiCd === data.apiCd
      );

      if (!isDuplicate) {
        const updatedHistory = [...history, data];
        localStorage.setItem("history", JSON.stringify(updatedHistory));
      }
    }

    /**
     *
     * 동적인 데이터를 렌더링하기 위한 재귀 함수입니다.
     *
     * 각기 다른 데이터 구조를 렌더링하기 위해 정해진 Key 값을 갖는
     * 데이터 외의 value 값이 나올 때까지 재귀 함수를 돌립니다.
     * 만약, 원하는 key 값이 나오면 해당 key 값과 value 값을 렌더링합니다.
     */

    const renderObject = (obj: ScrappingDataResonseType) => {
      return (
        <div className='h-[calc(100%-50px)] overflow-scroll'>
          {Object.entries(obj).map(([key, value]) => {
            if (
              /**
               * 해당 key 값들은 렌더링하기 위한 데이터가 아니므로 바로 return 합니다.
               */
              key === "code" ||
              key === "msg" ||
              key === "byteLength" ||
              key === "errYn"
            ) {
              return null;
            }

            return (
              <div key={key} className='mb-2'>
                {typeof value === "object" ? (
                  renderObject(value)
                ) : (
                  <>
                    <strong>{key}:</strong> <span>{String(value)}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div className=' fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div
          ref={ref}
          className='bg-white rounded p-10 w-11/12 h-3/4 p-10 flex flex-col z-10 bg-opacity-100'
        >
          {loading && (
            <div className='h-[calc(100%-50px)] flex justify-center items-center'>
              <img src={spinner} />
            </div>
          )}
          {error && (
            <div className='text-8xl text-primary text-center font-extrabold mt-5'>
              ERROR
              <p className='text-3xl mt-10 flex gap-5 text-black'>
                <MdError color='red' />
                데이터를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해주세요.
              </p>
            </div>
          )}
          {scrappingData && renderObject(scrappingData)}
          <button
            onClick={() => onClose(false)}
            className='bg-primary text-white rounded w-full py-2 text-xl hover:bg-primary100'
          >
            닫기
          </button>
        </div>
      </div>
    );
  }
);
