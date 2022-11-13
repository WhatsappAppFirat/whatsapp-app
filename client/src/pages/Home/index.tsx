import React from "react";

const Group: React.FC<{ title: string; link: string; verified?: boolean }> = ({
  title,
  link,
  verified = false,
}) => {
  return (
    <a
      href={link}
      className="flex items-center justify-between gap-5 bg-white rounded-md p-4 shadow-md"
    >
      <div className="flex gap-2 items-center">
        <img
          width="50"
          height="50"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/598px-WhatsApp_icon.png"
          alt="whatsapp logo"
        />
        <span className="font-bold">{title}</span>
      </div>

      {verified ? (
        <img
          width="50"
          height="50"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png"
        ></img>
      ) : (
        <img
          className="opacity-30"
          width="50"
          height="50"
          src="https://cdn-icons-png.flaticon.com/512/5184/5184592.png"
          alt="unverified"
        />
      )}
    </a>
  );
};

export const Home = () => {
  return (
    <div className="text-center">
      <h1 className="mt-20 text-3xl">Yazılım Mühendisliği için Gruplar</h1>
      <h4 className="text-gray-600">
        Aşağıdaki listede bulunan gruplardan size uygun olana katılabilirsiniz.
      </h4>
      <div className="flex flex-col gap-6 mt-8 p-6 bg-slate-300 w-1/3 mx-auto rounded-md">
        <Group
          title="Yazılım Mühendisliği - Gündüz 1. Sınıf"
          link="#"
          verified
        />
        <Group title="Yazılım Mühendisliği - Gündüz 2. Sınıf" link="#" />
        <Group
          title="Yazılım Mühendisliği - Gündüz 3. Sınıf"
          link="#"
          verified
        />
        <Group title="Yazılım Mühendisliği - Gündüz 4. Sınıf" link="#" />
        <Group title="Yazılım Mühendisliği - Gece 1. Sınıf" link="#" />
      </div>
    </div>
  );
};