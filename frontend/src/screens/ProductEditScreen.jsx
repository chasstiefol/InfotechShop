import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import '../App.css'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  // useEffect(() => {
  //   if (successUpdate) {
  //     dispatch({ type: PRODUCT_UPDATE_RESET })
  //     history.push('/admin/productlist')
  //   } else {
  //     if (!product.name || product._id !== productId) {
  //       dispatch(listProductDetails(productId))
  //     } else {
  //       setName(product.name)
  //       setPrice(product.price)
  //       setImage(product.image)
  //       setBrand(product.brand)
  //       setCategory(product.category)
  //       setCountInStock(product.countInStock)
  //       setDescription(product.description)
  //     }
  //   }
  // }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/product-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      <div className="container">
        <Row style={{display:"flex"}}>
          <Col md={6} className="product-edit py-3 px-4 mx-auto">
        <h1 className="text-center text-white font-weight-bold">Edit Produk</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label className="text-white">Nama Produk</Form.Label>
              <Form.Control
                type='name'
                placeholder='Masukkan Nama'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label className="text-white">Harga</Form.Label>
              <Form.Control
                type='number'
                placeholder='Masukkan Harga'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label className="text-white">Foto</Form.Label>
              <Form.File
                id='image-file'
                label='Pilih Foto'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label className="text-white">Merek</Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan Merek Produk'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label className="text-white">Banyak Stok</Form.Label>
              <Form.Control
                type='number'
                placeholder='Masukkan Stok'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label className="text-white">Kategori</Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan Kategori'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label className="text-white">Deskripsi</Form.Label>
              <Form.Control
                type='text'
                as="textarea"
                rows={3}
                placeholder='Jelaskan Deskripsi Produk'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div style={{display:"flex"}}>
            <Button type='submit' variant='secondary' className="mx-auto">
              Update
            </Button>
            </div>
          </Form>
        )}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProductEditScreen
