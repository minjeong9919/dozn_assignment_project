import { DecodedJWTType } from "../types/authType";

/**
 *
 * 액세스 토큰을 입력 파라미터로 받습니다.
 * 해당 액세스 토큰의 유효성을 체크하는 합수입니다.
 */
export const validateJWT = (accessToken: string) => {
  if (
    !accessToken ||
    typeof accessToken !== "string" ||
    !accessToken.includes(".")
  ) {
    return;
  }

  const token = accessToken.replace("Bearer ", "");

  const base64Payload = token.split(".")[1];
  const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");

  const decodedJWT = JSON.parse(
    decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    )
  );

  return isTokenExpired(decodedJWT);
};

const isTokenExpired = (decodedToken: DecodedJWTType): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};
