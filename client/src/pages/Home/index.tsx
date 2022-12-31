import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import { groupActions } from "src/service/groups";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import useUser from "src/store/useUser";
import { AiOutlineDelete } from "react-icons/ai";

const Group: React.FC<{
  id: string;
  title: string;
  link: string;
  verified?: boolean;
  refetch: () => void;
}> = ({ id, title, link, verified = false, refetch }) => {
  const user = useUser((state) => state.user);

  return (
    <a
      href={link}
      className="flex items-center justify-between gap-5 bg-white rounded-2xl p-4 shadow-md"
      target="_blank"
      rel="noreferrer"
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

      <div className="flex gap-2">
        {verified && (
          <img
            width="50"
            height="50"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png"
          ></img>
        )}
        {!verified && user?.admin && (
          <button
            className="border border-green bg-green-500 p-4 rounded-full text-white text-xl"
            onClick={(e) => {
              e.preventDefault();
              groupActions.updateGroup(id, true).then(refetch);
            }}
          >
            <IoMdCheckmark />
          </button>
        )}

        {user?.admin && (
          <button
            className="border border-red bg-red-500 p-4 rounded-full text-white text-xl"
            onClick={(e) => {
              e.preventDefault();
              groupActions.updateGroup(id, false).then(refetch);
            }}
          >
            <IoMdClose />
          </button>
        )}

        {user?.admin && (
          <button
            className="border border-red-800 p-4 rounded-full text-red-800 text-xl"
            onClick={(e) => {
              e.preventDefault();
              groupActions.deleteGroup(id).then(refetch);
            }}
          >
            <AiOutlineDelete />
          </button>
        )}
      </div>
    </a>
  );
};

export const Home = () => {
  const { data, isFetching, refetch } = useQuery(["groups"], () =>
    groupActions.getGroups()
  );

  return (
    <div className="text-center">
      <h1 className="mt-20 text-3xl mb-4">Yazılım Mühendisliği için Gruplar</h1>
      <h4 className="text-gray-600">
        Aşağıdaki listede bulunan gruplardan size uygun olana katılabilirsiniz.
      </h4>
      <div className="flex flex-col gap-6 mt-8 p-6 bg-slate-300 w-3/5 mx-auto rounded-xl">
        <form className="flex w-2/3 mx-auto my-4">
          <Input
            type="text"
            className="flex-1 rounded-r-none"
            placeholder="https://chat.whatsapp.com/*"
            pattern="(https:\/\/chat\.whatsapp\.com\/)\w+"
          />
          <Button className="w-12 min-w-min rounded-l-none">+</Button>
        </form>
        {isFetching && "Gruplar yükleniyor..."}
        {!isFetching &&
          data?.data?.data?.Groups?.map((group, idx) => (
            <Group
              id={group.id}
              title={group.group_name}
              link={group.link}
              verified={group.is_verified}
              key={group.id}
              refetch={refetch}
            />
          ))}
      </div>
    </div>
  );
};
