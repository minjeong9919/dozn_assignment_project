import { validateJWT } from "./validateJWT";

export const checkAccessToken = () => {
  const token = localStorage.getItem("accesstoken");

  if (!token || validateJWT(token)) {
    localStorage.removeItem("accesstoken");
    window.location.href = "/login";
  }
};
