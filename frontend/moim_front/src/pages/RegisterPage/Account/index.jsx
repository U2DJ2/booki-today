import React, { useState, useEffect } from "react";
import AuthTitle from "../../../components/Authentification/AuthTitle";

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/;

function Account({ email, setEmail, password, setPassword, setActiveNext }) {
  const [clicked, setClicked] = useState(false);
  const [validationEmail, setValidationEmail] = useState(true);
  const [validationPassword, setValidationPassword] = useState(true);

  const emailHandler = (e) => {
    //setEmailDuplication(false);
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (email && !emailPattern.test(email)) setValidationEmail(false);
    else setValidationEmail(true);

    if (password && !passwordPattern.test(password))
      setValidationPassword(false);
    else setValidationPassword(true);
  }, [email, password]);

  useEffect(() => {
    if (email && password && validationEmail && validationPassword)
      setActiveNext(true);
    else setActiveNext(false);
  }, [email, password, validationEmail, validationPassword]);

  return (
    <div className="flex flex-col w-100 gap-16 max-sm:text-center">
      <AuthTitle
        className="flex flex-col w-full "
        title={"Register"}
        firstContent={"모임 투데이에 온 것을 환영합니다!"}
        secondContent={"회원가입을 위해 이메일과 비밀번호를 입력해주세요."}
        titleColor={"white"}
        contentColor={"white"}
      />
      <div className="flex flex-col gap-12  max-sm:px-10">
        <div className=" gap-1 max-sm:flex max-sm:flex-col max-sm:items-start ">
          <p className=" font-Pretendard_Black block text-2xl text-white max-sm:text-xl">
            Email
          </p>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="enter your email"
            className={`border-b border-white font-Pretendard_Light text-white text-2xl pt-2 pb-2 bg-scarlet focus:outline-none w-full block placeholder:text-white max-sm:text-xl `}
            value={email}
            onChange={emailHandler}
          />
          <p
            className={`mt-2 text-xl font-medium font-Pretendard_Light max-sm:text-xs ${
              !validationEmail ? "text-white" : "text-scarlet"
            } ${validationEmail && email ? "hidden" : "block"}`}
          >
            이메일 형식이 잘못되었습니다.
          </p>
        </div>
        <div className="gap-1 max-sm:flex max-sm:flex-col max-sm:items-start">
          <p className=" font-Pretendard_Black block text-2xl text-white max-sm:text-xl">
            Password
          </p>
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="enter your password"
            className={`border-b border-white font-Pretendard_Light text-white text-2xl pt-2 pb-2 bg-scarlet focus:outline-none w-full block placeholder:text-white max-sm:text-xl `}
            value={password}
            onChange={passwordHandler}
          />
          <p
            className={`mt-2 text-xl font-medium font-Pretendard_Light max-sm:text-xs ${
              !validationPassword ? "text-white" : "text-scarlet"
            } ${validationPassword && password ? "hidden" : "block"}`}
          >
            영문, 특수기호, 숫자를 포함해 6자리 이상 입력해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Account;
