import { useEffect, useState } from "react";
import CardComponent from "../CardComponent";
import SimpleDrop from "../../../components/Dropdown/Simple";
import { useNavigate } from "react-router";
import { GET, POST } from "../../../utils/axios";
import CreationModal from "../../../components/CreationModal";
import { fetchMeetings } from "../../../api/moim";
import { fetchNotices } from "../../../api/moim";
import AlertModal from "../../../components/NewModal";

function MoimHome({ isHost, moimId }) {
  const [showModal, setShowModal] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [meetingOption, setMeetingOption] = useState("UPCOMING");

  const [meetings, setMeetings] = useState([]);

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [open, setOpen] = useState(false);
  const [notices, setNotices] = useState([]);

  const navigate = useNavigate();

  const onSelect = (option) => {
    console.log(option);
    if (option === "다가오는 미팅") {
      setMeetingOption("UPCOMING");
    } else if (option === "지나간 미팅") {
      setMeetingOption("PAST");
    } else {
      setMeetingOption("ALL");
    }
  };

  const cardClickHandler = (noticeId) => {
    navigate(`notice/${noticeId}`);
  };

  const makeNoticeHandler = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };
  const makeMeetingHandler = () => {
    navigate(`/meeting/${moimId}`);
  };
  const postNotice = async () => {
    const data = {
      moimId: moimId,
      title: noticeTitle,
      contents: noticeContent,
    };

    await POST("api/moims/notices", data)
      .then((res) => {
        getNotices();
      })
      .catch((e) => {
        setAlertMessage(e.response.data.message);
        setAlertOpen(true);
        console.log(e);
      });
  };
  const getNotices = async () => {
    try {
      const result = await fetchNotices(moimId);
      setNotices(result.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getMeetings = async () => {
    try {
      const result = await fetchMeetings(moimId, meetingOption);
      setMeetings(result.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onNoticePost = () => {
    postNotice();
  };

  const meetingCardHandler = (meetingId) => {
    navigate(`/meeting/${moimId}/${meetingId}`);
  };

  useEffect(() => {
    getMeetings();
    getNotices();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMeetings();

    // eslint-disable-next-line
  }, [meetingOption]);

  return (
    <>
      <AlertModal
        show={isAlertOpen}
        size="sm"
        onClose={() => setAlertOpen(false)}
      >
        <div className="text-sm font-Pretendard_Light">{alertMessage}</div>
        <div className="flex justify-center pt-4">
          <button
            className="py-3 px-5 w-fit text-base font-Pretendard_Normal text-white bg-scarlet rounded-[50px] hover:cursor-pointer"
            onClick={() => {
              setAlertOpen(false);
            }}
          >
            확인
          </button>
        </div>
      </AlertModal>
      <div className="flex flex-col gap-24">
        <div className="grid gap-4">
          <div className="flex gap-4 text-center items-center">
            <div className="text-3xl font-Pretendard_Black ">공지사항</div>
            {isHost ? (
              <button
                onClick={makeNoticeHandler}
                className="hover:cursor-pointer bg-black text-white rounded-full h-fit px-4 py-1 font-Pretendard_Light hover:bg-scarlet"
              >
                공지사항 생성하기
              </button>
            ) : null}
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices.length !== 0 ? (
              notices.map((notice, index) => (
                <CardComponent
                  key={index}
                  month={notice.month}
                  day={notice.day}
                  dayOfWeek={notice.dayOfWeek}
                  title={notice.title}
                  btn={false}
                  isMeeting={false}
                  joinPossible={false}
                  joinAvailability={null}
                  clickHandler={() => cardClickHandler(notice.moimNoticeId)}
                />
              ))
            ) : (
              <div className="font-Pretendard_Light flex">
                공지사항이 없습니다.
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="pb-8">
            <div className="flex items-center gap-4 pb-4">
              <div className="text-3xl font-Pretendard_Black font-semibold">
                미팅 확인하기
              </div>
              {isHost ? (
                <button
                  onClick={makeMeetingHandler}
                  className="hover:cursor-pointer bg-black text-white rounded-full h-fit px-4 py-1 font-Pretendard_Light hover:bg-scarlet"
                >
                  미팅 생성하기
                </button>
              ) : null}
            </div>

            <SimpleDrop
              options={["다가오는 미팅", "지나간 미팅"]}
              onSelect={onSelect}
            />
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetings.length != 0 ? (
              meetings.map((meeting, index) => (
                <CardComponent
                  key={index}
                  date={meeting.date}
                  startDate={meeting.startDate}
                  dday={meeting.dDay}
                  title={meeting.agenda}
                  attendance={meeting.attendance}
                  joinAvailability={meeting.joinAvailability}
                  btn={false}
                  isMeeting={true}
                  isPossible={true}
                  meetingId={meeting.meetingId}
                  clickHandler={() => meetingCardHandler(meeting.meetingId)}
                />
              ))
            ) : (
              <div className="font-Pretendard_Light flex">
                생성된 미팅이 없습니다.
              </div>
            )}
          </div>
        </div>
        {showModal && (
          <CreationModal
            isMeeting={false}
            showModal={showModal}
            setShowModal={setShowModal}
            closeHandler={onNoticePost}
          >
            <div className="font-Roboto_Bold text-3xl pb-8">공지사항</div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start justify-center mx-auto gap-4">
                <div className="gird gap-3">
                  <div className=" font-Pretendard_Black text-xl text-start">
                    제목
                  </div>
                  <input
                    className=" font-Pretendard_Light border p-4 focus:outline-none"
                    placeholder="제목을 입력해주세요"
                    onChange={(e) => {
                      setNoticeTitle(e.target.value);
                    }}
                  />
                </div>

                <div className="grid gap-1">
                  <div className="font-Pretendard_Black text-xl text-start">
                    내용
                  </div>
                  <input
                    className="font-Pretendard_Light border p-4 focus:outline-none"
                    placeholder="내용을 입력해주세요"
                    onChange={(e) => {
                      setNoticeContent(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </CreationModal>
        )}
      </div>
    </>
  );
}

export default MoimHome;
