import React from "react";
import { Navbar } from "../Navbar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <Navbar />
      <div className="p-2">{children}</div>
    </div>
  );
};
