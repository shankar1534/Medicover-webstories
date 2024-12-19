import React, { useState } from "react";
import "../styles/header.css";
import { Icon } from "@iconify/react";
import User from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Header = ({ eventSidebarClick, toggleTheme, isLightTheme, storyZindex}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); 


  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
    console.log("hello");
    eventSidebarClick();
  };



  const Logout = (e) => {
    e.preventDefault(); // Prevents immediate navigation from Link click
    sessionStorage.removeItem('user');
    navigate('/'); // Redirects to login after clearing session
  };
  return (
    <div className="header-section" style={{background:isLightTheme ? "" :'grey', zIndex:storyZindex ? 'auto' : '20'}} >
      <div className="d-flex align-items-center justify-content-between">
        <div className="col-auto">
          <div className="d-flex flex-wrap align-items-center gap-4">
            <button
              type="button"
              className="sidebar-toggle"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                 <Icon
                 icon="weui:arrow-outlined"
                 className="icon text-2xl non-active"
               />
              ) : (
                <Icon
                  icon="heroicons:bars-3-solid"
                  className="icon text-2xl non-active"
                />
              )}
            </button>

            <form className="navbar-search">
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="form-control header-search"
              />
              <Icon icon="ion:search-outline" className="icon icon-search" />
            </form>
          </div>
        </div>
        <div className="col-auto">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              data-theme-toggle=""
              className="brithness-icon"
              aria-label="light"
            >
              {isLightTheme ? (
                <Icon fontSize={24} icon="proicons:brightness" />
              ) : (
                <Icon icon="ic:outline-brightness-2" className="dark-icon" />
              )}
            </button>
            <div className="dropdown">
              <button
                className="user-button"
                type="button"
                data-bs-toggle="dropdown"
              >
                <img src={User} alt="User" className="" />
              </button>
              <div className="dropdown-menu to-top dropdown-menu-sm">
                <div className="d-flex align-items-center justify-content-between gap-2 admin-row1">
                  <div>
                    <h6 className="text-lg fw-semibold mb-2">
                      Admin Panel
                    </h6>
                  </div>
                  <button type="button" className="close-icon-profile">
                    <Icon icon="radix-icons:cross-1" className="icon text-xl" />
                  </button>
                </div>
              
                
                    <Link
                      className="py-2 d-flex align-items-center gap-3 user-setting-logout1"
                      to="/settings"
                    >
                      <Icon
                        icon="icon-park-outline:setting-two"
                        className="icon text-xl"
                      />{" "}
                      Settings
                    </Link>
                
                 
                    <Link
                      className="px-0 py-2 d-flex align-items-center gap-3 user-setting-logout2"
                      to="/" onClick={Logout}
                    >
                      <Icon icon="lucide:power" className="icon text-xl" /> Log
                      Out
                    </Link>
                
                
              </div>
            </div>
            {/* Profile dropdown end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
