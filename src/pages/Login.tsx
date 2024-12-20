import Input from "../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { postSignin } from "../api/authAPI";
import { SigninFormDataType } from "../types/authType";

const Login = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      admUserId: "",
      userPw: "",
    },
  });

  const registers = {
    admUserId: register("admUserId", {
      required: "아이디를 입력하세요.",
    }),
    userPw: register("userPw", {
      required: "비밀번호를 입력해주세요.",
    }),
  };

  const onSubmit: SubmitHandler<SigninFormDataType> = async (formData) => {
    const result = await postSignin(formData);
    if (result.errYn === "Y") {
      return alert("로그인에 실패했습니다.");
    }
    localStorage.setItem("accesstoken", result.data.accessToken);
    window.location.href = "/";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-80 h-screen mx-auto flex flex-col justify-center items-center gap-x-4'
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
  );
};

export default Login;