import React, { useContext } from 'react'
import Link from 'next/link'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { UserData } from '@/store/dataStore';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";


const Menu = ({ isClicked }) => {

  const {data} =useContext(UserData)

  const {
    isLoading,
    user,
    isAuthenticated,
  } = useKindeBrowserClient();

  return (
    <div className={isClicked ? 'flex flex-col gap-2 relative left-0 place-content-end w-32 transition-all duration-500 px-4 pb-2 rounded-xl' : 'relative -left-64 transition-all duration-300 h-52'}>
      <div className='flex transition-all duration-150 w-16'>
        {/* <button className='flex items-center justify-center bg-white font-semibold rounded-xl px-2 py-1 w-20 h-7 hover:bg-green-500 text-sm hover:text-base hover:text-white hover:w-24 transition-all duration-100'>Sign in</button> */}
        <Link href={'/'} alt="" className='dark:text-white font-semibold text-sm hover:text-blue-500 hover:scale-110 w-16 transition-all duration-100'>Home</Link>
      </div>
      <div className='flex transition-all duration-150 w-16'>

        <Link href={'/about'} alt="" className='dark:text-white font-semibold text-sm hover:text-blue-500 hover:scale-110 w-16 transition-all duration-100'>About</Link>
      </div>

      {isAuthenticated &&<div className='flex transition-all duration-150 w-28'>
         <Link href={`/dashboard/${data.username}`} alt="" className='dark:text-white font-semibold text-sm hover:text-blue-500 hover:scale-110 w-16 transition-all duration-100'>Dashboard</Link>
      </div>}

      {isAuthenticated &&<div className='flex transition-all duration-150 w-28'>

         <Link href={`/profile/${data.username}`} className="dark:text-white font-semibold text-sm hover:text-blue-500 hover:scale-110 w-16 transition-all duration-100">Profile</Link>
      </div>}

      {isAuthenticated &&<div className='flex transition-all duration-150 w-28'>

         <LogoutLink className="dark:text-white font-semibold text-sm hover:text-blue-500 hover:scale-110 w-16 transition-all duration-100">Sign out
        </LogoutLink>
      </div>}
      
      <div className='flex transition-all duration-150 w-28'>

        <Link href={'/'} alt="" className='dark:text-white font-semibold text-sm hover:text-blue-500 hover:scale-110 w-16 transition-all duration-100'>Help</Link>

      </div>

    </div>
  )
}


export default Menu