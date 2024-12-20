import { mockData } from "../mock/mockData";
import { DataListResponseType } from "../types/dataTypes";

export const getMockData = (page: number): DataListResponseType => {
  const { list, totalCount } = mockData.data;
  const totalPage = Math.ceil(totalCount / 10);

  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;

  if (page > totalPage || page < 1) {
    return {
      errYn: "Y",
      code: "3000200",
      data: {
        list: [],
        totalCount: String(totalCount),
        totalPage: String(totalCount),
      },
      msg: "[ERROR] 요청된 페이지가 범위를 벗어났습니다.",
    };
  }

  return {
    code: "3000200",
    data: {
      list: list.slice(startIndex, endIndex),
      totalCount: String(totalCount),
      totalPage: String(totalPage),
    },
    errYn: "N",
    msg: "[SUCCESS] 조회 성공",
  };
};
