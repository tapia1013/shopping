import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
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
      token: generateToken(user._id)
    })
  } else {
    // if passwords dont match
    res.status(401)
    throw new Error('Invalid Email or Password')
  }

})





// @desc     Register a new user
// @routes   POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

})




// @desc     Get User Profile
// @routes   GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  // get the user
  const user = await User.findById(req.user._id);

  // check for the user
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404);
    throw new Error('User not found')
  }
})




// @desc     Update User Profile
// @routes   PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // get the user
  const user = await User.findById(req.user._id);

  // check for the user
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.email,
      token: generateToken(updatedUser._id)
    })

  } else {
    res.status(404);
    throw new Error('User not found')
  }
})





export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile
}