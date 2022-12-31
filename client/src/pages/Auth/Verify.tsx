import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Button";
import { authActions } from "src/service/auth";
import toast from "react-hot-toast";
import OtpInput from "react18-input-otp";

export const Verify = () => {
  const [otp, setOtp] = React.useState("");
  const [timer, setTimer] = React.useState(180);
  const navigate = useNavigate();

  const url = new URL(window.location.href).search;
  const params = new URLSearchParams(url);
  const email = params.get("email");

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    if (timer < 0 || !email) window.location.replace("/login");
  }, [timer, email]);

  const onSubmit = (
    e: React.SyntheticEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!email) return toast.error("E-posta bulunamadı");

    authActions
      .verify({
        code: otp,
        email,
      })
      .then(() => {
        toast.success("Doğrulama işlemi başarılı!");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch(() => toast.error("Geçersiz doğrulama kodu!"));
  };

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl font-bold mb-8">Doğrulama Kodu Gönderildi</h2>
      <h4 className="text-xl mb-12 tracking-wider text-gray-600">
        Lütfen mail adresinize gelen doğrulama kodunu giriniz.
      </h4>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <div className="flex justify-center" id="verify-wrapper">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              separator={<span className="mx-2">-</span>}
              inputStyle={{
                height: "50px",
                width: "50px",
                border: "1px solid gray",
                borderRadius: "6px",
              }}
              placeholder="******"
              shouldAutoFocus
            />
          </div>
          <div className="my-2 flex justify-between text-primary font-semibold">
            <div />
            <div className="text-lg">
              Kalan süre: <span className="font-thin">{timer}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/3 mx-auto">
          <Button onSubmit={onSubmit} type="submit" className="mt-10">
            Doğrula
          </Button>
        </div>
      </form>
    </div>
  );
};
