import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Component/FormContainer'
import CheckoutSteps from '../Component/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import '../App.css'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [provinsi, setProvinsi] = useState(shippingAddress.provinsi)
  const [city, setCity] = useState(shippingAddress.city)
  const [kecamatan, setKecamatan] = useState(shippingAddress.kecamatan)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [address, setAddress] = useState(shippingAddress.address)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({ provinsi, city, kecamatan, postalCode, address })
    )
    history.push('/payment')
  }

  return (
    <FormContainer>
      <div className='shipping-page p-3'>
        <CheckoutSteps step1 step2 />
        <h1 className='font-weight-bold text-black text-center'>Pengiriman</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='provinsi'>
            <Form.Label className='text-black font-weight-bold'>
              Provinsi
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Masukkan Provinsi Anda'
              value={provinsi}
              required
              onChange={(e) => setProvinsi(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label className='text-black font-weight-bold'>
              Kota/Kabupaten
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Masukkan Kota/Kabupaten Anda'
              value={city}
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

          <Form.Group controlId='postalCode'>
            <Form.Label className='text-black font-weight-bold'>
              Kode Pos
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Masukkan Kode Pos Anda'
              value={postalCode}
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
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
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
  )
}

export default ShippingScreen
