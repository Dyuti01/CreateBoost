"use client"

import React, { useState } from 'react'
import SearchResults from './SearchResults'

const SearchBar = () => {

  const [query, setQuery] = useState('')

  const handleChange = (e)=>{
    setQuery(e.target.value);
  }
  // console.log(query);


  return (
<>
    <div className="max-w-md w-full">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none pl-6">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input onChange={handleChange} type="search" id="default-search" value={query} className="block w-full pl-[48px] py-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Find your creator..." required />
      </div>
      <div className='min-h-32 text-white'>
        {query.length>0 && <SearchResults query={query.toLowerCase()}/>}

      </div>
    </div>
    </>

  )
}

export default SearchBar
