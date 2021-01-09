import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import '../App.css'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  // useEffect(() => {
  //   if (successUpdate) {
  //     dispatch({ type: USER_UPDATE_RESET })
  //     history.push('/admin/userlist')
  //   }
  //   //  else {
  //   //   if (!user.name || user._id !== userId) {
  //   //     dispatch(getUserDetails(userId))
  //   //   } 
  //   //   else {
  //   //     setName(user.name)
  //   //     setEmail(user.email)
  //   //     setIsAdmin(user.isAdmin)
  //   //   }
  //   }
  // }
  // , [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
    <Link to='/Profile' className='btn btn-light'>
        Go Back
      </Link>
    <div className="container p-0">
    <div className="row" style={{display:"flex"}}>
      <div className="col-sm-6 my-5 mx-auto">
        <div className="edit-profile p-3">
        <h1 className="text-center font-weight-bold text-black">Edit Pengguna</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='nama'>
              <Form.Label className="font-weight-bold text-black">Nama</Form.Label>
              <Form.Control
                type='name'
                placeholder='Masukkan Nama'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label className="font-weight-bold text-black">Alamat Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Masukkan Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='admin'>
              <Form.Check
                className="text-black"
                type='checkbox'
                label='Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label className="font-weight-bold text-black">Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Masukkan Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div style={{display: "flex"}}>
              <Button className="mx-auto mt-3 btn-edit" type='submit'>
                Update
              </Button>
            </div>
          </Form>
        )}
      </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default UserEditScreen
