const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');
const Product = require('../models/Product');

// Add daily sales data
router.post('/', async (req, res) => {
    const { productId, date, quantity } = req.body;
    try {
        const newSale = new Sales({ productId, date, quantity });
        await newSale.save();

        // Update product stock
        const product = await Product.findById(productId);
        if (product) {
            product.stock -= quantity;
            await product.save();
        }

        res.status(201).json(newSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get sales history for a product
router.get('/:productId', async (req, res) => {
    try {
        const sales = await Sales.find({ productId: req.params.productId }).sort({ date: 1 });
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
