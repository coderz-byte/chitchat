import { NavLink } from "react-router";
import pageNotFound from "../assets/images/pageNotFound.png";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center p-5">
      <div className="text-center -mt-16">
        <img src={pageNotFound} alt="" className="w-2xl" />
        <span>
          Page you are looking for are not found go to
          <NavLink to="/" className="link-info mt-5">
            Home
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default PageNotFound;
