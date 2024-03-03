import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Provide Username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Provide Email"], // Fixed typo here
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide Password"] // Fixed typo here
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = mongoose.models.user|| mongoose.model("user", UserSchema); // Capitalize User to match convention
export default User;
