import {
  UserHeader,
  ChatHeader,
  UsersSidebar,
  ChatContainer,
} from "../../components";
import { useMediaQuery } from "react-responsive";
import { useChatStore } from "../../store/useChatStore";
import { useParams } from "react-router";

const Chat = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const { userId } = useParams();

  if (isDesktop) {
    return (
      <div className="w-full h-screen grid grid-cols-[1fr_3fr]">
        <div className="h-screen w-full border-r-2 border-base-300 bg-base-100 flex flex-col">
          <UserHeader />
          <div className="px-5 py-5 h-full overflow-y-scroll">
            <UsersSidebar />
          </div>
        </div>
        {userId ? (
          <div className="h-screen w-full bg-base-200 flex flex-col">
            <ChatHeader />
            <div className="h-full overflow-y-hidden">
              <ChatContainer />
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex justify-center items-center bg-base-300">
            <span>Select a person from the sidebar to start chat</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      {!userId ? (
        <div className="h-screen w-full absolute z-0 bg-base-100 flex flex-col">
          <UserHeader />
          <div className="px-5 py-5 h-full overflow-y-scroll">
            <UsersSidebar />
          </div>
        </div>
      ) : (
        <div className="h-screen w-full absolute z-0 bg-base-200 flex flex-col">
          <ChatHeader />
          <div className="h-full overflow-y-hidden">
            <ChatContainer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
