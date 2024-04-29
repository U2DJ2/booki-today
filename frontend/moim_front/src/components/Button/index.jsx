import React from "react";
import { useNavigate } from "react-router";

function Button({ name, textColor, bgColor, btnType, onClick }) {
  const navigation = useNavigate();

  return (
    <button
      className={`w-52 justify-center px-7 py-5 text-[22px] font-bold text-center text-${textColor} whitespace-nowrap bg-${bgColor} rounded-[50px] font-Pretendard_Black font-black hover:cursor-pointer hover:bg-black`}
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
}

export default Button;
