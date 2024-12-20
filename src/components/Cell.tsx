import { ReactNode } from "react";

interface CellProps {
  size?: "s" | "m" | "l";
  children: ReactNode;
}

const Cell = ({ children, size = "m", ...rest }: CellProps) => {
  return (
    <div
      className={`p-2 border text-center  ${size === "s" && "w-10"}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Cell;
