import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar,
  Jumbotron,
  Container,
  FormControl,
  Form,
  Nav,
  Button,
  NavLink,
  Image,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../App.css'
import { BsSearch, BsBag, BsFillPersonFill } from 'react-icons/bs'
import { FaStore } from 'react-icons/fa'
import { logout } from '../actions/userActions'
import { listProducts } from '../actions/productActions'
import Loader from '../Component/Loader'
import t9 from '../Assets/9.jpg'

const Signup = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <main>
      <div className='container-fluid p-0'>
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
              <NavLink className='cart' href='/AddProduct'>
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
        <img src={t9} alt='' width='100%' />
        <div className='row p-3'>
          {error ? (
            <h5>{error}</h5>
          ) : loading ? (
            <Loader />
          ) : (
            products.map((product) => (
              <div className='col-sm-2 m-3 mt-4'>
                <LinkContainer to={`/Product/${product._id}`}>
                  <Image src={product.gambar} fluid />
                </LinkContainer>
                <Link
                  to={`/Product/${product._id}`}
                  className='font-weight-bold'
                >
                  {product.namaProduk}
                </Link>
                <h6>
                  <b>
                    Rp <span style={{ letterSpacing: 1 }}>{product.harga}</span>
                  </b>
                </h6>
              </div>
            ))
          )}
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
    </main>
  )
}

export default Signup
