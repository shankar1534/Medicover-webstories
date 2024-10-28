import React, { useEffect, useState } from 'react';
import Dashboard from '../pages/dashboard';
import Storyupload from '../pages/storyupload';
import '../styles/header.css'
import Storyscroll from '../pages/storyscroll'
import { IoHomeOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";


import { NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
    const [activeburger,setactiveburger] = useState(true)
    const [isMobile, setIsMobile] = useState(false);



    const navigate = useNavigate(); 
 


    useEffect(() => {
        const sessionUserData = JSON.parse(sessionStorage.getItem('user'));
        if (!sessionUserData) {
            navigate('/'); // Optionally redirect to home if no user is found
        }
    }, [navigate]);

    const logout = () => {
        sessionStorage.removeItem('user');
        navigate('/');
    };

    const burgerClick = ()=>{
        setactiveburger(!activeburger)
        console.log('burger',activeburger)
    }


    const handleResize = () => {
        setIsMobile(window.innerWidth < 700);
    };

    useEffect(() => {
        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize); // Listen for resize events

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup listener
        };
    }, []);
    return (
        <div>
            <header className="sticky-top">
                <div className="d-flex justify-content-between px-4 align-items-center bg-light p-3 shadow">
                    <div className='d-flex gap-5'>
                       <img src="https://www.medicoverhospitals.in/images/logo.png" alt="Medicover Logo" width="70px" />
                       <div className="menu-container d-flex align-items-center">
                            <div className={`menu-btn-3 ${activeburger ? '' : 'active'}`} onClick={burgerClick} >
                                <span></span>
                            </div>
                      </div>
                    </div>
                    <div>
                        <button className="btn btn-danger" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className={activeburger ? "sidebar" : 'sidebar-none sidebar'} >

                <NavLink to="/dashboard" className='text-center' activeClassName="active" exact><IoHomeOutline className='mx-md-3'/>{!isMobile && (activeburger ? " Dashboard" : '')}</NavLink>
                <NavLink to="/storyupload" className='text-center' activeClassName="active"><IoMdAddCircleOutline className='mx-md-3' /> {!isMobile && activeburger ? 'Add Story' : ''} </NavLink> 
            </div>
        </div>
    );
};

export default Header;
