import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, Container, FormGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import t6 from '../Assets/6.jpg';
import '../App.css'
import Profile from '../Assets/Profile.jpg'
import Raw from '../Assets/Raw.jpg'

const ProductScreen = ({ history, match }) => {
  // const [qty, setQty] = useState(1)
  // const [rating, setRating] = useState(0)
  // const [comment, setComment] = useState('')

  // const dispatch = useDispatch()

  // const productDetails = useSelector((state) => state.productDetails)
  // const { loading, error, product } = productDetails

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  // const productReviewCreate = useSelector((state) => state.productReviewCreate)
  // const {
  //   success: successProductReview,
  //   loading: loadingProductReview,
  //   error: errorProductReview,
  // } = productReviewCreate

  // useEffect(() => {
  //   if (successProductReview) {
  //     setRating(0)
  //     setComment('')
  //   }
  //   if (!product._id || product._id !== match.params.id) {
  //     dispatch(listProductDetails(match.params.id))
  //     dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
  //   }
  // }, [dispatch, match, successProductReview])

  // const addToCartHandler = () => {
  //   history.push(`/cart/${match.params.id}?qty=${qty}`)
  // }

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   dispatch(
  //     createProductReview(match.params.id, {
  //       rating,
  //       comment,
  //     })
  //   )
  // }

  return (
    <>
      {/* <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link> */}
      {
      // loading ? (
      //   <Loader />
      // ) : error ? (
      //   <Message variant='danger'>{error}</Message>
      // ) : 
      (
        <>
          <Meta title="Laptop H3H3 untuk yang H3H3" />
          <Container className="px-4 py-3" fluid>
            
          <Row>
            <Col md={12} className="produk py-3">
            <Row>
              <Col md={4} className="mb-3" style={{display:"flex"}}>
                <Image src={t6} className="mx-auto my-auto" fluid width="100%"/>
              </Col>
              <Col md={8}>
              <FormGroup>
                  <h3 className="font-weight-bold">Headset Rexus Billionaire GX-3080JX with max. 15db Good Bass</h3>
                  <div className="pl-3 pt-3">
                  <h5 className="font-weight-bold">Rating</h5>
                  <p>4.5 dari 5</p>
                  {/* <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  /> */}
                  </div>
                <div className="pl-3 pt-3">
                  <h5 className="font-weight-bold">Spesifikasi Barang</h5>
                   <Form.Group
                    as={Row}
                    controlId='formPlaintextName'
                  >
                    <Form.Label column className='col-md-3'>
                      Kategori
                    </Form.Label>
                    <Col className='col-md-5'>
                      <p className="ml-3">Laptop</p> 
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId='formPlaintextName'
                  >
                    <Form.Label column className='col-md-3'>
                      Merek
                    </Form.Label>
                    <Col className='col-md-5'>
                      <p className="ml-3">Asus</p> 
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId='formPlaintextName'
                  >
                    <Form.Label column className='col-md-3'>
                      Kondisi
                    </Form.Label>
                    <Col className='col-md-5'>
                      <p className="ml-3">Baru</p> 
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId='formPlaintextName'
                  >
                    <Form.Label column className='col-md-3'>
                      Berat
                    </Form.Label>
                    <Col className='col-md-5'>
                      <p className="ml-3">3 Kilogram</p> 
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId='formPlaintextName'
                  >
                    <Form.Label column className='col-md-3'>
                      Stok
                    </Form.Label>
                    <Col className='col-md-5'>
                      <p className="ml-3">Tersisa -1 Buah</p> 
                    </Col>
                  </Form.Group>
                  </div>
                <div className="text-justify pl-3 pt-3">
                  <h5 className="font-weight-bold">Deskripsi</h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum consequatur, doloremque repellendus, eius iste assumenda, totam quidem placeat numquam quibusdam molestias omnis? Sapiente minus soluta dolores voluptates neque reiciendis quo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur deleniti quia sit reprehenderit natus nisi optio inventore adipisci aspernatur quos voluptas, distinctio reiciendis ipsum assumenda quo iure! Ad, ipsa recusandae.
                </div>
              </FormGroup>
              </Col>
              </Row>
            </Col>
          </Row>

          
          <Row style={{display:"flex"}}>
            <div className="col-md-7 produk mt-3 mx-auto" fluid>
            <h2 className="text-dark mt-3 ml-3">Reviews</h2>
              {/* {product.reviews.length === 0 && <Message>No Reviews</Message>} */}
              <ListGroup variant='flush'>
                {/* {product.reviews.map((review) => ( */}
                  <ListGroup.Item 
                    // key={review._id}
                    >
                    <div style={{display:"inline-flex"}}>
                    <Image src={Raw} width="5%" roundedCircle/>
                    <p className="ml-3 my-auto font-weight-bold">Mamank H3H3</p>
                    </div>
                    <p className="text-justify">
                      {/* {review.name} */}
                      Barang aneh isinya H3H3 semua sellernya juga gajelas kek aan.
                    </p>
                    {/* <Rating value={review.rating} /> */}
                    <p>
                      {/* {review.createdAt.substring(0, 10)} */}
                      </p>
                    <p>
                      {/* {review.comment} */}
                      </p>
                  </ListGroup.Item>
                  <ListGroup.Item 
                    // key={review._id}
                    >
                    <div style={{display:"inline-flex"}}>
                    <Image src={Profile} width="5%" roundedCircle/>
                    <p className="ml-3 my-auto font-weight-bold">Mamank Japrut</p>
                    </div>
                    <p className="text-justify">
                      {/* {review.name} */}
                      Barangnya bagus, packing bagus, pengiriman oke, sellernya juga ramah, semua baik cuma saya yang tidak baik jadi saya kasih bintang 1.
                    </p>
                    {/* <Rating value={review.rating} /> */}
                    <p>
                      {/* {review.createdAt.substring(0, 10)} */}
                      </p>
                    <p>
                      {/* {review.comment} */}
                      </p>
                  </ListGroup.Item>
                {/* ) */}
                {/* )} */}
                </ListGroup>
            </div>
            <Col md={4} className="produk mx-auto mt-3">
              <h2 className="text-dark text-center mt-1">Overview</h2>
                <FormGroup>
                    <Row className="my-4 mx-1">
                      <Col>Harga</Col>
                      <Col>
                        <strong>$1000</strong>
                      </Col>
                    </Row>

                    <Row className="my-4 mx-1">
                      <Col>Status</Col>
                      <Col>
                        {/* {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} */}
                        Siap Untuk Dibeli
                      </Col>
                    </Row>

                  {/* {product.countInStock > 0 && ( */}

                      <Row className="my-4 mx-1">
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            // value={qty}
                            // onChange={(e) => setQty(e.target.value)}
                          >
                            {/* {[...Array(product.countInStock).keys()].map(
                              (x) => ( */}
                                <option 
                                // key={x + 1}
                                // value={x + 1}
                                >
                                  500 Buah
                                  {/* {x + 1} */}
                                </option>
                              {/* )
                            )} */}
                          </Form.Control>
                        </Col>
                      </Row>
                  {/* )} */}
                    <div style={{display:"flex"}}>
                    <Button
                      // onClick={addToCartHandler}
                      className='px-5 mx-auto'
                      variant="secondary"
                      type='button'
                      // disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                    </div>
                </FormGroup>
            </Col>
          </Row>

          <Row style={{display:"flex"}}>
            <Col md={6} className="produk mt-3 mx-auto">
                <FormGroup>
                  <h2 className="text-dark mt-3 text-center">Write a Customer Review</h2>
                  {/* {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )} */}
                  {/* {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )} */}
                  {/* {userInfo ? ( */}
                    <Form 
                      // onSubmit={submitHandler}
                      >
                      <Form.Group controlId='rating'>
                        <Form.Label className="font-weight-bold">Rating</Form.Label>
                        <Form.Control
                          as='select'
                          // value={rating}
                          // onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label className="font-weight-bold">Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          // value={comment}
                          // onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <div style={{display:"flex"}}>
                      <Button
                        // disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                        className="mx-auto mb-3"
                      >
                        Submit
                      </Button>
                      </div>
                    </Form>
                  {/* ) : ( */}
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  {/* )} */}
              </FormGroup>
            </Col>
          </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default ProductScreen
