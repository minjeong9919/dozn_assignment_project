import { validateJWT } from "./validateJWT";

/**
 * 토큰의 유효성에 따른 동작을 실행하는 함수입니다.
 * localStorage에 토큰이 없거나, 만료된 토큰일 경우
 * 액세스 토큰을 제거하고, 로그인 페이지로 리다이렉트합니다.
 */
export const checkAccessToken = () => {
  const token = localStorage.getItem("accesstoken");

  if (!token || validateJWT(token)) {
    localStorage.removeItem("accesstoken");
    window.location.href = "/login";
  }
};
