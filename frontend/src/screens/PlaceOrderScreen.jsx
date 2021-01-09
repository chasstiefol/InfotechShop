import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, FormGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  // if (!cart.shippingAddress.address) {
  //   history.push('/shipping')
  // } else if (!cart.paymentMethod) {
  //   history.push('/payment')
  // }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
    <FormContainer>
      <div className="place-page p-3 shipping-page">
      <CheckoutSteps step1 step2 step3 step4 />
          <FormGroup variant='flush'>
            <div className="keterangan">
              <h2 className="text-center font-weight-bold text-dark mb-3">Data Pembelian</h2>
              <h5 className="text-dark font-weight-bold">Pengiriman</h5>
              <p>
                <div>Alamat:  
                {' '}{cart.shippingAddress.address},{' '}{cart.shippingAddress.kecamatan},
                {' '}{cart.shippingAddress.city},
                {' '}{cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.provinsi}</div>
              </p>

              <h5 className="text-dark font-weight-bold">Pembayaran</h5>
              <div>Metode: 
              {' '}{cart.paymentMethod}
              </div>
              <h5 className="text-dark font-weight-bold mt-3 mb-3">Barang yang akan Dibeli</h5>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div>
                  {cart.cartItems.map((item, index) => (
                    <div key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              )}
              </div>
          </FormGroup>
          </div>
          <div className="mt-3 shipping-page">
          <Card className="p-3">
              <div>
                <h2 className="text-dark font-weight-bold text-center mb-3">Rincian Harga</h2>
              </div>
              <div>
                <Row className="my-1">
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </div>
              <div>
                <Row className="my-1">
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </div>
              <div>
                <Row className="my-1">
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </div>
              <div>
                <Row className="my-1">
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </div>
              <div>
                {error && <Message variant='danger'>{error}</Message>}
              </div>
              <div style={{display:"flex"}} className="mt-3 mb-1">
                <Button
                  type='button'
                  className='btn-block payment-button mx-auto'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Proses
                </Button>
              </div>
          </Card>
          </div>
      </FormContainer>
    </>
  )
}

export default PlaceOrderScreen
