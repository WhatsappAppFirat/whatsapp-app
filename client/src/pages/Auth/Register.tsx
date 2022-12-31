import React from "react";
import { useNavigate } from "react-router-dom";
import { MdMail, MdLock } from "react-icons/md";
import { AiFillIdcard } from "react-icons/ai";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import { authActions } from "src/service/auth";

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const onSubmit = (
    e: React.SyntheticEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (password !== password2) return alert("Şifreler eşleşmemektedir!");
    authActions
      .register({ name, email, password })
      .then(() => navigate(`/verify?email=${email}`));
  };

  return (
    <div className="flex flex-col justify-center items-center text-center w-2/5">
      <h2 className="text-4xl font-bold mb-5">Kayıt Ol</h2>

      <form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <label
            className="flex items-center gap-2 font-bold text-lg"
            htmlFor="email"
          >
            <AiFillIdcard className="text-primary" />
            Ad Soyad
          </label>
          <Input
            onChange={(e) => setName(e.target.value)}
            name="email"
            type="text"
            placeholder="Üniversite Eposta"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="flex items-center gap-2 font-bold text-lg"
            htmlFor="email"
          >
            <MdMail className="text-primary" />
            E-Posta
          </label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Üniversite Eposta"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="flex items-center gap-1 font-bold text-lg"
            htmlFor="password"
          >
            <MdLock className="text-primary" />
            Şifre
          </label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Şifre"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="flex items-center gap-1 font-bold text-lg"
            htmlFor="password"
          >
            <MdLock className="text-primary" />
            Şifre Doğrula
          </label>
          <Input
            onChange={(e) => setPassword2(e.target.value)}
            name="password"
            placeholder="Şifre"
            type="password"
            required
          />
        </div>
        <div className="flex flex-col w-2/3 mx-auto text-center">
          <Button type="submit" onSubmit={onSubmit} className="mt-10">
            Kayıt Ol
          </Button>
          <Button
            type="button"
            className="mt-6"
            onClick={() => navigate("/login")}
            outline
          >
            Giriş Yap
          </Button>
        </div>
      </form>
    </div>
  );
};
