import { create } from "zustand";
import { persist } from "zustand/middleware";

import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      users: [],
      isUsersLoading: false,
      isMessagesLoading: false,
      selectedUser: null,

      getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const res = await axiosInstance.get("/message/get-all-chats");

          set({ users: res.data.message });
        } catch (error) {
          toast.error(error.response?.data.message);
        } finally {
          set({ isUsersLoading: false });
        }
      },

      getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
          const res = await axiosInstance.get(`/message/get-message/${userId}`);
          set({ messages: res.data.message });
        } catch (error) {
          toast.error(error.response?.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      sendMessage: async (messageData) => {
        const { selectedUser } = get();
        try {
          set((state) => ({
            messages: [
              ...state.messages,
              {
                receiverId: selectedUser._id,
                senderId: useAuthStore.getState().authUser._id,
                text: messageData.text,
              },
            ],
          }));

          const res = await axiosInstance.post(
            `/message/send/${selectedUser._id}`,
            messageData
          );

          console.log(res.data);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

      subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        if (!socket || !socket.connected) {
          console.warn("Socket not available or not connected yet.");
          return;
        }

        socket.on("newMessage", (newMessage) => {
          const isMessageSentFromSelectedUser =
            newMessage.senderId === selectedUser._id;
          if (!isMessageSentFromSelectedUser) return;

          set({
            messages: [...get().messages, newMessage],
          });
        });
      },

      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;

        if (!socket || !socket.connected) {
          console.warn("Socket not available or not connected yet.");
          return;
        }

        socket.off("newMessage");
      },

      setSelectedUser: (selectedUser) => set({ selectedUser }),
    }),

    {
      name: "chat-selected-user",
      partialize: (state) => ({ selectedUser: state.selectedUser }),
    }
  )
);
