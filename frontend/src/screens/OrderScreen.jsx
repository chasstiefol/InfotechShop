import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import '../App.css'
import {BsFillPersonFill} from 'react-icons/bs'
import {MdEmail, MdPayment, MdLocalShipping} from 'react-icons/md'
import {FiMapPin} from 'react-icons/fi'
import {ImPriceTag} from 'react-icons/im'
import {GrDocumentStore} from 'react-icons/gr'
import {AiFillShopping} from 'react-icons/ai'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    // order.itemsPrice = addDecimals(
    //   order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    // )
  }

  useEffect(() => {
    // if (!userInfo) {
    //   history.push('/login')
    // }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) 
  // : error ? (
  //   <Message variant='danger'>{error}</Message>
  // ) 
  : (
    <>
    <div className="container">
      <Row style={{display: "flex"}}>
        <Col md={5} className="mx-auto mt-4 mb-2">
        <h2 className="text-center py-1 order-screen font-weight-bold">Status Pembelian Barang
        {/* {order._id} */}
        </h2>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={8}>
          <ListGroup variant='flush' className="order-content">
            <ListGroup.Item>
              <h2 className="text-center text-dark my-1">Pengiriman</h2>
              <p>
                <BsFillPersonFill size="20px" className="m-0"/>
                <strong className="m-2">Nama: </strong> 
                Reezyx
                {/* {order.user.name} */}
              </p>
              <p>
                <MdEmail size="20px" className="m-0"/>
                <strong className="m-2">Email: </strong>{' '}
                Mamankjaprut@gmail.com
                {/* <a href={`mailto:${order.user.email}`}>{order.user.email}</a> */}
              </p>
              <p>
                <FiMapPin size="20px" className="m-0"/>
                <strong className="m-2">Alamat: </strong>
                Planet antah berantah yang aku pun tak tahu dimana tapi kalo iri BILANG BOS hahay papale papale
                {/* {order.shippingAddress.address}, {order.shippingAddress.kecamatan}{' '}
                {order.shippingAddress.city},{' '}
                {order.shippingAddress.provinsi},{' '}{order.shippingAddress.postalcode} */}
              </p>
              {/* {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on 
                 {order.deliveredAt}
                </Message>
              ) : ( */}
                {/* <Message variant='danger'>Not Delivered</Message>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="text-center text-dark mt-3 mb-5">Metode Pembayaran</h2>
              <p>
                <MdPayment size="20px" className="m-0"/>
                <strong className="m-2">Metode: </strong>
                {/* {order.paymentMethod} */}Bank H3H3
              </p>
              {/* {order.isPaid ? (
                <Message variant='success'>Paid on 
                {order.paidAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="text-center text-dark mt-3 mb-5">Daftar Barang</h2>
              {/* {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : ( */}
                <ListGroup variant='flush'>
                  {/* {order.orderItems.map((item, index) => ( */}
                    <ListGroup.Item 
                      //key={index}
                      >
                      <Row>
                        <Col md={1}>
                          <Image
                            //src={item.image}
                            //alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product`}>
                            {/* {item.name} */}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {/* {item.qty} x ${item.price} = ${item.qty * item.price} */}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  {/* ))} */}
                </ListGroup>
              {/* )} */}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} className="my-auto order-content">
                <h2 className="text-center text-dark mt-3 mb-4">Total Pembayaran</h2>
                <Row className="my-4 ml-0">
                  <AiFillShopping className="mt-1 ml-2"/>
                  <Col>Barang: </Col>
                  <Col>
                  {/* ${order.itemsPrice} */}
                  $100
                  </Col>
                </Row>
                <Row className="my-4 ml-0">
                  <MdLocalShipping className="mt-1 ml-2"/>
                  <Col>Pengiriman: </Col>
                  <Col>
                  {/* ${order.shippingPrice} */}
                  $10
                  </Col>
                </Row>
                <Row className="my-4 ml-0">
                  <GrDocumentStore className="mt-1 ml-2"/>
                  <Col>Pajak: </Col>
                  <Col>
                  {/* ${order.taxPrice} */}
                  $1
                  </Col>
                </Row>
                <Row className="my-4 ml-0">
                  <ImPriceTag className="mt-1 ml-2"/>
                  <Col>Total: </Col>
                  <Col>
                  {/* ${order.totalPrice} */}
                  $-100
                  </Col>
                </Row>
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item> */}
              {/* )} */}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                    <Button
                      type='button'
                      className='btn btn-block my-2'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                )}
        </Col>
      </Row>
      </div>
    </>
  )
}

export default OrderScreen
