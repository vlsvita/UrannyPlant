import type { FC, InputHTMLAttributes, ButtonHTMLAttributes } from "react";
import { makeClassName } from "./textUtil";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    isForm : boolean
    className?: string;
};
export const Input: FC<InputProps> = ({ isForm, className: _className, ...props }) => {
    const base = isForm
        ? "w-full px-3 py-2 border bg-white border-gray-300 rounded-lg text-black text-lg focus:outline-none focus:border-black sm:text-base sm:px-2 sm:py-1"
        : "w-full bg-white text-2xl focus:outline-none focus:border-black sm:text-lg";
    const className = makeClassName(base, _className);
    return <input {...props} className={className} />;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
};
export const Button: FC<ButtonProps> = ({ className: _className, ...props }) => {
    const base = "rounded-lg px-4 py-2 bg-white text-black border border-gray-300 cursor-pointer text-lg sm:text-base sm:px-2 sm:py-1";
    const className = makeClassName(base, _className);
    return <button {...props} className={className} />;
};

export const TextButton: FC<ButtonProps> = ({ className: _className, ...props }) => {
    const className = makeClassName(
        "bg-transparent border-none text-black text-lg cursor-pointer hover:underline p-0 m-0 sm:text-base",
        _className
    );
    return <button {...props} className={className} />;
};
