"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
// import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

import { fetchuser, saveUser, updateProfile } from '@/actions/useractions'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { UserData } from '@/store/dataStore';


const page = () => {
  const {
    user,
    isAuthenticated,
  } = useKindeBrowserClient();


  // const { data: session, update, status } = useSession()
  const [userform, setForm] = useState({name:'', email:'', username:'', password:'', description:'', profilePic:'', coverPic:'', paymentSecret:'', createdAt:'', updatedAt:'', paymentId:'', paymentSecret:''})
  
  const actualname=useRef('')
  const email=useRef('')
  const username=useRef('')
  const password=useRef('')
  const description=useRef('')
  const profilePic=useRef('')
  const coverPic=useRef('')
  const paymentId=useRef('')
  const paymentSecret=useRef('')

  const {data, updateData} = useContext(UserData)

  const getUser = async()=>{
    let u = await fetchuser(user.email)
    setForm(u);
    updateData(u);
    // setUserData(u);
    // console.log(u);
    console.log(data);
  }
  useEffect(()=>{
    if (isAuthenticated){
      saveUser()
      getUser()
    }
  }, [isAuthenticated, user])

  const handleChange = (e) => {
    setForm({ ...userform, [e.target.name]: e.target.value })  // Eliminating re-rendering at each change (since state changes) by using useRef hook
    // console.log(userform)
}

const handleSubmit = async ()=>{
  const up = await updateProfile(userform, data.username)
  updateData(userform)

  alert("Profile updated !")
}


  return (
    <div className='text-black dark:text-white pt-20 flex flex-col justify-center items-center gap-3'> 
      <span className='text-2xl font-semibold'>Welcome to Dashboard</span>
      <form action={handleSubmit} className="h-auto w-[50%] flex flex-col justify-center items-center gap-2">
      <div className='w-full'>
          <label htmlFor="actualname" className="mb-2  dark:text-gray-400 text-xs">Name</label>
          <input
            name="name"
            ref={actualname}
            onChange={handleChange}
            className="px-3 py-2 shadow-md dark:bg-slate-800 dark:placeholder:text-gray-400 border-blue-600  dark:text-gray-50 placeholder:text-xs ease-in-out duration-300 rounded-lg w-full focus:border-blue-500 focus:ring-blue-500 text-xs"
            type="text"
            value={userform.name}
            placeholder="Your name"
            required
          />
        </div>
        <div className='w-full'>
          <label htmlFor="email" className="mb-2  dark:text-gray-400 text-xs">Email</label>
          <input
            name="email"
            ref={email}
            onChange={handleChange}
            className="px-3 py-2 shadow-md dark:bg-slate-800 dark:placeholder:text-gray-400 border-blue-600  dark:text-gray-50 placeholder:text-xs ease-in-out duration-300 rounded-lg w-full focus:border-blue-500 focus:ring-blue-500 text-xs"
            type="email"
            value={userform.email}
            placeholder="Email"
            required
          />
        </div>
        <div className='w-full'>
          <label htmlFor="username" className="mb-2  dark:text-gray-400 text-xs">Username</label>
          <input
            name="username"
            ref={username}
            onChange={handleChange}
            className="px-3 py-2 shadow-md dark:bg-slate-800 dark:placeholder:text-gray-400 border-blue-600  dark:text-gray-50 placeholder:text-xs ease-in-out duration-300 rounded-lg w-full focus:border-blue-500 focus:ring-blue-500 text-xs"
            type="text"
            value={userform.username}
            placeholder="Username"
            required
          />
        </div>
        <div className='w-full'>
          <label htmlFor="password" className="mb-2 dark:text-gray-400 text-xs">Password</label>
          <input
            name="password"
            ref={password}
            onChange={handleChange}
            className="px-3 py-2 shadow-md dark:bg-slate-800 dark:placeholder:text-gray-400 border-blue-600  dark:text-gray-50 placeholder:text-xs ease-in-out duration-300 rounded-lg w-full focus:border-blue-500 focus:ring-blue-500 text-xs"
            type="password"
            value={userform.password}
            placeholder="Password"
            required />
        </div>

        <div className='w-full'>
          <label htmlFor="description" className="mb-2 dark:text-gray-400 text-xs">Description</label>
          <input
            name="description"
            ref={description}
            onChange={handleChange}
            className="px-3 py-2 shadow-md dark:bg-slate-800 dark:placeholder:text-gray-400 border-blue-600  dark:text-gray-50 placeholder:text-xs ease-in-out duration-300 rounded-lg w-full focus:border-blue-500 focus:ring-blue-500 text-xs"
            type="text"
            value={userform.description}
            placeholder="Give a brief description"/>
        </div>
  
        <div className='w-full'>
          <label htmlFor="profilePic" className="mb-2 dark:text-gray-400 text-xs">Profile picture</label>
          <input
            name="profilePic"
            ref={profilePic}
            onChange={handleChange}
            className="px-3 py-2 shadow-md dark:bg-slate-800 dark:placeholder:text-gray-400 border-blue-600  dark:text-gray-50 placeholder:text-xs ease-in-out duration-300 rounded-lg w-full focus:border-blue-500 focus:ring-blue-500 text-xs"
            type="text"
            value={userform.profilePic}
            placeholder="Link to your profile picture"
            required />
        </div>
        <div className='w-full'>
          <label htmlFor="coverPic" className="mb-2 dark:text-gray-400 text-xs">Back cover</label>
          <input
            name="coverPic"
            ref={coverPic}
            onChange={handleChange}
            className="px-3 py-2 shadow-md dark:bg-slate-800 dark:placeholder:text-gray-400 border-blue-600  dark:text-gray-50 placeholder:text-xs ease-in-out duration-300 rounded-lg w-full focus:border-blue-500 focus:ring-blue-500 text-xs"
            type="text"
            value={userform.coverPic}
            placeholder="Link to your back cover picture"/>
        </div>
        <div className='w-full'>
          <label htmlFor="clientId" className="mb-2 dark:text-gray-400 text-xs">Payment ID</label>
          <input
            name="paymentId"
            ref={paymentId}
            onChange={handleChange}
            className="px-3 py-2 shadow-md dark:bg-slate-800 dark:placeholder:text-gray-400 border-blue-600  dark:text-gray-50 placeholder:text-xs ease-in-out duration-300 rounded-lg w-full focus:border-blue-500 focus:ring-blue-500 text-xs"
            type="text"
            value={userform.paymentId}
            placeholder="Payment portal client ID"/>
        </div>
        <div className='w-full'>
          <label htmlFor="clientSecret" className="mb-2 dark:text-gray-400 text-xs">Your payment secret</label>
          <input
            name="paymentSecret"
            ref={paymentSecret}
            onChange={handleChange}
            className="px-3 py-2 shadow-md dark:bg-slate-800 dark:placeholder:text-gray-400 border-blue-600  dark:text-gray-50 placeholder:text-xs ease-in-out duration-300 rounded-lg w-full focus:border-blue-500 focus:ring-blue-500 text-xs"
            type="password"
            value={userform.paymentSecret}
            placeholder="Payment portal client secret" />
        </div>

        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg px-4 py-2 text-black dark:text-white rounded-lg w-full hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out relative mt-[25px] mb-5"
          type="submit">
          Save
        </button>
      </form>

    </div>
  )
}

export default page
