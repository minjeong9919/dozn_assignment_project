import Input from "../components/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const registers = {
    id: register("id", {
      required: "아이디를 입력하세요.",
    }),
    password: register("password", {
      required: "비밀번호를 입력해주세요.",
    }),
  };

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    console.log("로그인 시도:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-1/6 h-screen mx-auto flex flex-col justify-center items-center gap-x-4'
    >
      <h1 className='text-8xl text-primary font-extrabold mb-10'>dozn</h1>
      <Input
        title='로그인'
        placeholder='아이디를 입력해주세요'
        {...registers.id}
        errorMessage={errors.id?.message}
      />
      <Input
        title='비밀번호'
        placeholder='비밀번호를 입력해주세요'
        {...registers.password}
        errorMessage={errors.password?.message}
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
