import "./index.css";
import { MdMail, MdLock } from "react-icons/md";

function App() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex items-center justify-center">
        <form className="flex flex-col gap-6 w-2/4">
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1 font-bold" htmlFor="email">
              <MdMail className="text-primary" />
              E-Posta
            </label>
            <input
              name="email"
              type="text"
              placeholder="Üniversite Eposta"
              className="border border-gray px-2 py-1 rounded-full tracking-wide"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1 font-bold" htmlFor="password">
              <MdLock className="text-primary" />
              Şifre
            </label>
            <input
              name="password"
              type="password"
              placeholder="Şifre"
              className="border border-gray px-2 py-1 rounded-full  tracking-wider"
            />
          </div>
        </form>
      </div>
      <div className=" bg-primary">landing</div>
    </div>
  );
}

export default App;
