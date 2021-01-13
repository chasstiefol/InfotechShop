import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
  Navbar,
  NavLink,
  Nav,
  FormControl,
} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { logout } from '../actions/userActions'
import Message from '../Component/Message'
import { FaTrash, FaStore } from 'react-icons/fa'
import { BsSearch, BsBag, BsFillPersonFill } from 'react-icons/bs'
import './../App.css'

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
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
            <NavLink className='cart' href='/product-lis'>
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
      <h1 className='text-center font-weight-bold mb-3 text-dark'>
        Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <>
          {cartItems && (
            <h4 className='text-right mr-4 my-3'>
              Total Harga: Rp.
              {cartItems.reduce((acc, cur) => acc + cur.harga * cur.qty, 0)}
            </h4>
          )}
          <ListGroup className='cart-list mb-2'>
            {cartItems &&
              cartItems.map((item) => (
                <ListGroup.Item>
                  <div className='row'>
                    <div className='col-sm-2 my-auto'>
                      <Image src={item.gambar} fluid rounded />
                    </div>
                    <div className='col-sm-3 my-auto'>
                      <Link
                        to={`/Product/${item._id}`}
                        className='mx-auto font-weight-bold text-justify'
                      >
                        {item.namaProduk}
                      </Link>
                    </div>
                    <div className='col-sm-2 my-auto pt-4'>
                      <Form.Group
                        className='mx-auto font-weight-bold'
                        controlId='formBasicEmail'
                      >
                        <Form.Label>
                          Rp.{parseInt(item.harga) * parseInt(item.qty)}
                        </Form.Label>
                      </Form.Group>
                    </div>
                    <div className='col-sm-3 my-auto'>
                      <Form.Control
                        as='select'
                        value={parseInt(item.qty)}
                        onChange={(e) =>
                          dispatch(addToCart(item.produk, e.target.value))
                        }
                      >
                        {[...Array(item.jumlahStok).keys()].map((x) => (
                          <option value={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </div>
                    <div className='col-sm-2 my-auto'>
                      <Button
                        type='button'
                        variant='link'
                        className='mx-auto'
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className='mb-1' />
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
          <Container clasName='mx-auto py-4'>
            <Card
              className='cart-list p-2 float-right'
              style={{ width: '15rem' }}
            >
              <Button
                variant='warning'
                className='font-weight-bold text-white'
                onClick={() => history.push('/shipping')}
              >
                Proceed To Checkout
              </Button>
            </Card>
          </Container>
        </>
      )}
    </Container>
  )
}

export default CartScreen
