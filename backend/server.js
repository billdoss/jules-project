const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const Order = require('./models/order'); // Import Order model

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:4200' })); // Use CORS - allow Angular dev server
app.use(bodyParser.json());

// MongoDB Connection
// IMPORTANT: Replace with your actual MongoDB connection string
const dbURI = 'mongodb://localhost:27017/checkoutDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// API endpoint for creating an order
app.post('/api/orders', async (req, res) => {
  console.log('Processing order for:', req.body.customerEmail);

  const {
    customerName,
    customerEmail,
    shippingAddress,
    items, // Expecting an array of objects: { productName, quantity, price }
    totalAmount,
    paymentDetails // For simulated processing
  } = req.body;

  // Server-side validation
  if (!customerName || !customerEmail || !shippingAddress || !items || items.length === 0 || !totalAmount) {
    return res.status(400).json({ message: 'Missing required order fields or items.' });
  }

  // TODO: More detailed validation for items array, prices, quantities etc.

  try {
    // Simulate payment processing (replace with actual payment gateway integration)
    console.log('Simulating payment processing for card ending with:', paymentDetails?.cardNumber?.slice(-4) || 'N/A');
    const paymentSuccessful = true; // Simulate a successful payment

    if (!paymentSuccessful) {
      // This block might not be reached if paymentSuccessful is always true as above
      // but is good practice for actual payment integration.
      return res.status(400).json({ message: 'Payment failed.' });
    }

    const newOrder = new Order({
      customerName,
      customerEmail,
      shippingAddress,
      items,
      totalAmount,
      paymentStatus: 'Paid' // Mark as Paid since payment was successful (simulated)
    });

    const savedOrder = await newOrder.save();

    console.log('Order saved successfully:', savedOrder._id);
    res.status(201).json({
      message: 'Order placed and saved successfully!',
      orderId: savedOrder._id,
      orderDetails: savedOrder
    });

  } catch (error) {
    console.error('Error processing order:', error);
    // Check for Mongoose validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Order validation failed.', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to process order due to a server error.' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
