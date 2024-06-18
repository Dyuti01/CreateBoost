import React from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'
import {RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";

const Hero = () => {
  return (
 <div className="flex flex-col justify-center items-center min-h-screen text-black dark:text-white px-5">
        <h1 className="flex gap-2 items-center text-black dark:text-white text-5xl font-extrabold pl-[96px] mt-10">World of Creators <img className="w-28 pb-2" src="https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718292081/creatorSmall_dd7cad.gif" alt="" /></h1>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col gap-1">
            <div className="text-center text-3xl text-gray-300">Crowdfunding platform for Creators</div>
            <div className="text-center text-lg text-gray-400">Get funded by your fans and followers and spread your creativity</div>
            <div className="text-center text-sm text-gray-400">Start now!</div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <RegisterLink className="text-white dark:text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-3 text-center me-2 mb-2 transition-all duration-200">Get started
            </RegisterLink>
            <Link href='/about' className="text-white dark:text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-3 text-center me-2 mb-2 transition-all duration-200">Read more
            </Link>
          </div>
          <SearchBar/>

        </div>
      </div>
  )
}
export default Hero
