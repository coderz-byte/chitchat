import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useNavigate, useParams } from "react-router";

const UserSkeleton = () => {
  const items = new Array(8).fill(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((i, idx) => (
        <div key={idx} className="w-full flex items-center gap-2 p-1">
          <div tabIndex={0} className="avatar">
            <div className="skeleton bg-base-300 text-neutral-content w-14 rounded-full"></div>
          </div>
          <div className="flex gap-2 flex-col w-full">
            <div className="skeleton bg-base-300 w-1/2 h-5 rounded-md"></div>
            <div className="skeleton bg-base-300 w-full h-5 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const UsersSidebar = () => {
  const { users, getUsers, isMessagesLoading } = useChatStore();

  const { setSelectedUser } = useChatStore();

  const { userId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isMessagesLoading) {
    return <UserSkeleton />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {users.map((user, idx) => (
          <div
            key={idx}
            className={`w-full flex items-center gap-2 px-3 ${
              // user._id === selectedUser?._id
              user._id === userId
                ? "bg-neutral text-neutral-content hover:bg-neutral-950"
                : "hover:bg-base-200"
            }  cursor-pointer py-3 rounded-2xl`}
            role="button"
            onClick={() => {
              navigate(`/chat/${user._id}`);
              setSelectedUser(user);
            }}
          >
            <div
              tabIndex={0}
              className={`avatar ${!user.profilePic && "avatar-placeholder"}`}
            >
              <div className="bg-accent text-accent-content w-10 lg:w-14 rounded-full">
                {user.profilePic ? (
                  <img src={user.profilePic} alt="profilepic" />
                ) : (
                  <span className="text-md font-bold">
                    {String(user.fullname).charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 flex-col w-full">
              <div className="font-semibold ">{user.fullname}</div>
              <div className="font-medium text-gray-400 text-sm">
                {user.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersSidebar;
