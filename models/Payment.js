import mongoose from "mongoose";

const {Schema, model} = mongoose;

const PaymentSchema = new Schema({
    name:{type:String},
    to_user:{type:String},
    oid:{type:String},  // Order id
    amount:{type:String},
    message:{type:String},
    done: {type:Boolean, default:false}
}, {timestamps:true});
// const Payment = model("Payment", PaymentSchema)
export default mongoose.models.Payment || model("Payment", PaymentSchema);