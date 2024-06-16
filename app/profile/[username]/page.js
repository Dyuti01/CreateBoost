"use client"

import React, { useDebugValue, useEffect } from 'react'


import PaymentPage from '@/components/PaymentPage.jsx'

const page = ({params}) => {
  return (
    <PaymentPage params={params}/>
  )
}

export default page
