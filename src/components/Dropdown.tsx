import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

interface propsType {
  list: string[];
  initialValue: string;
  onClickItem: (item: string) => void;
}

export const Dropdown = ({ list, initialValue, onClickItem }: propsType) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <div>
      <div
        onClick={() => setIsClick((prev) => !prev)}
        className='relative cursor-pointer rounded p-2 flex items-center gap-5 z-10 hover:underline'
      >
        {initialValue}
        <GoChevronDown />
        {isClick && (
          <div className='w-full absolute top-12 right-0 '>
            {list.map((value) => (
              <div
                key={value}
                onClick={() => onClickItem(value)}
                className='w-full rounded p-2 bg-white hover:bg-primary hover:text-white'
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
