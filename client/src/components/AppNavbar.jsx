import React from 'react'
import { Button, Container, Nav, Navbar, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import logo from '../assets/book-a-stay.png'
import { useLogout } from '../hooks/UseLogout'
import ApiRoutes from '../utils/ApiRoutes'
import AxiosService from '../utils/AxiosService'

function AppNavbar() {
  
  const navigate = useNavigate()
  let logout = useLogout()
  let getLoginToken = localStorage.getItem('loginToken')

  const handleLogout = async() => {
    try {
      const decodedToken = jwtDecode(getLoginToken)
      const id = decodedToken.id
      let res = await AxiosService.put(`${ApiRoutes.LOGOUT.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
      console.log(res)
      if(res.status === 200){
        logout()
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

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
          {
            getLoginToken ? 
            <Nav className='navBtns d-flex justify-content-between align-items-center'>
              <Button className='authBtns' onClick={handleLogout}>Logout</Button>
            </Nav> : 
            <Nav className='navBtns d-flex justify-content-between align-items-center'>
              <Button className='authBtns' onClick={()=> navigate('/register')}>Sign Up</Button>
              <Button className='authBtns' onClick={()=> navigate('/login')}>Login</Button>
            </Nav>
          }
        </Container>
      </Navbar>
  </>
}

export default AppNavbar