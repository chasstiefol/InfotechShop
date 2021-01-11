import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Navbar,
  NavLink,
  FormControl,
  Nav,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Component/Message'
import Loader from '../Component/Loader'
import { updateProfil, logout } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { BsFillPersonFill, BsBag, BsSearch } from 'react-icons/bs'
import { FaStore } from 'react-icons/fa'
import '../App.css'
import pict1 from '../Assets/1.jpg'

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      setName(userInfo.nama)
      setEmail(userInfo.email)
    }
  }, [history, userInfo])

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (success) {
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, success])

  // const orderListMy = useSelector((state) => state.orderListMy)
  // const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  // useEffect(() => {
  //   if (!userInfo) {
  //     history.push('/login')
  //   }
  //   else {
  //     if (!user || !user.name || success) {
  //       dispatch({ type: USER_UPDATE_PROFILE_RESET })
  //       dispatch(getUserDetails('profile'))
  //       dispatch(listMyOrders())
  //     } else {
  //       setName(user.name)
  //       setEmail(user.email)
  //     }
  //   }
  // }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProfil(name, email))
  }

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <div className='container-fluid p-0'>
      <Navbar className='navbar-content-home' variant='dark'>
        <NavLink className='home' href='/'>
          InfoTech Shop
        </NavLink>
        <Navbar.Collapse className='justify-content-center'>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Search..'
              className='form-control'
            />
            <Button variant='outline-light'>
              <BsSearch />
            </Button>
          </Form>
        </Navbar.Collapse>
        <Nav className='justify-content-end'>
          {userInfo && userInfo.admin && (
            <NavLink className='cart' href='/product-list'>
              <FaStore className='mb-1 mr-2' />
              Daftar Produk
            </NavLink>
          )}
          <NavLink className='cart' href='/cart'>
            <BsBag className='mb-1 mr-2' />
            CART
          </NavLink>
          {userInfo ? (
            <>
              <NavLink className='cart' href='/profile'>
                <BsFillPersonFill className='mb-1 mr-2' />
                {userInfo.nama}
              </NavLink>
              <Nav.Item as={NavLink} onClick={logoutHandler} className='cart'>
                LOGOUT
              </Nav.Item>
            </>
          ) : (
            <NavLink className='cart' href='/Signup'>
              <BsFillPersonFill className='mb-1 mr-2' />
              SIGNUP
            </NavLink>
          )}
        </Nav>
      </Navbar>
      <Row className='mx-4'>
        <Col md={12} className='profile-screen mt-3 pb-3'>
          <h2 className='text-center text-dark mt-2 mb-4'>Profil</h2>
          <Row>
            <Col md={4} style={{ display: 'flex' }}>
              <Image className='mx-auto' src={pict1} />
            </Col>
            <Col md={7} className='mx-auto'>
              {success && <Message variant='success'>Profile Updated</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label className='text-dark font-weight-bold'>
                      Nama
                    </Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Masukkan Nama'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='email'>
                    <Form.Label className='text-dark font-weight-bold'>
                      Alamat Email
                    </Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Masukkan'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <div style={{ display: 'flex' }}>
                    <Button
                      type='submit'
                      variant='secondary'
                      className='mx-auto'
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <Row>
        <Col md={12} className='mt-3 mb-3 profile-screen'>
          <h2 className='text-center font-weight-bold text-dark my-3'>
            Pesanan Saya
          </h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead className='table-dark text-center'>
                <tr>
                  <th>ID</th>
                  <th>PRODUK</th>
                  <th>TOTAL</th>
                  <th>PENGIRIMAN</th>
                  <th>HAPUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='secondary'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row> */}
    </div>
  )
}

export default ProfileScreen
