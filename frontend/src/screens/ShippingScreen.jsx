import React, { useState } from 'react'
import {
  Form,
  Button,
  Container,
  Navbar,
  NavLink,
  FormControl,
  Nav,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Component/FormContainer'
import CheckoutSteps from '../Component/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { logout } from '../actions/userActions'
import { BsFillPersonFill, BsBag, BsSearch } from 'react-icons/bs'
import { FaStore } from 'react-icons/fa'
import '../App.css'

const ShippingScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [kabupaten, setCity] = useState(shippingAddress.kabupaten)
  const [kecamatan, setKecamatan] = useState(shippingAddress.kecamatan)
  const [kelurahan, setKelurahan] = useState(shippingAddress.kelurahan)
  const [kodepos, setPostalCode] = useState(shippingAddress.kodepos)
  const [noHP, setNoHP] = useState(shippingAddress.noHP)
  const [alamat, setAddress] = useState(shippingAddress.alamat)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        namaPenerima: userInfo.nama,
        alamat,
        kabupaten,
        kecamatan,
        kelurahan,
        kodepos,
        noHP,
      })
    )
    history.push('/payment')
  }

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <Container className='p-0' fluid>
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
      <FormContainer>
        <div className='shipping-page p-3 mt-4'>
          <CheckoutSteps step1 step2 />
          <h1 className='font-weight-bold text-black text-center'>
            Pengiriman
          </h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='city'>
              <Form.Label className='text-black font-weight-bold'>
                Kota/Kabupaten
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan Kota/Kabupaten Anda'
                value={kabupaten}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='kecamatan'>
              <Form.Label className='text-black font-weight-bold'>
                Kecamatan
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan Kecamatan Anda'
                value={kecamatan}
                required
                onChange={(e) => setKecamatan(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='kecamatan'>
              <Form.Label className='text-black font-weight-bold'>
                Kelurahan
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan Kelurahan Anda'
                value={kelurahan}
                required
                onChange={(e) => setKelurahan(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
              <Form.Label className='text-black font-weight-bold'>
                Kode Pos
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan Kode Pos Anda'
                value={kodepos}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label className='text-black font-weight-bold'>
                Alamat Lengkap
              </Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Masukkan Alamat Lengkap anda'
                value={alamat}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='noHP'>
              <Form.Label className='text-black font-weight-bold'>
                No. HP
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan No. HP Anda'
                value={noHP}
                required
                onChange={(e) => setNoHP(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div style={{ display: 'flex' }}>
              <Button type='submit' className='mx-auto payment-button'>
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </FormContainer>
    </Container>
  )
}

export default ShippingScreen
