import React from "react";
import { useNavigate } from "react-router-dom";
import useUser from "src/store/useUser";

export const Auth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useUser(state => state.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  return (
    <div className="grid grid-cols-[1fr_50%] h-screen">
      <div className="flex flex-col items-center justify-center">
        <img
          className="rounded-full bg-white shadow-md p-2 mb-12"
          src="https://seeklogo.com/images/F/firat-universitesi-logo-9A6BF66AC2-seeklogo.com.png"
          width="100"
          height="100"
        />
        {children}
      </div>
      <div
        className="bg-primary bg-cover bg-center bg-blend-soft-light"
        style={{
          backgroundImage:
            "url(https://cdn.yeniakit.com.tr/images/news/625/firat-universitesi-gelecek-elinizin-altinda-h1596803067-452435.jpeg)",
        }}
      ></div>
    </div>
  );
};
