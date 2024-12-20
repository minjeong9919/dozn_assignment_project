import { InputHTMLAttributes, forwardRef } from "react";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, PropsType>(
  ({ title, errorMessage, ...rest }, ref) => {
    return (
      <div className='w-full flex flex-col gap-3 mb-5 font-bold'>
        {title}
        <input
          className='border-2 border-primary rounded py-1 px-2 bg-gray100'
          ref={ref}
          {...rest}
        />
        {errorMessage && (
          <div className='text-xs text-red font-medium'>{errorMessage}</div>
        )}
      </div>
    );
  }
);

export default Input;
