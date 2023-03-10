import './App.css';
import Shorten from './pages/js/Shorten';
import AllUrl from './pages/js/AllUrl';
import Login from './pages/js/Login';
import SignUp from './pages/js/SignUp';

import React from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SlideRoutes from 'react-slide-routes';
import { IoLogInOutline } from 'react-icons/io5';
import { TbHandClick } from 'react-icons/tb'
import { BiCodeCurly } from 'react-icons/bi';
import { RiHomeLine } from 'react-icons/ri';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
    const [userInfo, setUserInfo] = useState({
        logged: false,
        username: '',
    });

    const refreshData = () => {
        axios.get(process.env.REACT_APP_BASE_BACK + '/api/home')
            .then((res) => {
                setUserInfo({
                    logged: res.data.logged,
                    username: res.data.username
                });
            })
    }

    useEffect(() => {
        refreshData();
    }, [])

    const handleLogout = () => {
        axios.get(process.env.REACT_APP_BASE_BACK + '/api/logout')
            .then(() => {
                refreshData();
            })
            .catch((err) => alert(err))
    }

    return (
        <>
            <BrowserRouter>
                <div id='body-content'>
                    <div id='side-vertical'>
                        <div id='nav-brand' style={{ textDecoration: 'none', color: 'black' }}>TURL</div>
                        <div id='nav-link'>
                            <RiHomeLine className='nav-icon' />
                            <NavLink className='nav-text' to='/' style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>Home</NavLink>
                        </div>
                        {userInfo.logged === true
                            ? <>
                                <div id='nav-link'>
                                    <BiCodeCurly className='nav-icon' />
                                    <NavLink className='nav-text' to='/allurls' style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>URLs</NavLink>
                                </div>
                            </>
                            : <>
                                <div id='nav-link'>
                                    <TbHandClick className='nav-icon' />
                                    <NavLink className='nav-text' to='/signup' style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>Sign Up</NavLink>
                                </div>
                                <div id='nav-link'>
                                    <IoLogInOutline className='nav-icon' />
                                    <NavLink className='nav-text' to='/login' style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>Login</NavLink>
                                </div>
                            </>
                        }
                    </div>

                    <div id='slide'>
                        <SlideRoutes>
                            <Route path="/" element={<Shorten />} />
                            <Route path="/allurls" element={<AllUrl />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                        </SlideRoutes>
                    </div>

                    <div>
                        {userInfo.logged === true
                            ? <>

                                <div id='avt-user' style={{ fontWeight: 'bold', margin: '20px' }}>
                                    Hello, {userInfo.username}
                                </div>
                                <button id='logout-btn'
                                    style={{ fontWeight: 'bold', margin: '20px' }}
                                    onClick={handleLogout}
                                >Logout</button>
                            </>
                            : <>
                                <div id='avt-user' style={{ fontWeight: 'bold', margin: '20px' }}>
                                    Not log
                                </div>
                            </>
                        }
                    </div>
                </div>
            </BrowserRouter>
        </ >
    )
}

export default Home;