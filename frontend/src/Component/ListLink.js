import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Badge } from 'react-bootstrap'

const ListLink = () => {
  return (
    <>
      <Row className='mt-3'>
        <Col className='text-center'>
          <Link to='/product-list'>
            <h5>Daftar Produk</h5>
          </Link>
        </Col>
        <Col className='text-center'>
          <Link to='/order-list'>
            <h5>Daftar Pesanan</h5>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default ListLink
