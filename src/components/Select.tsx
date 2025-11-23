import type { FC, SelectHTMLAttributes } from "react";
import { makeClassName } from "./textUtil";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};
export const Select: FC<SelectProps> = ({ className: _className, children, ...props }) => {
  const className = makeClassName(
    "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black text-lg cursor-pointer focus:outline-none focus:border-black appearance-none sm:text-base sm:px-2 sm:py-1",
    _className
  );
  return <select {...props} className={className}>{children}</select>;
};
