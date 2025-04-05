import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router";

import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <div className="navbar justify-between bg-base-100 px-5">
      <div className="flex flex-1 items-center gap-1">
        <div className="flex gap-1">
          {isMobile && (
            <div>
              <NavLink to="/chat">
                <button className="btn btn-sm btn-ghost rounded-full">
                  <FaArrowLeft />
                </button>
              </NavLink>
            </div>
          )}
          <div
            tabIndex={0}
            className={`avatar ${
              !selectedUser?.profilePic && "avatar-placeholder"
            }`}
          >
            <div className="bg-accent text-accent-content w-9 rounded-full">
              {selectedUser?.profilePic ? (
                <img src={selectedUser?.profilePic} alt="profilepic" />
              ) : (
                <span className="text-md font-bold">
                  {String(selectedUser?.fullname).charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-600 text-sm sm:text-md">
            {selectedUser?.fullname}
          </span>
          <span className="font-medius text-gray-600 text-xs sm:text-sm">
            {selectedUser?.email}
          </span>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <button className="btn btn-square btn-ghost rounded-full text-lg">
            <HiOutlineDotsVertical />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a>Demo1</a>
            </li>
            <li>
              <a>Demo2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
