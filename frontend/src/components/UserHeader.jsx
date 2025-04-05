import { HiOutlineDotsVertical } from "react-icons/hi";
import { useAuthStore } from "../store/useAuthStore";

const ProfileDropDown = () => {
  const { authUser } = useAuthStore();
  return (
    <div className="py-3">
      <div>
        <div
          tabIndex={0}
          className={`avatar cursor-pointer ${
            !authUser?.profilePic && "avatar-placeholder"
          }`}
        >
          <div className="bg-neutral text-neutral-content w-9 rounded-full">
            {authUser?.profilePic ? (
              <img src={authUser?.profilePic} alt="profilepic" />
            ) : (
              <span className="text-md font-bold">
                {String(authUser?.fullname).charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-600">{authUser.fullname}</span>
        <span className="text-gray-400">{authUser.email}</span>
      </div>
    </div>
  );
};

const UserHeader = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="navbar bg-base-100 px-5">
      <div className="flex-1">
        <span className="text-2xl select-none font-bold text-gray-800">
          ChitChat
        </span>
      </div>

      {/* Dropdown */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className={`avatar cursor-pointer ${
              !authUser?.profilePic && "avatar-placeholder"
            }`}
          >
            <div className="bg-neutral text-neutral-content w-9 rounded-full">
              {authUser?.profilePic ? (
                <img src={authUser?.profilePic} alt="profilepic" />
              ) : (
                <span className="text-md font-bold">
                  {String(authUser?.fullname).charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu gap-1 bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <ProfileDropDown />
            </li>
            <li>
              <button
                className="btn btn-sm btn-soft btn-error"
                onClick={() => logout()}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
