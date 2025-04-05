import { create } from "zustand";
import { io } from "socket.io-client";

import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSingingUp: false,
  isLoggingUp: false,
  isCheackingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/profile");

      set({ authUser: res.data.message });

      setTimeout(() => {
        get().connectSocket();
      }, 100);
    } catch (error) {
      console.log("Error in checking auth");
      set({ authUser: null });
    } finally {
      set({ isCheackingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSingingUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data.message });
      toast.success("Account created successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      set({ isSingingUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingUp: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data.message });
      toast.success("Login successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      set({ isLoggingUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    console.log();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
