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

    const renderObject = (obj: ScrappingDataResonseType) => {
      return (
        <div className='h-[calc(100%-50px)] overflow-scroll'>
          {Object.entries(obj).map(([key, value]) => {
            if (
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

    console.log(scrappingData);

    return (
      <div className=' fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div
          ref={ref}
          className='bg-white rounded p-10 w-11/12 h-3/4 p-10 flex flex-col'
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
