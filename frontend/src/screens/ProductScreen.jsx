import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar,
  InputGroup,
  NavLink,
  FormControl,
  Button,
  Dropdown,
  Form,
  Image,
  Row,
  Col,
} from 'react-bootstrap'
import '../App.css'
import Loader from '../Component/Loader'

const Product = ({ defaultValue, onEditorStateChange }, props) => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')

  const handleSelect = (e) => {
    console.log(e)
    setValue(e)
  }

  const uploadHandler = async (e) => {
    setLoading(true)

    console.log(e.target.files[0])

    const formData = new FormData()
    formData.append('gambar', e.target.files[0])

    await axios
      .post('/api/produk/upload', formData)
      .then((res) => {
        setImage(res.data.url)
      })
      .catch((err) => console.log(err))

    setLoading(false)
  }

  return (
    <body>
      <div className='container-fluid p-0 page-color'>
        <Navbar className='navbar-content'>
          <NavLink className='brand' href='/'>
            InfoTech Shop
          </NavLink>
        </Navbar>
        <div className='row'>
          <div className='col-sm-6 product-content mx-auto p-5 mt-3'>
            <h1 className='text-center font-weight-bold text-white'>
              Tambah Produk
            </h1>
            <Form.Group controlId='formBasicEmail' className='mt-3'>
              <Form.Label className='font-weight-bold mt-3 text-white'>
                Judul Produk
              </Form.Label>
              <Form.Control type='text' />
              <Form.Text className='text-muted text-white-50'>
                Kami akan menampilkan judul produk di halaman depan produk kamu.
              </Form.Text>
            </Form.Group>
            <Form.Label className='font-weight-bold text-white'>
              Kategori
            </Form.Label>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
                {value}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey='Laptop'>Laptop</Dropdown.Item>
                <Dropdown.Item eventKey='Keyboard'>Keyboard</Dropdown.Item>
                <Dropdown.Item eventKey='Mouse'>Mouse</Dropdown.Item>
                <Dropdown.Item eventKey='Monitor'>Monitor</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Group
              className='mt-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label className='font-weight-bold text-white'>
                Deskripsi Produk
              </Form.Label>
              <Form.Control as='textarea' rows={5} />
              <Form.Text className='text-muted text-white-50'>
                Jelaskan produk kamu dengan lengkap berdasarkan kategori. cth:
                produk laptop kamu harus menjelaskan semua sepsifikasi yang ada
                seperti <i>Operating system</i>, VGA, Memori, Besar Penyimpanan,
                dll.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='font-weight-bold text-white'>
                Merek
              </Form.Label>
              <Form.Control type='text' />
            </Form.Group>
            <Form.Group>
              <Form.Label className='font-weight-bold text-white'>
                Kondisi
              </Form.Label>
              <br />
              <Form.Check
                className='text-white'
                type='radio'
                label='Baru'
                name='formHorizontalRadios'
                id='formHorizontalRadios1'
              />
              <Form.Check
                className='text-white'
                type='radio'
                label='Bekas'
                name='formHorizontalRadios'
                id='formHorizontalRadios2'
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='font-weight-bold text-white'>
                Stok
              </Form.Label>
              <Form.Control type='text' />
            </Form.Group>
            <Form.Label className='font-weight-bold text-white'>
              Berat Produk
            </Form.Label>
            <InputGroup className='mb-3'>
              <FormControl
                aria-label="Recipient's username"
                aria-describedby='basic-addon2'
              />
              <InputGroup.Append>
                <InputGroup.Text id='basic-addon2'>Kg</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <Form.Label className='font-weight-bold text-white'>
              Harga
            </Form.Label>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>Rp.</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label='Amount (to the nearest dollar)' />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <Form>
              <Form.Group>
                <Form.Label className='font-weight-bold text-white'>
                  Upload Foto Produk
                </Form.Label>
                <Form.File
                  id='exampleFormControlFile1'
                  onChange={(e) => uploadHandler(e)}
                />
                {loading ? (
                  <Loader />
                ) : (
                  image && (
                    <Image
                      src={image}
                      style={{ width: '10rem' }}
                      className='mt-2'
                      fluid
                    />
                  )
                )}
              </Form.Group>
            </Form>
            <Button
              style={{ display: 'flex' }}
              className='mx-auto px-5 py-2 btn-tambah'
            >
              Tambah Produk
            </Button>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Product
