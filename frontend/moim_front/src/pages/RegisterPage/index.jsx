// React
import { useState } from "react";
import { useNavigate } from "react-router";

// API
import axios from "axios";

// Components
import AuthRight from "../../components/AuthRight";
import Modal from "../../components/Modal/ModalTest.jsx";

// Pages
import Account from "./Account";
import AuthCheck from "./AuthCheck";
import School from "./School";
import Personal from "./Personal";
import TimeTable from "./TimeTable";
import Congrats from "./Congrats";

import NewModal from "../../components/NewModal";

axios.defaults.withCredentials = true; // withCredentials 전역 설정

function RegisterPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [activeNext, setActiveNext] = useState(false);

  const [universityName, setUniversityName] = useState("");
  const [emailDuplication, setEmailDuplication] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  const [schoolValidation, setSchoolValidation] = useState(false);
  const [emailAuth, setEmailAuth] = useState(false);
  const [department, setDepartment] = useState("");

  /* register form data */
  const [universityId, setUniversityId] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [everytimeUrl, setEverytimeUrl] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const client = axios.create({
    baseURL: "https://api.moim.today/",
    withCredentials: true,
  });

  const emailBody = {
    email: email,
  };

  const userData = {
    universityId: universityId,
    departmentId: departmentId,
    email: email,
    password: password,
    username: username,
    studentId: studentId,
    birthDate: birthDate,
    gender: gender,
  };

  const everytimeInfo = {
    everytimeUrl: everytimeUrl,
    startDate: startDate,
    endDate: endDate,
  };

  const nextClick = async () => {
    if (step === 0) {
      //check email validity
      client
        .post("api/certification/email", emailBody)
        .then((res) => {
          setStep(step + 1);
          console.log(res);
        })
        .catch((error) => {
          setMessage(error.response.data.message);
          setIsOpen(true);
        });
    } else if (step === 1) {
      client
        .post("api/certification/email/complete", emailBody)
        .then((res) => {
          console.log(res);
          console.log(res.status);
          setUniversityName(res.data.universityName);
          setUniversityId(res.data.universityId);
          console.log(setUniversityId);
          setStep(step + 1);
        })
        .catch((error) => {
          setIsOpen(true);
          setMessage(error.response.data.message);
        });
    } else if (step === 3) {
      client
        .post("api/sign-up", userData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setStep(step + 1);
        })
        .catch((error) => {
          console.log(error);
          setIsOpen(true);
          setMessage(error.response.data.message);
        });
    } else if (step === 5) {
      client
        .post("api/schedules/timetable", everytimeInfo, {
          withCredentials: true,
        })

        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch((error) => {
          setIsOpen(true);
          console.log(error);
          setMessage(error.response.data.message);
        });
    } else {
      setStep(step + 1);
      setActiveNext(false);
    }
  };

  const previousClick = () => {
    if (step === 0) navigate(-1);
    else setStep(step - 1);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden relative pl-40 bg-scarlet max-xl:pl-0 max-xl:justify-center ">
      <div className="flex w-fit justify-center items-center ">
        <div className="flex flex-1 flex-col items-start justify-center w-96 gap-8 max-xl:justify-center max-sm:items-center ">
          {step === 0 ? (
            <Account
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setActiveNext={setActiveNext}
            />
          ) : step === 1 ? (
            <AuthCheck
              setEmailAuth={setEmailAuth}
              setActiveNext={setActiveNext}
            />
          ) : step === 2 ? (
            <School
              universityId={universityId}
              universityName={universityName}
              studentId={studentId}
              setStudentId={setStudentId}
              department={department}
              setDepartment={setDepartment}
              setActiveNext={setActiveNext}
              setDepartmentId={setDepartmentId}
              departmentId={departmentId}
            />
          ) : step === 3 ? (
            <Personal
              username={username}
              setUserName={setUserName}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
              gender={gender}
              setGender={setGender}
              setActiveNext={setActiveNext}
            />
          ) : step === 4 ? (
            <Congrats
              setStep={setStep}
              step={step}
              setActiveNext={setActiveNext}
            />
          ) : (
            <TimeTable
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setEverytimeUrl={setEverytimeUrl}
              everytimeUrl={everytimeUrl}
            />
          )}

          {step !== 4 && step != 5 && (
            <div className="flex justify-center mt-16">
              <div className="flex gap-8">
                <button
                  className={` w-44 justify-center px-7 py-5 text-[22px] font-bold text-center text-black bg-white whitespace-nowrap rounded-[50px] font-Pretendard_Black hover:cursor-pointer max-sm:w-28 max-sm:text-lg `}
                  onClick={() => previousClick()}
                >
                  이전
                </button>
                <button
                  className={` w-44 justify-center px-7 py-5 text-[22px] font-bold text-center bg-white whitespace-nowrap rounded-[50px] font-Pretendard_Black hover:cursor-pointer max-sm:w-28 max-sm:text-lg  ${
                    activeNext ? " text-scarlet  " : " text-[#8D8D8D]  "
                  }`}
                  disabled={!activeNext}
                  onClick={() => nextClick()}
                >
                  다음
                </button>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="flex justify-center mt-16 max-sm:mt-4">
              <div className="flex gap-8">
                <button
                  className={`w-44 justify-center px-7 py-5 text-xl font-bold text-slate-400  bg-white whitespace-nowrap rounded-[50px] font-Pretendard_Black hover:cursor-pointer max-sm:w-40  `}
                  onClick={() => navigate("/")}
                >
                  건너뛰기
                </button>
                <button
                  className={`w-44 justify-center px-7 py-5 text-xl font-bold text-center  bg-white whitespace-nowrap rounded-[50px] font-Pretendard_Black hover:cursor-pointer ${
                    activeNext ? "text-scarlet " : " text-[#8D8D8D]"
                  }`}
                  disabled={!activeNext}
                  onClick={() => nextClick()}
                >
                  다음
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <AuthRight cardColor={"white"} textColor={"scarlet"} />
      <NewModal show={isOpen} size="sm" onClose={() => setIsOpen(false)}>
        <div className="text-sm font-Pretendard_Light">{message}</div>
      </NewModal>
    </div>
  );
}

export default RegisterPage;
