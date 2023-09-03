import React from "react";
import logo from "../assets/my_unsplash_logo.svg";
import { MdOutlineSearch } from "react-icons/md";

const Navbar = ({ clickFn }) => {
  return (
    <nav className="px-28 py-8 flex flex-col items-center justify-start sm:flex-col md:flex-row md:items-stretch">
      <img src={logo} alt="logo" className="mr-6" />
      <div className="flex-1 min-w-[calc(100vw-697px)] relative flex items-center">
        <MdOutlineSearch className=" text-[#BDBDBD] text-2xl absolute left-5" />
        <input
          type="text"
          placeholder="Search by name"
          className="w-[300px] px-5 py-4 placeholder:text-[#BDBDBD] text-bold font-medium border-[#BDBDBD] border rounded-xl focus:outline-none pl-14 text-sm"
        />
      </div>
      <button
        className="bg-[#3DB46D] text-white rounded-xl max-w-[137px] w-full text-center"
        onClick={() => clickFn()}
      >
        Add a photo
      </button>
    </nav>
  );
};

export default Navbar;
