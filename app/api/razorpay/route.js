"use server"

import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/User";

export const POST = async (req)=>{
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    let  p =await Payment.find({oid: body.razorpay_order_id})
    
    if (p.length==0){
        return NextResponse.json({success:false, message:"Order ID not found"})
    }

    // Verify
    let user = await User.findOne({username: p[0].to_user})

    let pmt = validatePaymentVerification({"order_id":body.razorpay_order_id, "payment_id":body.razorpay_payment_id},body.razorpay_signature, user.paymentSecret)
    console.log(pmt)
    if (pmt){
        const update = await Payment.findOneAndUpdate({oid:body.razorpay_order_id}, {done:"true"}, {new:true})

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/profile/${update.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success:false, message:"Payment verification failed"})
    }
}