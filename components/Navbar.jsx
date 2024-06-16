"use client"

import React, { useContext } from 'react'
import Link from 'next/link'
import { useState } from 'react'

import { UserData } from '@/store/dataStore'

import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Menu from './Menu'

const Navbar = () => {
    const {
        isLoading,
        user,
        isAuthenticated,
      } = useKindeBrowserClient();

    // {isAuthenticated && console.log(user)};
    const [dropDown, setDropDown] = useState(false)
    const [clicked, setClicked] = useState(false)

    const handleMenu = () => {
        if (clicked) {
            setClicked(false)
        }
        else { setClicked(true) }
    }

    const showDropDown = () => {
        setDropDown(!dropDown)
    }

    const {data} = useContext(UserData)

    return (
        <>
        <nav className='fixed w-screen backdrop-blur-[20px] shadow-lg text-sm text-black dark:text-white flex justify-center md:justify-between items-center h-20 px-9 transition-all duration-500 gap-7'>
            <Link href={'/'} alt="" className='text-black dark:text-white text-lg flex items-center justify-center gap-2'><img className='w-[42px]' src="https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718292081/creatorSmall_dd7cad.gif" alt="" /><span className='font-extralight text-xl'>Create<span className='font-extrabold'>Boost</span></span></Link>
            <div className='hidden md:flex items-center'>
                <ul className='flex justify-between gap-5 lg:gap-16 text-center relative left-[10px]'>
                    <Link href={'/'} alt="" className='hover:text-blue-500 hover:scale-125 w-16 transition-all duration-100'>Home</Link>
                    <Link href={'/about'} alt="" className='hover:text-blue-500 hover:scale-125 w-16 transition-all duration-100'>About</Link>
                    <Link href={'/help'} alt="" className='hover:text-blue-500 hover:scale-125 w-16 transition-all duration-100'>Help</Link>
                </ul>
            </div>

            <div className='hidden md:flex items-center'>
                {isAuthenticated && <> <button onClick={showDropDown} onBlur={()=>{
                    setTimeout(()=>{
                        setDropDown(false)
                    }, 200)
                }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-black dark:text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4" type="button">Welcome, {user.given_name.split(" ")[0]} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
                </button>


                    <div id="dropdown" className={`${dropDown ? "" : "hidden"} absolute right-[50px] top-[38px] z-10 mt-7 bg-white divide-y divide-gray-100 rounded-lg shadow w-[171px] dark:bg-gray-800`}>
                        <ul className="left-[55px] text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link href={`/dashboard/${data.username}`} className="rounded-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black dark:text-white">Dashboard</Link>
                            </li>
                            <li>
                                {/* <Link href={`/profile/${user.email.split('@')[0]}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black dark:text-white">Profile</Link> */}
                                <Link href={`/profile/${data.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black dark:text-white">Profile</Link>
                            </li>
                            <li>
                                <Link href="/contributors" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black dark:text-white">Contributors</Link>
                            </li>
                            <li>
                                <LogoutLink className="rounded-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black dark:text-white">Sign out
                                </LogoutLink>
                            </li>

                        </ul>
                    </div>
                </>
                }

                {/* {isAuthenticated && <Link href={'/dashboard'} alt="" className='hover:text-blue-500 hover:text-base w-28 h-10 transition-all duration-200'>
                    <button type="button" className="text-black dark:text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 transition-all duration-200">Dashboard
                    </button>
                </Link>} */}

                {/* {isAuthenticated && <LogoutLink  className="text-black dark:text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 transition-all duration-200">Sign out</LogoutLink>} */}

                {/* {!isAuthenticated && <Link href={'/createAcc'} alt="" className='hover:text-blue-500 hover:scale-110 w-32 h-6 transition-all duration-200'>Create account</Link>} */}
                {!isAuthenticated && <RegisterLink className='hover:text-blue-500 hover:scale-110 w-32 h-6 transition-all duration-200'>Create account</RegisterLink>}
                {!isAuthenticated && <LoginLink className="text-white dark:text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 transition-all duration-200">Sign in
                </LoginLink>}
            </div>

        </nav>
        <div onClick={handleMenu} className={`${clicked && `backdrop-blur-[20px] rounded-xl`} flex justify-center gap-2 md:-left-36 transition-all duration-300 top-5 fixed`}>
                    <div className='h-20 w-8'>
                        {!clicked ? <img className="hover:w-6 ml-4 h-10 w-7 hover:cursor-pointer transition-all duration-150 invert dark:invert-0" src='https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718383812/hamburger_yalr9k.svg' alt="" /> : <img className="hover:w-6 ml-4 h-18 w-5 hover:cursor-pointer transition-all duration-150 invert dark:invert-0" src='https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718383623/close_ny0vfk.svg' alt="" />}
                    </div>

                    <Menu isClicked={clicked} />

                </div>
        </>
    )
}

export default Navbar