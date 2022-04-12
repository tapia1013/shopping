import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

// Method to match passwords in userController to auth user
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Built in method called compare that compares the plain textPW we get from the body to match the encrypted one in our database
  return await bcrypt.compare(enteredPassword, this.password)

}



const User = mongoose.model('User', userSchema)
export default User