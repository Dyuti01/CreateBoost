"use client"
import React, { useContext, useEffect } from 'react'

import { fetchuser, saveUser, updateProfile } from '@/actions/useractions'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { UserData } from '@/store/dataStore';

const page = () => {
   const {
    user,
    isAuthenticated,
  } = useKindeBrowserClient();
    const {data, updateData} = useContext(UserData)

  const getUser = async()=>{
    let u = await fetchuser(user.email)
    updateData(u);
  }
  useEffect(()=>{
    if (isAuthenticated){
      saveUser()
      getUser()
    }
  }, [isAuthenticated, user])
  
  return (
    <>
            <div className="fixed md:absolute inset-0 -z-10 h-full w-full dark:bg-slate-800 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    
    <div className='text-center text-black dark:text-white min-h-screen flex flex-col items-center mb-10 lg:mb-0'>
      <div className='flex flex-col items-center justify-center h-[55vh] gap-3'>
        <h1 className='text-5xl'>About</h1>
        {/* <div className='w-[50%] bg-white h-[2px] dark:h-[1px]'></div> */}
        <p className='w-[80%] lg:w-[50%]'>It is a crowdfunding platform for creators. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est animi nemo iste libero, voluptate nulla tempore eos, suscipit, aperiam maiores eligendi laudantium hic! Voluptas, tempora! Nihil ducimus nesciunt, atque numquam quibusdam voluptates unde reprehenderit corrupti asperiores impedit deserunt eos consequatur sint cupiditate similique dolor quo!</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <iframe className="md:w-[450px] w-[350px] h-[255px]" src="https://www.youtube.com/embed/K9Lji9NWMF8?si=E5Y4XNT6M21lhTg8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe className="md:w-[450px] w-[350px] h-[255px]" src="https://www.youtube.com/embed/dgDhpRxrBFY?si=3L8k6_f8qtj9P2Id" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    </div>
  </>
  )
}

export default page
