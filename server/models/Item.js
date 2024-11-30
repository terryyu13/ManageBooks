const mongoose = require('mongoose');

// 定義書籍的 Schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 書籍名稱
  description: { type: String, required: true }, // 書籍描述
  quantity: { type: Number, default: 0 }, // 書籍數量，默認為 0
  releaseDate: { type: Date, required: true }, // 上架日期
  createdAt: { type: Date, default: Date.now }, // 創建時間
});

module.exports = mongoose.model('Item', itemSchema); // 匯出模型
