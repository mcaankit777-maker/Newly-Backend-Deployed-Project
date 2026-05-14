import mongoose from 'mongoose';

const CustomerSchema=new mongoose.Schema({
    customerName:String,
    customerAge:Number,
    customerLocation:String,
    customerContact:Number
})

const Customer=mongoose.model('customer',CustomerSchema);

export default Customer;

