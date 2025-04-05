import { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

const MessageArea = () => {
  const {
    messages,
    isMessagesLoading,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    selectedUser,
  } = useChatStore();

  const messageEndRef = useRef(null);

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="absolute top-0 w-full h-[calc(100%-5rem)] px-10 py-5 flex items-center justify-center">
        <span className="loading-spinner"></span>
      </div>
    );

  return (
    <div className="absolute top-0 w-full h-[calc(100%-5rem)] overflow-y-scroll overflow-x-hidden px-5 sm:px-10 md:px-20 py-5">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${
            message.senderId === authUser._id ? "chat-end" : "chat-start"
          }`}
          ref={messageEndRef}
        >
          <div className="chat-header">
            {message.senderId === authUser._id
              ? authUser.fullname
              : selectedUser.fullname}
          </div>
          <div
            className={`chat-bubble max-w-52 md:max-w-96 break-words whitespace-pre-wrap ${
              message.senderId === authUser._id
                ? "chat-bubble-primary"
                : "chat-bubble-neutral"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageArea;
