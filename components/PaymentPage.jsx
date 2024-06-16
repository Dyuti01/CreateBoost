"use client"
// For Razorpay in React: https://razorpay.com/docs/payments/server-integration/nodejs/troubleshooting-faqs/#3-can-i-integrate-razorpay-checkout-with-reactjs

import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import { fetchpayments, fetchuser, fetchuserByUsername, initiate } from '@/actions/useractions'

const PaymentPage = ({ params }) => {

    const [paymentform, setPaymentform] = useState({ "name": "", "message": "", "amount":0})

    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const [fetching, setFetching] = useState(true)

    let fanName = useRef()
    let message = useRef()
    let amountValue = useRef(0)
    let ref = useRef()


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })  // Eliminating re-rendering at each change (since state changes) by using useRef hook
        // console.log(paymentform)
    }

    const getData = async () => {
        let u = await fetchuserByUsername(params.username)
        setCurrentUser(u)

        // let dbpayments = await fetchpayments(params.username)
        setFetching(true)
        fetchpayments(params.username).then((dbpayments)=>{
            // setPayments(dbpayments.sort(function (p1, p2) { return Number.parseInt(p2.amount) - Number.parseInt(p1.amount) }));
            setPayments(dbpayments.reverse());
            setFetching(false)
        })
        // setPayments(dbpayments.sort(function (p1, p2) { return Number.parseInt(p2.amount) - Number.parseInt(p1.amount) }))

    }
    
    useEffect(() => {
        getData()
    }, [])


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }


    const pay = async (e, amount) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')


        const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/razorpay`, { method: 'POST', headers: { "Content-Type": "application/json", }, body: JSON.stringify(amount) }).then((t) =>
            t.text()
        )

        // Get the orderId
        let a = await initiate(amount, params.username, paymentform)

        var options = {
            "key": currentUser.paymentId, // Enter the Key ID generated from the Dashboard
            // "key_id": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "CreateBoost", //your business name
            "description": "Test Transaction",
            "image": "https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718292081/creatorSmall_dd7cad.gif",
            "order_id": a.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": paymentform.name, //your customer's name
                "email": "@helper",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    


    return (
        <>
                       <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className='pt-20 dark:text-white'>

                {!fetching && currentUser.coverPic && <div ref={ref} style={{ backgroundImage: `url('https://${currentUser.coverPic.split("//")[1]}')`, height: "362px" }} className='bg-center bg-cover rounded-b-[26px]'>
                </div>}

                {/* {!fetching && <div ref={ref} className={`bg-[url('https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718427884/BingWallpaper_47_yiqm1l.jpg')] bg-cover bg-center h-[362px]`}>
                </div>} */}

                <div className='relative flex justify-center items-center'>
                    {/* <img className='absolute w-28 rounded-xl' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/321371/785acefb527f406dbcbeee9dc0d76222/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/2.jpg?token-time=1717804800&token-hash=wEPc5MM4g-9mL5ohg6srPK9N_P4vbBnkaBPju-dp3n8%3D" alt="" /> */}
                    {fetching &&
                        <div className="text-center flex justify-center items-center mt-5">
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>}
                    <img className='absolute w-28 rounded-xl' src={currentUser.profilePic} alt="" />

                </div>
                <div className='mt-20 flex flex-col justify-center items-center gap-2'>
                    {/* <span className='text-2xl font-semibold'>{params.username.replaceAll("%20", " ").toLowerCase()}</span> */}
                    <span className='text-2xl font-semibold'>{currentUser.name}</span>
                    <p className='text-sm text-gray-300'>{currentUser.description}</p>
                    <div className='flex items-center justify-center gap-2'>
                        <span className='text-xs text-gray-300'>{payments.length} Members</span>
                        <span className='text-xs text-gray-300'>•</span>
                        <span className='text-xs text-gray-300'>Total funds: ₹ {payments.reduce((a,b)=>Number.parseFloat(a) + Number.parseFloat(b.amount), 0)}</span>
                    </div>

                    <button className='bg-blue-700 hover:bg-blue-600 px-16 py-2 rounded-lg font-semibold text-sm transition-all duration-200'>Join for free</button>
                    <img className='w-6 dark:invert mt-1' src="/twitter.svg" alt="" />
                </div>


                <div className='md:mx-28 mt-8 mb-10 flex flex-col md:flex-row gap-10 justify-center'>
                    <div className='md:w-[50%] bg-transparent rounded-xl px-10 pt-7 pb-7'>
                        <h2 className='text-xl font-bold'>Fans</h2>
                        {fetching && <div className="text-center">
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>}                 
                        {!fetching && payments.length == 0 && <span>No contributions</span>}
                        {!fetching && <ul className='flex flex-col gap-2 mt-4'>
                            {payments.map((fan, i) => {
                                // console.log(i) // here i is the index

                                let paymentDate = new Date(fan.updatedAt)
                                return (
                                    <div key={fan.oid} className='bg-slate-900 flex justify-between rounded-lg px-2 py-1'>
                                        <div className='flex gap-2'>
                                            <img src="https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718284084/avatar_blxagy.gif" alt="" className='w-5 h-5' />

                                            <div>
                                                <li className='text-sm'><span className='text-cyan-400'>{fan.name}</span> <span className='text-slate-300'>contributed</span> ---&gt; <span className='text-green-500'>₹ {Number.parseFloat(fan.amount)}</span></li>
                                                <span className='text-yellow-400 text-xs'>Message: </span>
                                                <span className='text-blue-500 text-xs'>{fan.message}</span>
                                            </div>


                                        </div>
                                        <div className='text-xs text-slate-500'>
                                            {(paymentDate.getDate() > 9 ? "" : "0") + paymentDate.getDate() + "-" + (paymentDate.getMonth() + 1 > 9 ? "" : "0") + (paymentDate.getMonth() + 1) + "-" + paymentDate.getFullYear()}
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>}
                    </div>
                    <div className='md:w-[50%] bg-transparent rounded-xl px-10 pt-7 pb-7'>
                        <h2 className='text-xl font-bold'>Make a contribution</h2>

                        <div className='mt-4 flex flex-col justify-center gap-2'>
                            {/* <label htmlFor="amount" className='text-sm'>Enter your name</label> */}
                            {/* <input onChange={handleChange} ref={fanName} value={paymentform.name} type="text" name="name" id="name" placeholder='Enter your name' className='focus:ring-white rounded-lg bg-slate-500 placeholder:text-slate-200 placeholder:text-xs text-[14px] py-3' /> */}
                            {/* <label htmlFor="amount" className='text-sm'>Your message</label> */}
                            {/* <input onChange={handleChange} ref={message} value={paymentform.message} type="text" name="message" id="message" placeholder='Your message' className='focus:ring-white rounded-lg bg-slate-500 placeholder:text-slate-200 placeholder:text-xs text-[14px] py-3' /> */}
                            {/* <label htmlFor="amount" className='text-sm'>Enter amount</label> */}
                            {/* <input onChange={handleChange} ref={amountValue} value={paymentform.amount} type="text" name="amount" id="amount" placeholder='Amount' className='focus:ring-white rounded-lg bg-slate-500 placeholder:text-slate-200 placeholder:text-xs text-[14px] py-3' /> */}
                            <input ref={fanName} onChange={handleChange} value={paymentform.name} type="text" name="name" id="name" placeholder='Enter your name' className='focus:ring-white rounded-lg bg-slate-500 placeholder:text-slate-200 placeholder:text-xs text-[14px] py-3' />
                            {/* <label htmlFor="amount" className='text-sm'>Your message</label> */}
                            <input ref={message} type="text" name="message" id="message" placeholder='Your message' className='focus:ring-white rounded-lg bg-slate-500 placeholder:text-slate-200 placeholder:text-xs text-[14px] py-3' />
                            {/* <label htmlFor="amount" className='text-sm'>Enter amount</label> */}
                            <input ref={amountValue} onChange={handleChange} type="number" name="amount" id="amount" value={paymentform.amount} placeholder='Amount atleast 10' className='focus:ring-white rounded-lg bg-slate-500 placeholder:text-slate-200 placeholder:text-xs text-[14px] py-3' />

                        </div>
                        <button onClick={(e) => {
                            paymentform.name = fanName.current.value
                            paymentform.message = message.current.value
                            paymentform.amount = (amountValue.current.value * 100)
                            pay(e, paymentform.amount)
                        }} disabled={paymentform.name.length===0 || Number(paymentform.amount)<10} className='disabled:bg-slate-500 bg-blue-600 mt-3 px-10 py-2 rounded-lg' id="rzp-button1">Pay</button>

                    </div>
                </div>
            </div>
            {/* <button className='bg-slate-500' id="rzp-button1">Pay</button> */}


        </>
    )
}


export default PaymentPage
