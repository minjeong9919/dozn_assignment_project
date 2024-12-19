export interface SigninFormDataType {
  admUserId: string;
  userPw: string;
}

export interface SigninResponseDataForm {
  errYn: string;
  code: string;
  msg: string;
  data: {
    accessToken: string;
    loginFailCount: string;
  };
}

export interface DecodedJWTType {
  apiKey: string;
  exp: number;
  iat: number;
  identification: string;
  isDozn: string;
}
