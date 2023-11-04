import React, { useState } from "react";
import { RiHome2Line, RiInformationLine, RiContactsLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HamburgerMenu } from "./HamburgerMenu";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

function NavBar() {
  const [SearchItem, setSearchItem] = useState("");
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { triggerYouTubePlayPause } = useContext(AppContext);
  const [PrevSearchItem, setPrevSearchItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = (e) => {
    if (
      !(
        e.target === document.querySelector(".BtnSubmit") ||
        e.target === document.querySelector(".BtnSearch") ||
        e.target === document.querySelector("input")
      )
    ) {
      setIsSearchActive(false);
    }
  };

  const handleSearchItem = (e) => {
    e.preventDefault();
    console.log("SearchItem:" + SearchItem);
    console.log("PrwvSearch:" + PrevSearchItem);
    console.log("--------------------------");
    if (SearchItem && SearchItem !== PrevSearchItem) {
      console.log("SearchItem:" + SearchItem);
      console.log("PrwvSearch:" + PrevSearchItem);
      setPrevSearchItem(SearchItem);
      triggerYouTubePlayPause();
      navigate(`/listen/${SearchItem.replaceAll(" ", "-")}`);
    }
  };

  const changeHandler = (e) => {
    setSearchItem(e.target.value);
  };

  // Function to check if the current route matches the given path
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-[100vw] z-10 bg-[url('AppBG.png')] bg-contain sticky top-[0%] border-b border-[#ffffff1f] border-[1px]">
      <nav className="py-[1rem] px-[2.5rem]  w-[100vw] z-10 bg-[url('AppBG.png')] bg-contain sticky top-[0%] border-b border-[#ffffff1f] border-[1px]">
        <div className="hidden md:flex justify-between items-center Para">
          <div className="relative flex items-center">
            <form
              onSubmit={handleSearchItem}
              onClick={handleSearchClick}
              className={`transition-all duration-1500 ${
                isSearchActive ? "w-[50vw] md:w-[60vw]" : "w-[40px]"
              }`}
            >
              <input
                type="text"
                placeholder={`${isSearchActive ? "Search Instrumental" : ""}`}
                className="p-2 pr-8 rounded-full bg-[#242424] text-white w-[100%]"
                onBlur={handleSearchBlur}
                onChange={changeHandler}
                value={SearchItem}
              />
              <button
                type="submit"
                className="absolute BtnSubmit right-2 top-1/2 transform -translate-y-1/2 text-white"
              >
                <BiSearch className="w-6 h-6 BtnSearch" />
              </button>
            </form>
          </div>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={` text-white  hover:transition-all hover:text-[#E55857] ${
                  isActiveRoute("/") ? "text-[#EF5350]" : ""
                }`}
              >
                <RiHome2Line className="" />
                <span className="hidden lg:block">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={`text-white hover:transition-all hover:text-[#E55857] ${
                  isActiveRoute("/about") ? "text-[#EF5350]" : ""
                }`}
              >
                <RiInformationLine className="" />
                <span className="hidden lg:block">About</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={`text-white  hover:transition-all hover:text-[#E55857] ${
                  isActiveRoute("/contact") ? "text-[#EF5350]" : ""
                }`}
              >
                <RiContactsLine className="" />
                <span className="hidden lg:block">Contact</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="mr-4 md:hidden">
          <GiHamburgerMenu
            onClick={() => setIsMenuModalOpen((prev) => !prev)}
            className={` fill-richblack-100 cursor-pointer `}
            fontSize={24}
          />

          <HamburgerMenu
            isMenuModalOpen={isMenuModalOpen}
            setIsMenuModalOpen={setIsMenuModalOpen}
          >
            <div className="flex flex-col gap-y-2 py-5 px-5">
              <div className="relative flex items-center">
                <form
                  onSubmit={handleSearchItem}
                  onClick={handleSearchClick}
                  className={`transition-all duration-1500 ${
                    isSearchActive ? "w-[50vw] md:w-[60vw]" : "w-[40px]"
                  }`}
                >
                  <input
                    type="text"
                    placeholder={`${
                      isSearchActive ? "Search Instrumental" : ""
                    }`}
                    className="p-2 pr-8 rounded-full bg-[#242424] text-white w-[100%]"
                    onBlur={handleSearchBlur}
                    onChange={changeHandler}
                    value={SearchItem}
                  />
                  <button
                    type="submit"
                    className="absolute BtnSubmit right-2 top-1/2 transform -translate-y-1/2 text-white"
                  >
                    <BiSearch className="w-6 h-6 BtnSearch" />
                  </button>
                </form>
              </div>

              {/* General Buttons */}
              <div className="h-[1px] my-2 bg-richblack-100 w-3/4 mx-auto"></div>


              <Link to={"/"} onClick={() => setIsMenuModalOpen(false)}>
                <div className={`flex gap-x-2 items-center w-full py-2 px-3 transition-all duration-500  ${isActiveRoute("/instruvibes") ? "text-[#EF5350]" : "" }`}>
                  <RiHome2Line className="text-lg" />
                  Home
                </div>
              </Link>

              <Link to={"/about"} onClick={() => setIsMenuModalOpen(false)}>
                <div className={`flex gap-x-2 items-center w-full py-2 px-3 ransition-all duration-500  ${isActiveRoute("/about") ? "text-[#EF5350]" : "" }`}>
                  <RiInformationLine className="text-lg" />
                  About Us
                </div>
              </Link>

              <Link to={"/contact"} onClick={() => setIsMenuModalOpen(false)}>
                <div className={`flex gap-x-2 items-center w-full py-2 px-3 ransition-all duration-500  ${isActiveRoute("/contact") ? "text-[#EF5350]" : "" }`}>
                  <RiContactsLine className="text-lg" />
                  Contact Us
                </div>
              </Link>

            </div>
          </HamburgerMenu>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
