import { SigninFormDataType, SigninResponseDataForm } from "../types/authType";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const postSignin = async (
  formData: SigninFormDataType
): Promise<SigninResponseDataForm> => {
  const url = `${BASE_URL}/admin/api/recruit/login-check`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg);
  }
  return data;
};
