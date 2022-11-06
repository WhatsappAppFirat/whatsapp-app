import React from "react";

export const Auth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-[40%_1fr] h-screen">
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
