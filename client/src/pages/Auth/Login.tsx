import React from "react";
import { useNavigate } from "react-router-dom";
import { MdMail, MdLock } from "react-icons/md";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-center w-2/5">
      <h2 className="text-4xl font-bold mb-5">Giriş Yap</h2>
      <h4 className="text-xl mb-12 tracking-wider text-gray-600">
        Hızlıca giriş yap ve grubunu bul!
      </h4>

      <form className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-1">
          <label
            className="flex items-center gap-2 font-bold text-lg"
            htmlFor="email"
          >
            <MdMail className="text-primary" />
            E-Posta
          </label>
          <Input name="email" type="text" placeholder="Üniversite Eposta" />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="flex items-center gap-1 font-bold text-lg"
            htmlFor="password"
          >
            <MdLock className="text-primary" />
            Şifre
          </label>
          <Input name="password" type="password" placeholder="Şifre" />
        </div>
        <div className="flex flex-col w-2/3 mx-auto text-center">
          <Button type="submit" className="mt-10" onClick={() => navigate("/")}>
            Giriş Yap
          </Button>
          <Button
            type="button"
            className="mt-6"
            onClick={() => navigate("/register")}
            outline
          >
            Kayıt Ol
          </Button>
        </div>
      </form>
    </div>
  );
};
