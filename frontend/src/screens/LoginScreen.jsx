import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar,
  InputGroup,
  NavLink,
  FormControl,
  Button,
} from 'react-bootstrap'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { FaGoogle } from 'react-icons/fa'
import { login } from '../actions/userActions'

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <body>
      <div className='container-fluid p-0 page-color'>
        <Navbar className='navbar-content'>
          <NavLink className='brand' href='/'>
            InfoTech Shop
          </NavLink>
        </Navbar>
        <div className='row'>
          <div className='col-sm-7 p-5 mt-5 ml-5 pt-5'>
            <h2>PROMO 12.12.</h2>
            <br />
            <h2>BELI 5,</h2>
            <h2>NGGAK GRATIS APA-APA!</h2>
            <br />
            <h2>BURUAN BELI!</h2>
            <h2>HARGA TERBAIK</h2>
            <h2>PASTINYA TIDAK TERJANGKAU</h2>
          </div>
          <div className='col-sm-4 form-signup p-5 pr-2'>
            <h4 className='signup-form m-1 mb-5 font-weight-bold'>Login</h4>
            <InputGroup className='mb-4'>
              <FormControl
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label='Email'
                aria-describedby='basic-addon1'
                required
              />
            </InputGroup>
            <InputGroup className='mb-4'>
              <FormControl
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label='Password'
                aria-describedby='basic-addon1'
              />
            </InputGroup>
            <Button
              type='submit'
              onClick={submitHandler}
              className='add-to-cart-button'
              block
            >
              LOGIN
            </Button>
            <a href=''>Lupa Password</a>
            <br />
            <p className='text-center'>ATAU</p>
            <Button type='submit' className='btn-form1' block>
              <FaGoogle className='pb-1' size='5%' />
              LOGIN
            </Button>
            <p className='text-center'>
              belum punya akun? <a href='/Signup'>Signup</a>
            </p>
          </div>
        </div>

        <script
          src='https://unpkg.com/react/umd/react.production.min.js'
          crossorigin
        ></script>

        <script
          src='https://unpkg.com/react-dom/umd/react-dom.production.min.js'
          crossorigin
        ></script>

        <script
          src='https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js'
          crossorigin
        ></script>
      </div>
    </body>
  )
}

export default Login
