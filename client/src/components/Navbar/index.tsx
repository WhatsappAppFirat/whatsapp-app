import React from "react";
import useUser from "src/store/useUser";

export const Navbar = () => {
  const user = useUser((state) => state.user);

  return (
    <div className="bg-primary text-white font-semibold text-xl flex text-center justify-between pr-3 items-center shadow-md">
      <div className="flex align-middle items-center">
        <div className="bg-white rounded-r-full w-20 h-12 flex flex-row-reverse">
          <img
            className="p-1"
            src="https://seeklogo.com/images/F/firat-universitesi-logo-9A6BF66AC2-seeklogo.com.png"
            width="50"
            height="50"
          />
        </div>
        <div className="p-5">
          Teknoloji Fakültesi / Yazılım Mühendisliği (M.T.O.K)
        </div>
      </div>
      <a href="#">{user?.name}</a>
    </div>
  );
};
