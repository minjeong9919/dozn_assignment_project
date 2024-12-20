import { RefObject, useEffect } from "react";

interface propsType {
  ref: RefObject<HTMLElement>;
  handler: (e: MouseEvent) => void;
}

export const useOutsideClick = ({ ref, handler }: propsType) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      handler(e);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });
};
