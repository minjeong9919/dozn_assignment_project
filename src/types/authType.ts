export interface SigninFormDataType {
  admUserId: string;
  userPw: string;
}

export interface SigninResponseDataForm {
  errorYn: string;
  code: string;
  msg: string;
  data: {
    accessToken: string;
    loginFailCount: string;
  };
}
