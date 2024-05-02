import React from "react";
import AuthTitle from "../../../components/Authentification/AuthTitle";

function School({
  setDepartment,
  department,
  setStudentId,
  studentId,
  universityName,
  setActiveNext,
}) {
  const departmentHandler = (e) => {
    setDepartment(e.target.value);
    checkInputsFilled(e.target.value, studentId);
  };

  const studentIdHandler = (e) => {
    setStudentId(e.target.value);
    checkInputsFilled(department, e.target.value);
  };

  const checkInputsFilled = (departmentValue, studentIdValue) => {
    // 학과와 학번이 모두 채워졌는지 확인
    if (departmentValue.trim() !== "" && studentIdValue.trim() !== "") {
      setActiveNext(true); // 모두 입력되면 setActiveNext를 true로 설정
    } else {
      setActiveNext(false); // 둘 중 하나라도 비어있으면 setActiveNext를 false로 설정
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <AuthTitle
        title={"School"}
        firstContent={"이제 두번째 단계입니다."}
        secondContent={"학교 관련 정보를 입력해주세요."}
        titleColor={"white"}
        contentColor={"white"}
      />
      <div className="flex flex-col gap-12">
        <div className="gap-1">
          <p className=" font-Pretendard_Black block text-xl text-white">
            학교명
          </p>
          <p className="border-b border-white font-Pretendard_Light text-gray-300 text-xl pt-2 pb-2 bg-scarlet focus:outline-none w-full block placeholder:text-white">
            {universityName}
          </p>
        </div>
        <div className="gap-1">
          <p className=" font-Pretendard_Black block text-xl text-white">
            학과
          </p>
          <input
            type="text"
            name="departmentId"
            autoComplete="off"
            placeholder="학과명을 입력해주세요."
            className={`border-b border-white font-Pretendard_Light text-white text-xl pt-2 pb-2 bg-scarlet focus:outline-none w-full block placeholder:text-white `}
            value={department}
            onChange={departmentHandler}
          />
        </div>
        <div className="gap-1">
          <p className=" font-Pretendard_Black block text-xl text-white">
            학번
          </p>
          <input
            type="number"
            name="studentId"
            autoComplete="off"
            placeholder="학번을 입력해주세요."
            className={`border-b border-white font-Pretendard_Light text-white text-xl pt-2 pb-2 bg-scarlet focus:outline-none w-full block placeholder:text-white `}
            value={studentId}
            onChange={studentIdHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default School;
