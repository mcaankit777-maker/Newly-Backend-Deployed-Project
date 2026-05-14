import Customer from '../Models/customermodel.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
 import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Database Connected'))
.catch(error=>console.log('Database Not Connected'));


const app=express();

app.use(express.json());
app.use(cors());



app.post('/customers',async(req,res)=>{
   try {
     const newCustomer=new Customer({
        customerName:req.body.customerName,
        customerAge:req.body.customerAge,
        customerLocation:req.body.customerLocation,
        customerContact:req.body.customerContact
    })
    await newCustomer.save();
    res.status(200).json({message:'Customer Created'});
   } catch (error) {
    res.status(500).json({message:'Customer Not Created'});
   }
});


app.get('/customers',async(req,res)=>{
    try {
        const customer=await Customer.find();
        res.json(customer);
    } catch (error) {
        res.status(500).json({message:'Customer Cannot be Displayed'});
    }
});

app.put('/customers/:id',async(req,res)=>{
    try {
        const updateCustomer=await Customer.findByIdAndUpdate(  req.params.id,
            {
                 customerName:req.body.customerName,
        customerAge:req.body.customerAge,
        customerLocation:req.body.customerLocation,
        customerContact:req.body.customerContact
          
        },
    {new:true})
        res.status(200).json({message:'Customer Updated',customer:updateCustomer})

    } catch (error) {
        res.status(500).json({message:'Customer Not Updated'});
    }
});


app.delete('/customers/:id',async(req,res)=>{
    try {
        const deleteCustomer=await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Customer Deleted',customer:deleteCustomer});
    } catch (error) {
        res.status(500).json({message:'Customer Not Deleted'});
    }
});

app.listen(8686,()=>{
    console.log('Server running at http://127.0.0.1:8686');
});

