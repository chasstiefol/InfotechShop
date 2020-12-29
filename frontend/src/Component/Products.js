import React from 'react'
import products from '../products'
import { Col, Row, Image, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'

const Products = () => {
  return (
    <Row>
      {products.map((product) => (
        <Col sm={6} md={4} lg={3} className='my-3'>
          <Container>
            <LinkContainer to={`/product/${product._id}`}>
              <Image src={product.image} fluid />
            </LinkContainer>
            <Link
              to={`/product/${product._id}`}
              className='font-weight-bold text-dark'
            >
              {product.name}
            </Link>
            <Rating product={product} />
            <p className='font-weight-bold pt-3'>Rp. {product.price}</p>
          </Container>
        </Col>
      ))}
    </Row>
  )
}

export default Products
