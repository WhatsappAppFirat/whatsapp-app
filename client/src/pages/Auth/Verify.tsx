import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";

export const Verify = () => {
  const [timer, setTimer] = React.useState(180);
  const [code, setCode] = React.useState<number[]>(Array(6).fill(""));
  const navigate = useNavigate();

  console.log(timer);

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setTimer((t) => t - 1);
      if (timer === 0) {
        clearTimeout(timeout);
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberInput = +(e.currentTarget.getAttribute("name") as string);

    const newCode = code.map((c, idx) => {
      if (idx === numberInput - 1) return +e.target.value.slice(-1);
      return c;
    });

    setCode(newCode);

    const nextInput = document.querySelector<HTMLInputElement>(
      `input[name="${numberInput + 1}"]`
    );

    if (nextInput) nextInput.focus();
  };

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl font-bold mb-8">Doğrulama Kodu Gönderildi</h2>
      <h4 className="text-xl mb-12 tracking-wider text-gray-600">
        Lütfen mail adresinize gelen doğrulama kodunu giriniz.
      </h4>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="flex flex-row gap-4" id="verify-wrapper">
            {code.map((value, idx) => (
              <Input
                value={value}
                className="p-7 w-14 h-14 text-2xl text-center rounded-md"
                name={String(idx + 1)}
                type="number"
                placeholder="*"
                maxLength={1}
                onChange={onChange}
                key={idx}
              />
            ))}
          </div>
          <div className="my-2 flex justify-between text-primary font-semibold">
            <button className="text-lg">Kodu tekrar gönder</button>
            <div className="text-lg">
              Kalan süre: <span className="font-thin">{timer}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/3 mx-auto">
          <Button type="submit" className="mt-10">
            Doğrula
          </Button>
        </div>
      </form>
    </div>
  );
};
