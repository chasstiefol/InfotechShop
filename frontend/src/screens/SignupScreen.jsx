import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar,
  InputGroup,
  NavLink,
  FormControl,
  Button,
} from 'react-bootstrap'
import { register } from '../actions/userActions'
import '../App.css'

const Signup = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, error } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  const registerHandler = () => {
    dispatch(register(name, email, password))
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
            <h4 className='signup-form m-1 mb-5 font-weight-bold'>Sign Up</h4>
            {error && <p className='text-danger'>{error}</p>}
            <InputGroup className='mb-4'>
              <FormControl
                placeholder='Nama Lengkap'
                aria-label='Nama Lengkap'
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby='basic-addon1'
                required
              />
            </InputGroup>
            <InputGroup className='mb-4'>
              <FormControl
                type='email'
                placeholder='Email'
                aria-label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby='basic-addon1'
                required
              />
            </InputGroup>
            <InputGroup className='mb-4'>
              <FormControl
                type='password'
                placeholder='Password'
                aria-label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby='basic-addon1'
              />
            </InputGroup>
            <Button
              type='submit'
              onClick={registerHandler}
              className='btn-form'
              block
            >
              SIGN UP
            </Button>
            <br />
            <p className='text-center mt-3'>
              sudah punya akun? <a href='/Login'>Login</a>
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

export default Signup
