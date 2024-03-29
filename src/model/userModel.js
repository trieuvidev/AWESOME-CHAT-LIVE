import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  gender: { type: String, default: "male" },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: "avatar-default.jpg" },
  role: { type: String, default: "user" },
  local: {
    email: { type: String, trim: true },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  google: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  createdAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});
// creact table database contact
UserSchema.statics = {
  createNew(item) {
    return this.create(item); // Tạo 1 bản ghi từ let ContactSchema = new Schema và this.create = ContactSchema = new Schema là một thuộc tính trong mongoose
  },
  findByEmail(email) {
    return this.findOne({ "local.email": email }).exec();
  },
  // remove ID register
  removeByID(id) {
    return this.findByIdAndRemove(id).exec();
  },
  // get token
  findByToken(token) {
    return this.findOne({ "local.verifyToken": token }).exec();
  },
  // verify update token
  verify(token) {
    return this.findOneAndUpdate(
      { "local.verifyToken": token },
      { "local.isActive": true },
      { "local.verifyToken": null }
    ).exec();
  },
  // get user by id 
  findUserById(id) {
    return this.findById(id).exec();
  },
  // get user facebook
  findByFacebookUid(uid) {
    return this.findOne({ "facebook.uid": uid }).exec();
  },
  // get user google
  findByGoogleUid(uid) {
    return this.findOne({ "google.uid": uid }).exec();
  },
  // update user
  updateUser(id, item) {
    return this.findByIdAndUpdate(id, item).exec(); // trả về dữ liệu cũ sau khi nó update
  },
  // update password hashedPassword: mật khẩu đã được băm
  updatePassword(id, hashedPassword) {
    return this.findByIdAndUpdate(id, {
      "local.password": hashedPassword
    }).exec();
  },
  /**
   * 
   * @param {Array: deprecatedUserIds} deprecatedUserIds 
   * @param {string: keyword search } keyword 
   */
  findAllForAddContact(deprecatedUserIds, keyword) {
    return this.find({
      $and: [
        { "_id": { $nin: deprecatedUserIds } }, // lọc ra những user không nằm trong mảng deprecatedUserIds
        { "local.isActive": true },
        {
          $or: [
            { "username": { "$regex": new RegExp(keyword, "i") } }, // tìm username có keyword gần giống nhất trong bảng ghi User 
            { "local.email": { "$regex": new RegExp(keyword, "i") } },
            { "facebook.email": { "$regex": new RegExp(keyword, "i") } },
            { "google.email": { "$regex": new RegExp(keyword, "i") } }
          ]
        }
      ]
    }, { _id: 1, username: 1, address: 1, avatar: 1 }).exec(); // key: 1 => chỉ lấy những element này
  },

  getNormalFindUserDataById(id) {
    return this.findById(id, { _id: 1, username: 1, address: 1, avatar: 1 }).exec(); // chỉ lấy những dữ liệu này ra bên ngoài 
  },
};

// method : check password true or false

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.local.password); // return a  promise true or false
  }
}

module.exports = mongoose.model("user", UserSchema);