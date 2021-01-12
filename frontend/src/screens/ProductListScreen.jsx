import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Table,
  Button,
  Navbar,
  NavLink,
  Form,
  FormControl,
  Nav,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Component/Loader'
import { listProducts, deleteProduct } from '../actions/productActions'
import { logout } from '../actions/userActions'
import { BsFillPersonFill, BsBag, BsSearch } from 'react-icons/bs'
import { FaStore, FaPlus } from 'react-icons/fa'
import ListLink from '../Component/ListLink'
import '../App.css'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.admin) {
      history.push('/')
    }
  }, [history, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Apakah anda yakin?')) {
      dispatch(deleteProduct(id))
      history.go(0)
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <>
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
      <body className='m-0'>
        <div className='container product-list mt-5'>
          <ListLink />

          <h1 className='text-center font-weight-bold product-head my-3'>
            Daftar Produk
          </h1>
          <LinkContainer to='/AddProduct'>
            <Button
              className='my-3 ml-auto text-white font-weight-bold'
              variant='primary'
            >
              <FaPlus className='mb-1' /> Tambah Produk
            </Button>
          </LinkContainer>
          {loading ? (
            <Loader />
          ) : error ? (
            <h4>{error}</h4>
          ) : (
            <>
              <Table
                striped
                bordered
                hover
                responsive
                className='table-sm table-secondary'
              >
                <thead className='text-center'>
                  <tr>
                    <th>ID</th>
                    <th>NAMA</th>
                    <th>HARGA</th>
                    <th>KATEGORI</th>
                    <th>MEREK</th>
                    <th>EDIT</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className='text-center'>{product._id}</td>
                      <td>{product.namaProduk}</td>
                      <td className='text-center'>Rp. {product.harga}</td>
                      <td className='text-center'>{product.kategori}</td>
                      <td className='text-center'>{product.merk}</td>
                      <div
                        className='button-product-list'
                        style={{ display: 'flex' }}
                      >
                        <td className='mx-auto'>
                          <LinkContainer to={`/admin/product/product-edit`}>
                            <Button variant='light' className='btn-sm '>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </body>
    </>
  )
}

export default ProductListScreen
