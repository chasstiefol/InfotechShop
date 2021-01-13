import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Badge,
  Card,
  Button,
  Container,
  Navbar,
  NavLink,
  FormControl,
  Nav,
  Form,
  Alert,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Component/Message'
import Loader from '../Component/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  sendReceipt,
  getReceipt,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import '../App.css'
import { logout } from '../actions/userActions'
import { BsFillPersonFill, BsBag, BsSearch } from 'react-icons/bs'
import { FaStore } from 'react-icons/fa'
import { MdEmail, MdPayment, MdLocalShipping } from 'react-icons/md'
import { FiMapPin } from 'react-icons/fi'
import { ImPriceTag } from 'react-icons/im'
import { GrDocumentStore } from 'react-icons/gr'
import { AiFillShopping } from 'react-icons/ai'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderGetReceipt = useSelector((state) => state.orderGetReceipt)
  const { receipt } = orderGetReceipt

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
    dispatch(getReceipt(match.params.id))
  }, [dispatch, orderId, match])

  const orderPay = useSelector((state) => state.orderPay)

  const payHandler = () => {
    if (window.confirm('Apakah anda yakin ingin mengubah status pembayaran?')) {
      dispatch(payOrder(orderId))
      history.go(0)
    }
  }

  const orderDeliver = useSelector((state) => state.orderDeliver)

  const deliverHandler = () => {
    if (window.confirm('Apakah anda yakin ingin mengubah status pengiriman?')) {
      dispatch(deliverOrder(orderId))
      history.go(0)
    }
  }

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

  // useEffect(() => {
  //   // if (!userInfo) {
  //   //   history.push('/login')
  //   // }

  //   const addPayPalScript = async () => {
  //     const { data: clientId } = await axios.get('/api/config/paypal')
  //     const script = document.createElement('script')
  //     script.type = 'text/javascript'
  //     script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
  //     script.async = true
  //     script.onload = () => {
  //       setSdkReady(true)
  //     }
  //     document.body.appendChild(script)
  //   }

  //   if (!order || successPay || successDeliver || order._id !== orderId) {
  //     dispatch({ type: ORDER_PAY_RESET })
  //     dispatch({ type: ORDER_DELIVER_RESET })
  //     dispatch(getOrderDetails(orderId))
  //   } else if (!order.isPaid) {
  //     if (!window.paypal) {
  //       addPayPalScript()
  //     } else {
  //       setSdkReady(true)
  //     }
  //   }
  // }, [dispatch, orderId, successPay, successDeliver, order])

  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const uploadHandler = async (e) => {
    setUploading(true)

    console.log(e.target.files)

    const formData = new FormData()
    formData.append('bukti', e.target.files[0])

    await axios
      .post('/api/order/bukti', formData)
      .then((res) => {
        setImage(res.data.url)
      })
      .catch((err) => console.log(err))

    setUploading(false)
  }

  const orderReceipt = useSelector((state) => state.orderReceipt)
  const { success: successSendReceipt } = orderReceipt

  useEffect(() => {
    if (successSendReceipt) {
      alert('Bukti pembayaran berhasil dikirim')
    }
  }, [successSendReceipt])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(sendReceipt(image, orderId))
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
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
      {loading ? (
        <Loader />
      ) : (
        <div className='container'>
          <Row style={{ display: 'flex' }}>
            <Col md={5} className='mx-auto mt-4 mb-2'>
              <h2 className='text-center py-1 text-dark font-weight-bold'>
                Status Pembelian Barang
              </h2>
            </Col>
          </Row>
          <Row className='my-3'>
            <Col md={8}>
              <ListGroup variant='flush' className='order-content'>
                <ListGroup.Item>
                  <h2 className='text-center text-dark my-1'>Pengiriman</h2>
                  <p>
                    <BsFillPersonFill size='20px' className='m-0' />
                    <strong className='m-2'>Nama: </strong>
                    {order.namaPembeli}
                  </p>
                  <p>
                    <MdEmail size='20px' className='m-0' />
                    <strong className='m-2'>Email: </strong>{' '}
                    {order.emailPembeli}
                  </p>
                  <p>
                    <FiMapPin size='20px' className='m-0' />
                    <strong className='m-2'>Alamat: </strong>
                    {`${order.alamatPengiriman.alamat}, ${order.alamatPengiriman.kelurahan}, ${order.alamatPengiriman.kecamatan}, ${order.alamatPengiriman.kabupaten}`}
                  </p>
                  <p>
                    <MdLocalShipping size='20px' className='m-0' />
                    <strong className='m-2'>Status Pengiriman: </strong>
                    {order.sudahDikirim ? (
                      <Badge variant='primary'>Sudah dikirim</Badge>
                    ) : (
                      <Badge variant='secondary'>Belum dikirim</Badge>
                    )}
                  </p>
                  {userInfo.admin && !order.sudahDikirim && (
                    <Button
                      className='ml-5'
                      onClick={deliverHandler}
                      variant='primary'
                      size='sm'
                    >
                      Ubah status pengiriman
                    </Button>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2 className='text-center text-dark mt-3 mb-5'>
                    Metode Pembayaran
                  </h2>
                  <p>
                    <MdPayment size='20px' className='m-0' />
                    <strong className='m-2'>Metode: </strong>
                    {order.metodePembayaran}
                  </p>
                  <p>
                    <MdPayment size='20px' className='m-0' />
                    <strong className='m-2'>Kode Pembayaran: </strong>
                    {order.kodePembayaran.split('u')[0]}
                  </p>
                  <p>
                    <MdPayment size='20px' className='m-0' />
                    <strong className='m-2'>Status Pembayaran: </strong>
                    {order.sudahBayar ? (
                      <Badge variant='success'>Sudah dibayar</Badge>
                    ) : (
                      <Badge variant='danger'>Belum dibayar</Badge>
                    )}
                  </p>
                  {userInfo.admin && !order.sudahBayar && (
                    <Button
                      className='ml-5'
                      onClick={payHandler}
                      variant='success'
                      size='sm'
                    >
                      Ubah status pembayaran
                    </Button>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2 className='text-center text-dark mt-3 mb-5'>
                    Daftar Barang
                  </h2>
                  {order.barangPesanan && order.barangPesanan.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.barangPesanan.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.gambar}
                                alt={item.namaProduk}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product`}>{item.namaProduk}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x Rp. {item.harga} = Rp.{' '}
                              {item.qty * item.harga}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4} className='my-auto order-content'>
              <h2 className='text-center text-dark mt-3 mb-4'>
                Total Pembayaran
              </h2>
              <Row className='my-4 ml-0'>
                <AiFillShopping className='mt-1 ml-2' />
                <Col>Barang: </Col>
                <Col>
                  Rp.{' '}
                  {order.barangPesanan.reduce(
                    (acc, cur) => acc + cur.qty * cur.harga,
                    0
                  )}
                </Col>
              </Row>
              <Row className='my-4 ml-0'>
                <MdLocalShipping className='mt-1 ml-2' />
                <Col>Pengiriman: </Col>
                <Col>Rp. {order.ongkir}</Col>
              </Row>
              <Row className='my-4 ml-0'>
                <ImPriceTag className='mt-1 ml-2' />
                <Col>Total: </Col>
                <Col>Rp. {order.totalPembayaran}</Col>
              </Row>
              <Row className='px-4'>
                {userInfo.admin && receipt && receipt.length > 0 ? (
                  <a
                    className='mx-auto py-3'
                    target='blank'
                    href={receipt[receipt.length - 1].bukti[0]}
                  >
                    <Button variant='info' size='sm'>
                      Lihat bukti pembayaran
                    </Button>
                  </a>
                ) : userInfo.admin && receipt && receipt.length === 0 ? (
                  <Alert className='mx-auto' variant='danger'>
                    Belum ada bukti pembayaran
                  </Alert>
                ) : (
                  !order.sudahBayar && (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label>Upload Bukti Pembayaran</Form.Label>
                        <Form.File onChange={(e) => uploadHandler(e)} />
                        {uploading ? (
                          <Loader />
                        ) : (
                          image && (
                            <Image
                              src={image}
                              className='mt-3'
                              style={{ width: '7rem' }}
                            />
                          )
                        )}
                        <Button className='mt-4 d-block' type='submit'>
                          Submit
                        </Button>
                      </Form.Group>
                    </Form>
                  )
                )}
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
              {/* {loadingDeliver && <Loader />}
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
              )} */}
            </Col>
          </Row>
        </div>
      )}
    </Container>
  )
}

export default OrderScreen
