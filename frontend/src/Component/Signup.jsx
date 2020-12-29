import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, InputGroup, NavLink, FormControl, Form, Nav, Button} from 'react-bootstrap';
import '../App.css'

const Signup =()=> {
  return (
    <body>
    <div className="container-fluid p-0 page-color">
          <Navbar className="navbar-content">
            <NavLink className="brand" href="/">InfoTech Shop</NavLink>
         </Navbar>
      <div className="row">
         <div className="col-sm-7 p-5 mt-5 ml-5 pt-5">
           <h2>PROMO 12.12.</h2>
           <br/>
           <h2>BELI 5,</h2>
           <h2>NGGAK GRATIS APA-APA!</h2>
           <br/>
           <h2>BURUAN BELI!</h2>
           <h2>HARGA TERBAIK</h2>
           <h2>PASTINYA TIDAK TERJANGKAU</h2>
         </div>
         <div className="col-sm-4 form-signup p-5 pr-2">
           <h4 className="signup-form m-1 mb-5 font-weight-bold">Sign Up</h4>
          <InputGroup className="mb-4">
            <FormControl placeholder="Nama Lengkap" aria-label="Nama Lengkap" aria-describedby="basic-addon1" required/>
          </InputGroup>
          <InputGroup className="mb-4">
            <FormControl type="email" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" required/>
          </InputGroup>
          <InputGroup className="mb-4">
            <FormControl type="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
          </InputGroup>
          <Button type="submit" className="btn-form" block>SIGN UP</Button>
          <br/>
          <p className="text-center mt-3">sudah punya akun? <a href="/Login">Login</a></p>
         </div>
      </div>
      
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>
    </div>
    </body>
  );
}

export default Signup;
