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
  callTime?: Date;
  bookmark?: boolean;
}

export interface ResponseType {
  errYn: "Y" | "N";
  code: string;
  msg: string;
}

export interface ScrappingDataType {
  byteLength: string;
  code: string;
  data: [];
  msg: string;
}

export interface DataListResponseType extends ResponseType {
  data: {
    list: DataType[];
    totalCount: string;
    totalPage: string;
  };
}

export interface ScrappingDataResonseType extends ResponseType {
  data: {
    out: {
      code: string;
      data: {
        idLogin: {
          code: string;
          msg: string;
        };
        logout: {
          code: string;
          msg: string;
        };
      } & Record<
        string,
        {
          byteLength: string;
          code: string;
          data: object;
          msg: string;
        }
      >;
    };
    msg: string;
  };
}
