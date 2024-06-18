"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import mongoose from "mongoose"
import connectDB from "@/db/connectDB"
import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation"

export const initiate = async (amount, to_user, paymentform) => {
    await connectDB()
    let user = await User.findOne({username:to_user})

    let instance = new Razorpay({key_id: user.paymentId, key_secret: user.paymentSecret })

    let options = {
            amount: amount,
            currency: "INR",
        }
    
    let x = await instance.orders.create(options)

    // Creating a payemnt object
    await Payment.create({oid:x.id, amount:(Number(amount)/100), to_user:to_user, name: paymentform.name, message:paymentform.message})

    return x
}

export const fetchuser = async (email) => {
    await connectDB()
    let u = await User.findOne({ email: email.replaceAll("%20", " ") })

    return JSON.parse(JSON.stringify(u))

}
export const fetchuserByUsername = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username.replaceAll("%20", " ") })

    return JSON.parse(JSON.stringify(u))

}

export const saveUser = async () => {
    const {
        getUser,
        isAuthenticated
    } = getKindeServerSession();

    await connectDB();
    let user = await getUser()
    let u = await User.find({ email: user.email })
    if (u.length == 0) {
        await User.create({
            name: user.given_name + ' ' + user.family_name,
            email: user.email,
            username: user.email.split('@')[0],
            profilePic: user.picture,
            coverPic: 'https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718430625/BingWallpaper_52_k9hy0x.jpg'
        })
    }
}

export const fetchAllUsers = async () => {
    await connectDB()
    let jsonCreators = []
    let Creators = (await User.find()).map((creator) => {
        jsonCreators.push(JSON.parse(JSON.stringify(creator)))
    })
    return jsonCreators;
}
export const fetchpayments = async (username) => {
    await connectDB()
    let payments = []
    let p = (await Payment.find({ to_user: username, done: true })).map(fan => {
        payments.push(JSON.parse(JSON.stringify(fan)))
        // console.log(payments)
    })

    return payments
}

export const updateProfile = async (data, oldUsername) => {
    await connectDB()
    // let newData = Object.fromEntries(data)
    let newData = data
    if (oldUsername != newData.username) {
        let u = await User.findOne({ username: newData.username })
        if (u) {
            return { error: "Username already exists!" }
        }
        await User.updateOne({ email: newData.email }, newData)
        await Payment.updateMany({ to_user: oldUsername }, { to_user: newData.username })
        redirect(`/dashboard/${newData.username}`)
    }
    else {
        await User.updateOne({ email: newData.email }, newData)
    }
}
