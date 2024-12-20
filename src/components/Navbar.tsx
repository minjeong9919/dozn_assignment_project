import { Link } from "react-router-dom";
import { validateJWT } from "../utils/validateJWT";

export const Navbar = () => {
  const token = localStorage.getItem("accesstoken");
  const isExpired = !token || validateJWT(token);

  const commonLinkStyle =
    "hover:bg-gray200 rounded px-2 my-1 flex justify-center items-center font-semibold";

  return (
    <div className='w-screen h-16 px-8 py-2 flex justify-between fixed'>
      <Link
        to={isExpired ? `/login` : "/"}
        className='text-4xl font-black text-primary'
      >
        dozn
      </Link>
      {isExpired ? (
        <Link
          to='/login'
          className='rounded px-3 my-1 flex justify-center items-center font-semibold bg-primary text-white hover:bg-primary100'
        >
          로그인
        </Link>
      ) : (
        <div className='flex gap-5'>
          <Link to='/' className={commonLinkStyle}>
            API 목록 조회
          </Link>
          <Link to='/callList' className={commonLinkStyle}>
            호출 목록 조회
          </Link>
        </div>
      )}
    </div>
  );
};
