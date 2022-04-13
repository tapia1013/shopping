import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';



const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  // Get userLogin to check if user is logged in
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // To get message that is in userUpdateProfile reducer and se message that its been updated success
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile


  // redirect if user isnt logged in
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      // if no user.name redirect to /profile not an id
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        // if we do have user set form inputs to its value
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, dispatch, user])



  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }

  }


  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {message && (<Message variant='danger'>{message}</Message>)}

        {error && (<Message variant='danger'>{error}</Message>)}

        {success && (<Message variant='success'>Profile Updated</Message>)}

        {loading && (<Loader />)}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              placeholder='enter name'
              type='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              placeholder='enter email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Email Password</Form.Label>
            <Form.Control
              placeholder='enter password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder='confirm password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
          >
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen