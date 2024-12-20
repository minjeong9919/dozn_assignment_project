export interface DataType {
  admUserId: string;
  apiNm: string;
  apiDesc: string;
  apiCd: string;
  kwrdCd: string;
  kwrdNm: string;
  prvr: string;
  apiCdUid: string;
  apiLogStus: string;
  changeAble: string;
  cmnCdLginType: string;
  cmnCdLginTypeNm: string;
  mdulCustCd: string;
  mdulNm: string;
}

export interface DataListResponseType {
  errYn: string;
  code: string;
  msg: string;
  data: {
    list: DataType[];
    totalCount: string;
    totalPage: string;
  };
}
