import React from 'react'
import { Button, Container, Nav, Navbar, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/book-a-stay.png'

function AdminNavbar() {
  
  const navigate = useNavigate()

  return <>
    <Navbar data-bs-theme="dark" style={{backgroundColor : "#fd7e14"}}>
        <Container>
          <Navbar.Brand className='me-0'>
            <span className='appinfo'>
              <Link to={'/'} className='adminAppData d-flex justify-content-between align-items-center'>
                <Image src={logo} width={40} height={40} className='appLogo' rounded/>
                <div className='adminAppName'>book-A-stay</div>
              </Link>
            </span>
          </Navbar.Brand>
          <Nav className='adminNavBtns d-flex justify-content-between align-items-center'>
            <Button variant='none' className='adminAuthBtns' onClick={()=> navigate('/admin/register')}>Sign Up</Button>
            <Button variant='none' className='adminAuthBtns' onClick={()=> navigate('/admin')}>Login</Button>
          </Nav>
        </Container>
      </Navbar>
  </>
}

export default AdminNavbar