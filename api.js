import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Customer from 'customermodel.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch(error => console.error('Database Not Connected', error));

const app = express();

app.use(express.json());
app.use(cors());

// Create customer
app.post('/customers', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(200).json({ message: 'Customer Created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Customer Not Created' });
  }
});

// Get all customers
app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Customer Cannot be Displayed' });
  }
});

// Update customer
app.put('/customers/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Customer Updated', customer: updatedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Customer Not Updated' });
  }
});

// Delete customer
app.delete('/customers/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Customer Deleted', customer: deletedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Customer Not Deleted' });
  }
});

const PORT = process.env.PORT || 8686;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
