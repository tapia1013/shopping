import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


// @desc     Auth user & get a token
// @routes   POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  // first get data from the body
  const { email, password } = req.body
  // res.send({ email, password })

  // find 1 email that matches the email were recieving
  const user = await User.findOne({ email })

  // Check if user exists we need to match PW, we compare by using the compare method we made in our User Model
  if (user && (await user.matchPassword(password))) {
    // return the following if passwords do match
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    })
  } else {
    // if passwords dont match
    res.status(401)
    throw new Error('Invalid Email or Password')
  }


})







export {
  authUser
}