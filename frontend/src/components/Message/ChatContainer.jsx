import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  return (
    <div className="relative h-full">
      <MessageArea />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
