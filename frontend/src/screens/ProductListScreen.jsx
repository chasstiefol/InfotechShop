import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import '../App.css'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // useEffect(() => {
  //   dispatch({ type: PRODUCT_CREATE_RESET })

  //   if (!userInfo || !userInfo.isAdmin) {
  //     history.push('/login')
  //   }

  //   if (successCreate) {
  //     history.push(`/admin/product/${createdProduct._id}/edit`)
  //   } else {
  //     dispatch(listProducts('', pageNumber))
  //   }
  // }, [
  //   dispatch,
  //   history,
  //   userInfo,
  //   successDelete,
  //   successCreate,
  //   createdProduct,
  //   pageNumber,
  // ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
    <body className="m-0">
    <div className="container product-list mt-5">
          <h1 className="text-center font-weight-bold product-head my-3">Daftar Produk</h1>
          <Button className='my-3 ml-auto' variant="secondary" onClick={createProductHandler} href="/Product">
            <i className='fas fa-plus'></i> Tambah Produk
          </Button>
      {/* {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : ( */}
        <>
          <Table striped bordered hover responsive className='table-sm table-secondary'>
            <thead className="text-center">
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
              {/* {products.map((product) => ( */}
                <tr 
                //key={product._id}
                >
                  <td className="text-center">
                    {/* {product._id} */}
                   1
                    </td>
                  <td>
                    {/* {product.name} */}
                    Laptop Sejuta umat harga merakyat
                    </td>
                  <td className="text-center">
                    {/* ${product.price} */}
                    $6969
                    </td>
                  <td className="text-center">
                    {/* {product.category} */}
                    Komputer
                    </td>
                  <td className="text-center">
                    {/* {product.brand} */}
                    Asus
                    </td>
                    <div className="button-product-list" style={{display:"flex"}}>
                  <td className="mx-auto">
                    <LinkContainer to={`/admin/product/product-edit`}>
                      <Button variant='light' className='btn-sm '>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      //onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                  </div>
                </tr>
              {/* ))} */}
            </tbody>
            <tbody>
              {/* {products.map((product) => ( */}
                <tr 
                //key={product._id}
                >
                  <td className="text-center">
                    {/* {product._id} */}
                   2
                    </td>
                  <td>
                    {/* {product.name} */}
                    Keyboard greget untuk kamu yang hemat budget
                    </td>
                  <td className="text-center">
                    {/* ${product.price} */}
                    $ParisHEHE
                    </td>
                  <td className="text-center">
                    {/* {product.category} */}
                    Keyboard
                    </td>
                  <td className="text-center">
                    {/* {product.brand} */}
                    Rexus
                    </td>
                    <div className="button-product-list" style={{display:"flex"}}>
                  <td className="mx-auto">
                    <LinkContainer to={`/admin/product/product-edit`}>
                      <Button variant='light' className='btn-sm '>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      //onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                  </div>
                </tr>
              {/* ))} */}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      {/* )} */}  
    </div>
    </body>
    </>
  )
}

export default ProductListScreen
