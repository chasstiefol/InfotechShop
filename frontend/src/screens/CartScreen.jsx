import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import t1 from '../Assets/1.jpg';
import './../App.css'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <div className="container-fluid p-0">
           <div className="col-sm-12">
        <h1 className="text-center font-weight-bold mb-3 text-white">Shopping Cart</h1>
        {/* {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : ( */}
          <ListGroup className="cart-list">
            {/* {cartItems.map((item) => ( */}
              <ListGroup.Item>
                <div className="row" style={{display: "flex"}}>
                  <div className="col-sm-2 my-auto">
                    <Image src={t1} fluid rounded />
                  </div>
                  <div className="col-sm-3 my-auto" style={{display: "flex"}}>
                    <Link className="mx-auto font-weight-bold text-justify">Laptop H3H3 untuk seorang programmer yang h3h3</Link>
                  </div>
                  <div className="col-sm-2 my-auto pt-4" style={{display: "flex"}}>
                    <Form.Group className="mx-auto" controlId="formBasicEmail">
                      <Form.Label>$100</Form.Label>
                    </Form.Group>

                    </div>
                  <div className="col-sm-3 my-auto" style={{display: "flex"}}>
                    <Form.Control
                      as='select'
                      className="mx-auto"
                      // value={item.qty}
                      // onChange={(e) =>
                      //   dispatch(
                      //     addToCart(item.product, Number(e.target.value))
                      //   )
                      // }
                    >
                      {/* {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))} */}
                    </Form.Control>
                  </div>
                  <div className="col-sm-2 my-5" style={{display: "flex"}}>
                    <Button
                      type='button'
                      variant='light'
                      className="mx-auto"
                      // onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            {/* ))} */}
          </ListGroup>
        {/* ) */}
        {/* } */}
      </div>
      <div className="col-sm-4 mx-auto mt-3">
        <Card className="cart-list">
          <ListGroup>
            <ListGroup.Item className="text-center">
              <h2 className="text-black-50 text-center mb-5">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                // disabled={cartItems.length === 0}
                // onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      </div>
  )
}

export default CartScreen
