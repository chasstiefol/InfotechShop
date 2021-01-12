import React, { useEffect } from 'react'
import {
  Table,
  Button,
  Navbar,
  NavLink,
  Form,
  FormControl,
  Nav,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Component/Message'
import Loader from '../Component/Loader'
import ListLink from '../Component/ListLink'
import '../App.css'
import { listUsers, deleteUser, logout } from '../actions/userActions'
import { BsFillPersonFill, BsBag, BsSearch } from 'react-icons/bs'
import { FaStore, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.admin) {
      dispatch(listUsers())
    }
    // else {
    //   history.push('/login')
    // }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

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
      <div className='userlist-page m-3 p-3'>
        <ListLink />
        <h1 className='text-black text-center font-weight-bold mb-3'>
          Pengguna
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='table-danger table-bordered text-center'>
              <tr>
                <th>ID</th>
                <th>NAMA</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>HAPUS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.nama}</td>
                  <td>{user.email}</td>
                  <td className='text-center'>
                    {user.admin ? (
                      <FaCheck className='mb-1' style={{ color: 'green' }} />
                    ) : (
                      <FaTimes className='mb-1' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className='text-center'>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash className='mb-1' />
                    </Button>
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

export default UserListScreen
