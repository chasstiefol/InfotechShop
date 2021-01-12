import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Table,
  Button,
  Badge,
  Navbar,
  NavLink,
  Form,
  FormControl,
  Nav,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Component/Message'
import Loader from '../Component/Loader'
import { listOrders } from '../actions/orderActions'
import { logout } from '../actions/userActions'
import { BsFillPersonFill, BsBag, BsSearch } from 'react-icons/bs'
import { FaStore } from 'react-icons/fa'
import '../App.css'
import ListLink from '../Component/ListLink'

const OrderListScreen = ({ history, location }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.admin) {
      dispatch(listOrders())
    }
    // else {
    //   history.push('/login')
    // }
  }, [dispatch, history, userInfo])

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <>
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
      <div className='orderlist-page m-3 p-3'>
        <ListLink />
        <h1 className='text-center font-weight-bold mb-3'>Pesanan</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='table-bordered table-danger text-center'>
              <tr>
                <th>ID</th>
                <th>PENGGUNA</th>
                <th>TANGGAL</th>
                <th>TOTAL</th>
                <th>PEMBAYARAN</th>
                <th>PENGIRIMAN</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.namaPembeli}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Rp. {order.totalPembayaran}</td>
                  <td className='text-center'>
                    {order.sudahBayar ? (
                      <Badge variant='success'>Sudah dibayar</Badge>
                    ) : (
                      <Badge variant='danger'>Belum dibayar</Badge>
                    )}
                  </td>
                  <td className='text-center'>
                    {order.sudahDikirim ? (
                      <Badge variant='primary'>Sudah dikirim</Badge>
                    ) : (
                      <Badge variant='secondary'>Belum dikirim</Badge>
                    )}
                  </td>
                  <td className='text-center'>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        variant='info'
                        size='sm'
                        className='text-white font-weight-bold'
                      >
                        Lihat Detail
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}

export default OrderListScreen
