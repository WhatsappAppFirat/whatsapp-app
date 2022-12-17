import React from "react";
import { useNavigate } from "react-router-dom";
import useUser from "src/store/useUser";
import { Navbar } from "../Navbar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const isAuthenticated = useUser(state => state.isAuthenticated);

  React.useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, []);


  return (
    <div>
      <Navbar />
      <div className="p-2">{children}</div>
    </div>
  );
};
