import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Row,
  Col,
  FormGroup,
  Image,
  Card,
  Container,
  Navbar,
  NavLink,
  FormControl,
  Nav,
  Form,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Component/Message'
import FormContainer from '../Component/FormContainer'
import CheckoutSteps from '../Component/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { logout } from '../actions/userActions'
import { BsFillPersonFill, BsBag, BsSearch } from 'react-icons/bs'
import { FaStore } from 'react-icons/fa'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const hargaBarang =
    cartItems && cartItems.reduce((acc, cur) => acc + cur.harga * cur.qty, 0)

  useEffect(() => {
    if (!cart.shippingAddress) {
      history.push('/shipping')
    } else if (!cart.paymentMethod) {
      history.push('/payment')
    }
  }, [cart, history])

  //   Calculate prices

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder(
        cartItems,
        cart.shippingAddress,
        cart.paymentMethod,
        hargaBarang,
        3000,
        hargaBarang + 3000
      )
    )
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
        <div className='place-page p-3 shipping-page mt-4'>
          <CheckoutSteps step1 step2 step3 step4 />
          <FormGroup variant='flush'>
            <div className='keterangan'>
              <h2 className='text-center font-weight-bold text-dark mb-3'>
                Data Pembelian
              </h2>
              <h5 className='text-dark font-weight-bold'>Pengiriman</h5>
              <p className='pl-3'>
                <strong>Nama Penerima:</strong>{' '}
                {cart.shippingAddress.namaPenerima}
              </p>
              <p className='pl-3'>
                <div>
                  <strong>Alamat</strong>: {cart.shippingAddress.alamat},{' '}
                  {cart.shippingAddress.kelurahan},{' '}
                  {cart.shippingAddress.kecamatan},{' '}
                  {cart.shippingAddress.kabupaten},{' '}
                  {cart.shippingAddress.kodepos}
                </div>
              </p>

              <h5 className='text-dark font-weight-bold'>Pembayaran</h5>
              <div className='pl-3'>
                <strong>Metode:</strong> {cart.paymentMethod}
              </div>
              <h5 className='text-dark font-weight-bold mt-3 mb-3'>
                Barang yang akan Dibeli
              </h5>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div>
                  {cart.cartItems.map((item) => (
                    <div key={item._id}>
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
                          <Link to={`/Product/${item._id}`}>
                            {item.namaProduk}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rp. {item.harga} = Rp.{' '}
                          {Number(item.qty * item.harga)}
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormGroup>
        </div>
        <div className='mt-3 shipping-page'>
          <Card className='p-3'>
            <div>
              <h2 className='text-dark font-weight-bold text-center mb-3'>
                Rincian Harga
              </h2>
            </div>
            <div>
              <Row className='my-1'>
                <Col>Harga Barang</Col>
                <Col>Rp. {hargaBarang}</Col>
              </Row>
            </div>
            <div>
              <Row className='my-1'>
                <Col>Ongkir</Col>
                <Col>Rp. 3000</Col>
              </Row>
            </div>
            <div>
              <Row className='my-1'>
                <Col>Total Pembayaran</Col>
                <Col>Rp. {hargaBarang + 3000}</Col>
              </Row>
            </div>
            <div>{error && <Message variant='danger'>{error}</Message>}</div>
            <div style={{ display: 'flex' }} className='mt-3 mb-1'>
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
    </Container>
  )
}

export default PlaceOrderScreen
