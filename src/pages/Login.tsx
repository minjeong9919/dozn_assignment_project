import Input from "../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { postSignin } from "../api/authAPI";
import { SigninFormDataType } from "../types/authType";
import { validateJWT } from "../utils/validateJWT";

const Login = () => {
  const token = localStorage.getItem("accesstoken");

  if (token && !validateJWT(token)) {
    window.location.href = "/";
  }

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      admUserId: "",
      userPw: "",
    },
  });

  /**
   * 유효성 검사를 실행합니다.
   * 아이디: 4 ~ 12 글자, 필수 입력
   * 비밀번호: 8글자 이상, 영문, 숫자 , 필수 입력
   */
  const registers = {
    admUserId: register("admUserId", {
      required: "아이디를 입력하세요.",
      minLength: {
        value: 4,
        message: "아이디는 최소 4글자 이상이어야 합니다.",
      },
      maxLength: {
        value: 12,
        message: "아이디는 최대 12글자 이하이어야 합니다.",
      },
    }),
    userPw: register("userPw", {
      required: "비밀번호를 입력해주세요.",
      minLength: {
        value: 8,
        message: "비밀번호는 최소 8글자 이상이어야 합니다.",
      },
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/,
        message: "비밀번호는 영문과 숫자를 포함해야 합니다.",
      },
    }),
  };

  const onSubmit: SubmitHandler<SigninFormDataType> = async (formData) => {
    const result = await postSignin(formData);
    if (result.errYn === "Y") {
      return alert("로그인에 실패했습니다.");
    }
    /**
     * 로그읜 성공 시, 엑세스 토큰을 localStorage에 저장 후, 홈페이지로 이동합니다.
     */
    localStorage.setItem("accesstoken", result.data.accessToken);
    window.location.href = "/";
  };

  return (
    <div className='flex justify-content items-center h-full'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-80 h-full mx-auto my-auto flex flex-col justify-center items-center gap-x-4'
      >
        <h1 className='text-8xl text-primary font-extrabold mb-10'>dozn</h1>
        <Input
          title='로그인'
          placeholder='아이디를 입력해주세요'
          {...registers.admUserId}
          errorMessage={errors.admUserId?.message}
        />
        <Input
          title='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          {...registers.userPw}
          errorMessage={errors.userPw?.message}
        />
        <button
          id='loginButton'
          className={`${
            isSubmitting ? "bg-gray" : "bg-primary"
          } text-white rounded w-full py-2 text-xl`}
          disabled={isSubmitting}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
