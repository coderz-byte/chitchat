import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState("password");
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signup, isSingingUp } = useAuthStore();

  const validateForm = () => {
    if (!data.fullname.trim()) return toast.error("Full name is required");
    if (!data.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(data.email))
      return toast.error("Invalid email format");
    if (!data.password) return toast.error("Password is required");
    if (data.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success) signup(data);
    setData({ fullname: "", email: "", password: "" });
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleSignup}>
        <fieldset className="fieldset w-xs md:w-md">
          <legend className="fieldset-legend text-3xl font-bold text-gray-800 mb-8">
            Signup
          </legend>

          <label className="fieldset-label">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="enter your name"
            value={data.fullname}
            onChange={(e) => setData({ ...data, fullname: e.target.value })}
            required
          />

          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />

          <label className="fieldset-label">Password</label>

          <label className="input w-full">
            <input
              type={isPasswordVisible}
              placeholder="enter your password"
              minLength={6}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            <span
              role="button"
              className="cursor-pointer"
              onClick={() =>
                setIsPasswordVisible((priv) =>
                  priv === "password" ? "text" : "password"
                )
              }
            >
              {isPasswordVisible === "password" ? <FaEye /> : <FaEyeSlash />}
            </span>
          </label>

          <button
            type="submit"
            className={`btn btn-neutral mt-5 ${isSingingUp && "btn-disabled"}`}
          >
            {isSingingUp && <span className="loading loading-spinner"></span>}
            Signup
          </button>

          <div className="text-center">
            <span className="text-[0.94rem] font-semibold text-gray-600">
              Already have an account?
              <NavLink to="/login" className="link-info ml-1">
                Login
              </NavLink>
            </span>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
