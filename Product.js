const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    reorderLevel: { type: Number, default: 10 },
    supplier: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
