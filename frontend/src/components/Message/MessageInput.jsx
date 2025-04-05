import { useState } from "react";
import { IoMdAdd, IoMdSend } from "react-icons/io";
import { useChatStore } from "../../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");

  const { sendMessage } = useChatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
      });

      // Clear form
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="h-20 w-full absolute bottom-0 ">
      <form
        className=" h-full flex items-center gap-3 justify-center px-5 sm:px-10 md:px-20"
        onSubmit={handleSubmit}
      >
        <input
          className="input w-full"
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="button" className="btn btn-square text-xl">
          <IoMdAdd />
        </button>
        <button type="submit" className="btn btn-square btn-primary text-xl">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
