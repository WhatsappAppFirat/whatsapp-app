import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  outline?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  outline = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-full border border-primary px-2 py-1 font-bold text-lg min-w-[180px] shadow-sm",
        outline
          ? "bg-white text-primary hover:bg-primary hover:text-white"
          : "bg-primary text-white",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
