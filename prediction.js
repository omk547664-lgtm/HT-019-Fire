const express = require('express');
const router = express.Router();
const axios = require('axios');
const Sales = require('../models/Sales');

// Predict demand for a product
router.post('/:productId', async (req, res) => {
    try {
        // Fetch sales history from DB
        const salesData = await Sales.find({ productId: req.params.productId }).sort({ date: 1 });

        if (salesData.length < 5) {
            return res.status(400).json({ message: "Not enough data for prediction (need at least 5 days)" });
        }

        // Format data for ML service
        const formattedData = salesData.map(s => ({
            date: s.date.toISOString().split('T')[0],
            quantity: s.quantity
        }));

        // Call Python ML Service
        const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/predict`, {
            sales_history: formattedData
        });

        res.json(mlResponse.data);
    } catch (err) {
        console.error("Prediction Error:", err.message);
        res.status(500).json({ message: "Prediction service unavailable" });
    }
});

module.exports = router;