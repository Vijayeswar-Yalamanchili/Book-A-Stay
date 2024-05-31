import React from 'react'
import { Button, Container, Nav, Navbar, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/book-a-stay.png'
import './AppNavbar.css'

function AppNavbar() {
  
  const navigate = useNavigate()

  return <>
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className='me-0'>
            <span className='appinfo'>
              <Link to={'/'} className='appData d-flex justify-content-between align-items-center'>
                <Image src={logo} width={40} height={40} className='appLogo' rounded/>
                <div className='appName'>book-A-stay</div>
              </Link>
            </span>
          </Navbar.Brand>
          <Nav className='navBtns d-flex justify-content-between align-items-center'>
            <Button className='authBtns' onClick={()=> navigate('/register')}>Sign Up</Button>
            <Button className='authBtns' onClick={()=> navigate('/login')}>Login</Button>
          </Nav>
        </Container>
      </Navbar>
  </>
}

export default AppNavbar