import React, { useState, useEffect } from "react";
import MoimContainer from "../../components/PageContainer/MoimContainer";
import DetailedLeft from "../../components/DetailedLeft";
import MoimHome from "./MoimHome";
import AvailableTime from "./AvailableTime";
import ToDo from "./ToDo";
import Member from "./Member";
import Modal from "../../components/Modal/ModalTest";
import { useParams } from "react-router";

import { fetchMeetings, fetchMoimInfo, fetchNotices } from "../../api/moim";

function MoimJoinPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("HOME");

  const [meetingOption, setMeetingOption] = useState("ALL");

  const [notices, setNotices] = useState([]);
  const [moimInfo, setMoimInfo] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const { MoimId } = useParams();

  const getNotices = async () => {
    try {
      const result = await fetchNotices(MoimId);
      setNotices(result.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getInfo = async () => {
    try {
      const result = await fetchMoimInfo(MoimId);
      setMoimInfo(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getMeetings = async () => {
    try {
      const result = await fetchMeetings(MoimId, meetingOption);
      console.log(result.data.data);
      setMeetings(result.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotices();
    getMeetings();
    getInfo();
  }, []);
  return (
    <MoimContainer>
      <DetailedLeft
        userName={"김유림"}
        title={moimInfo.title}
        currentCount={moimInfo.currentCount}
        capacity={moimInfo.capacity}
        category={moimInfo.category}
        contents={moimInfo.contents}
        image={moimInfo.imageUrl}
        joined={true}
      />
      <div className="flex flex-col basis-4/5 bg-white shadow-[0px_4px_12px_rgba(0,_0,_0,_0.06)] overflow-hidden rounded-3xl px-24 pb-6 gap-8 min-h-[600px] h-fit">
        <div className="flex justify-center items-center self-start font-Pretendard_Medium font-normal text-black max-md:px-5 max-md:max-w-full">
          <div className="flex gap-12 font-semibold font-Roboto lg:text-xl lg:gap-8 xl:text-3xl 2xl:text-4xl">
            <div
              className={`justify-center max-md:px-5 cursor-pointer ${
                selected === "HOME"
                  ? "text-scarlet border-b-2 border-scarlet"
                  : ""
              }`}
              onClick={() => setSelected("HOME")}
            >
              HOME
            </div>
            <div
              className={`justify-center  max-md:px-5 cursor-pointer ${
                selected === "되는시간"
                  ? "text-scarlet border-b-2 border-scarlet"
                  : ""
              }`}
              onClick={() => setSelected("되는시간")}
            >
              되는시간
            </div>
            <div
              className={`justify-center max-md:px-5 cursor-pointer ${
                selected === "ToDo"
                  ? "text-scarlet border-b-2 border-scarlet"
                  : ""
              }`}
              onClick={() => setSelected("ToDo")}
            >
              ToDo
            </div>
            <div
              className={`justify-center max-md:px-5 cursor-pointer ${
                selected === "멤버"
                  ? "text-scarlet border-b-2 border-scarlet"
                  : ""
              }`}
              onClick={() => setSelected("멤버")}
            >
              멤버
            </div>
          </div>
        </div>
        {selected === "HOME" ? (
          <MoimHome
            notices={notices}
            meetings={meetings}
            meetingOption={meetingOption}
            setMeetingOption={setMeetingOption}
          />
        ) : selected === "되는시간" ? (
          <AvailableTime />
        ) : selected === "ToDo" ? (
          <ToDo />
        ) : selected === "멤버" ? (
          <Member />
        ) : null}
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setMessage={setMessage}
        message={message}
      />
    </MoimContainer>
  );
}

export default MoimJoinPage;
