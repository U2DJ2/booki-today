import { useState, useEffect, useMemo } from "react";
import MoimContainer from "../PageContainer/MoimContainer";
import DetailedLeft from "../DetailedLeft";
import { fetchMoimInfo } from "../../api/moim";
import { Outlet, useParams } from "react-router";
import axios from "axios";

function MoimLayout() {
  const [writerInfo, setWriterInfo] = useState([]);
  const [moimInfo, setMoimInfo] = useState([]);
  const { MoimId } = useParams();
  const memoMoimId = () => useMemo(() => [MoimId]);

  const fetchWriter = async () => {
    try {
      const response = await axios.get(
        `https://api.moim.today/api/members/host-profile/${MoimId}`
      );
      console.log(response);
      setWriterInfo(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getInfo = async () => {
    try {
      const result = await fetchMoimInfo(MoimId);
      console.log(result);
      setMoimInfo(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchWriter();
    getInfo();

    // eslint-disable-next-line
  }, []);

  return (
    <MoimContainer>
      <DetailedLeft
        userName={writerInfo.username}
        title={moimInfo.title}
        currentCount={moimInfo.currentCount}
        capacity={moimInfo.capacity}
        category={moimInfo.category}
        contents={moimInfo.contents}
        image={moimInfo.imageUrl}
        profileImg={writerInfo.memberProfileImageUrl}
        joined={true}
      />
      <div className="flex flex-col min-h-screen max-h-full w-full bg-white shadow-lg overflow-hidden rounded-t-3xl px-20 pt-8 pb-6 gap-8 max-sm:px-4">
        <Outlet />
      </div>
    </MoimContainer>
  );
}

export default MoimLayout;
