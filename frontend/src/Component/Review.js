import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import Rating from './Rating'
import { createProductReview } from '../actions/productActions'

const Review = ({ productId }) => {
  const [value, setValue] = useState(1)
  const [review, setReview] = useState('')

  const dispatch = useDispatch()

  const changeHandler = (e) => {
    setValue(e.target.value)
  }

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success } = productReviewCreate

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(productId, review, value))
  }

  return (
    <>
      <Form className='pl-4' style={{ width: '100%' }} onSubmit={submitHandler}>
        <Form.Row>
          <Form.Control
            as='select'
            className='p-1'
            style={{ width: '4rem' }}
            onChange={changeHandler}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Form.Control>
          <Col className='pl-3'>
            <Rating value={value} />
          </Col>
        </Form.Row>
        <Form.Row className='py-3'>
          <Form.Control
            placeholder='Berikan Review Anda'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{ width: '90%' }}
          />
          <Col>
            <Button type='submit'>Kirim</Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  )
}

export default Review
