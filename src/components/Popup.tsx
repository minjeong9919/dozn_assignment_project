import { forwardRef } from "react";
import {
  DataListResponseType,
  DataType,
  ScrappingDataResonseType,
} from "../types/dataTypes";
import { useFetch } from "../hooks/useFetch";

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
        <div className='min-h-full'>
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
          className='bg-white rounded p-10 overflow-scroll w-11/12 h-3/4 p-10'
        >
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
