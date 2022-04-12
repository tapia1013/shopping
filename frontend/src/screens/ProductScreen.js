import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message'
import Rating from '../components/Rating';
// import axios from 'axios';
// import products from '../products';
import { listProductDetails } from '../actions/productActions';




const ProductScreen = ({ match, history }) => {
  // const product = products.find(p => p._id === match.params.id)
  // console.log(product);
  // const [product, setProduct] = useState({})
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${match.params.id}`)
  //     setProduct(data)
  //   }
  //   fetchProduct()
  // }, [match])

  const [qty, setQty] = useState(1)


  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails)
  const { error, loading, product } = productDetails



  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [match, dispatch])



  // get params to get id and push with history
  // /cart/34d349ms023sm342s93?qty=3
  const addToCartHandler = (e) => {
    history.push(`/cart/${match.params.id}?qt=${qty}`)
  }


  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      {
        loading
          ? (<Loader />)
          : error
            ? (<Message variant='danger'>{error}</Message>)
            : (
              <Row>
                <Col md={6}>
                  <Image fluid src={product.image} alt={product.name} />
                </Col>

                <Col md={3}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>{product.name}</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Price: ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Price:
                          </Col>

                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Status:
                          </Col>

                          <Col>
                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {
                        product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col></Col>
                              <Col>
                                <Form.Control
                                  as='select'
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {
                                    [...Array(product.countInStock).keys()].map((x) => (
                                      <option
                                        value={x + 1}
                                        key={x + 1}
                                      >
                                        {x + 1}
                                      </option>
                                    ))
                                  }
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      }

                      <ListGroup.Item>
                        <Button
                          onClick={addToCartHandler}
                          type='button'
                          className='btn-block'
                          disabled={product.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            )
      }
    </>
  )
}

export default ProductScreen