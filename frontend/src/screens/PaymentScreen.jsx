import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Component/FormContainer'
import CheckoutSteps from '../Component/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  useEffect(() => {
    if (!shippingAddress.address) {
      history.push('/shipping')
    }
  }, [shippingAddress, history])

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/place-order')
  }

  return (
    <FormContainer>
      <div className='shipping-page p-3'>
        <CheckoutSteps step1 step2 step3 />
        <h1 className='text-black text-center font-weight-bold'>
          Metode Pembayaran
        </h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mt-3'>
            <Form.Label className='ml-2'>
              Silahkan Pilih Metode Pembayaran yang akan Anda Gunakan:
            </Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Kartu Kredit'
                id='Kartu Kredit'
                name='paymentMethod'
                value='Kartu Kredit'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Visa'
                id='Visa'
                name='paymentMethod'
                value='Visa'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Kantor Pos'
                id='Kantor Pos'
                name='paymentMethod'
                value='Kantor Pos'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Alfamart'
                id='Alfamart'
                name='paymentMethod'
                value='Alfamart'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Indomaret'
                id='Indomaret'
                name='paymentMethod'
                value='Indomaret'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Transfer Bank'
                id='Transfer Bank'
                name='paymentMethod'
                value='Transfer Bank'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
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

export default PaymentScreen
