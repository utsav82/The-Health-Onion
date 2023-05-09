"use client";
import clsx from "clsx";
const Button = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  rounded,
  backgroundColor,
  px,
  py,
  text
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex 
        justify-center 
        px-${px}
        py-${py} 
        text-${text} 
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        hover:scale-110
        transition-transform		
        `,
        backgroundColor,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-[#43C7AB] hover:bg-sky-600 focus-visible:outline-sky-600",
        rounded ? "rounded-[50px]" : "rounded-md"
      )}>
      {children}
    </button>
  );
};

export default Button;
