export interface DataListResponseType {
  errYn: string;
  code: string;
  msg: string;
  data: {
    list: {
      admUserId: string;
      aipNm: string;
      apiDesc: string;
      apiCd: string;
      kwrdCd: string;
      kwrdNm: string;
      prvr: string;
      apiCdUid: string;
      apiLogStus: string;
      changeAble: string;
      cmnCdLginType: string;
      cmdCdLginTypeNm: string;
      mdulCustCd: string;
      mdulNm: string;
    };
    totalCount: string;
    totalPage: string;
  };
}
