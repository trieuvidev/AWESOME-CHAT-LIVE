// require mongose
import mongoose from "mongoose";
// import Schema
let Schema = mongoose.Schema;
// Tạo Schema
let ContactSchema = new Schema({
  // _id : tự tạo ra
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

// creact table database contact
ContactSchema.statics = {
  createNew(item) {
    return this.create(item); // Tạo 1 bản ghi từ let ContactSchema = new Schema và this.create = ContactSchema = new Schema là một thuộc tính trong mongoose
  }
};

//export + tạo model
module.exports = mongoose.model("contact", ContactSchema);

