import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Col,
  Row,
  Image,
  Navbar,
  NavLink,
  Form,
  Button,
  FormControl,
  Nav,
} from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { listProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import Loader from '../Component/Loader'
import Rating from '../Component/Rating'
import { BsSearch, BsBag, BsFillPersonFill } from 'react-icons/bs'
import { FaStore } from 'react-icons/fa'

const ProductDetailScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const productDetails = useSelector((state) => state.productDetails)
  const { error, loading, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [match, dispatch])

  const cartHandler = (id) => {
    if (!userInfo) {
      history.push('/Login')
    } else {
      dispatch(addToCart(id, 1))
      history.push('/cart')
    }
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
            <NavLink className='cart' href='/Product'>
              <FaStore className='mb-1 mr-2' />
              ADD PRODUCT
            </NavLink>
          )}
          <NavLink className='cart' href='/cart'>
            <BsBag className='mb-1 mr-2' />
            CART
          </NavLink>
          {userInfo ? (
            <>
              <NavLink className='cart' href='/Signup'>
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
      {error ? (
        <h5>{error}</h5>
      ) : loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Row>
            <Col className='p-4 text-center'>
              <Image src={product.gambar} style={{ width: '20rem' }} fluid />
            </Col>
            <Col className='p-4'>
              <h3>{product.namaProduk}</h3>
              <h3 className='text-danger py-3'>Rp {product.harga}</h3>
              {product.jumlahStok ? (
                <h5 className='text-primary py-3'>Stok Tersedia</h5>
              ) : (
                <h5 className='text-warning py-3'>Stok Habis</h5>
              )}
              <Button
                className='rounded-0 border-0 px-4 font-weight-bold add-to-cart-button'
                onClick={() => cartHandler(product._id)}
                disabled={!product.jumlahStok}
              >
                Add To Cart
              </Button>
            </Col>
          </Row>
          <Row className='p-4' style={{ maxWidth: '100%' }}>
            <Col>
              <h4 className='font-weight-bold' style={{ color: '#364f6d' }}>
                Deskripsi
              </h4>
              <p className='py-4 text-justify font-weight-bold'>
                {product.deskripsi}
              </p>
            </Col>
          </Row>
          <Row className='p-4' style={{ maxWidth: '100%' }}>
            <Col>
              <h4 className='font-weight-bold' style={{ color: '#364f6d' }}>
                Review
              </h4>
              {product.reviews && product.reviews.length === 0 ? (
                <h4>Tidak ada Review</h4>
              ) : (
                product.reviews &&
                product.reviews.map((review) => (
                  <Row>
                    <Col sm={2} className='p-3'>
                      <Image src={review.avatar} style={{ width: '2rem' }} />
                      <span className='pl-2 font-weight-bold'>
                        {review.nama}
                      </span>
                    </Col>
                    <Col sm={10} className='p-3'>
                      <Rating value={1} color='yellow' />
                      <p className='font-weight-bold'>{review.review}</p>
                    </Col>
                  </Row>
                ))
              )}
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  )
}

export default ProductDetailScreen
