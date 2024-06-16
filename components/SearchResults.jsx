"use client"

import { fetchAllUsers } from '@/actions/useractions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const SearchResults = ({query}) => {
  const [users, setUsers] = useState([])

  const getAllUsers = async () => {
    let u = await fetchAllUsers();
    setUsers(u);
  }
  useEffect(() => {
    getAllUsers()
  }, [])

  

  return (
    <ul>
      {users.map((creator)=>{
        if (creator.name.toLowerCase().includes(query)){
          return <li className='py-3 px-4 rounded-xl hover:bg-slate-700'><Link href={`${process.env.NEXT_PUBLIC_URL}/profile/${creator.username}`}>
            {creator.name}
            </Link></li>}
      })}
    </ul>
  )
}

export default SearchResults


