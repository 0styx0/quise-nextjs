import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={
        `${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-bold py-2 px-6 rounded ` + className
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
