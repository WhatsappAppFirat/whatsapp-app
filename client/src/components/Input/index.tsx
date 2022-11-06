import React from "react";

export const Input: React.FC<React.ComponentPropsWithoutRef<"input">> = (
  props
) => {
  return (
    <input
      className="border border-gray px-3 py-2 rounded-full bg-white tracking-wider shadow-sm"
      {...props}
    />
  );
};
