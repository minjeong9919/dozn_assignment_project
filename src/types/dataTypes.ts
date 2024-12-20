export interface DataType {
  admUserId: string | undefined;
  apiNm: string | undefined;
  apiDesc: string | undefined;
  apiCd: string | undefined;
  kwrdCd: string | undefined;
  kwrdNm: string | undefined;
  prvr: string | undefined;
  apiCdUid?: string | undefined;
  apiLogStus?: number;
  changeAble?: string | undefined;
  cmnCdLginType?: string | undefined;
  cmnCdLginTypeNm?: string | undefined;
  mdulCustCd: string | undefined;
  mdulNm: string | undefined;
  userApiStus: string | undefined;
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
