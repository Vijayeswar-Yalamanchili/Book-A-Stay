import React, { useState, useContext } from 'react'
import { Button, Container, Nav, Navbar, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser}  from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/book-a-stay.png'
import { useLogout } from '../hooks/UseLogout'
import ApiRoutes from '../utils/ApiRoutes'
import AxiosService from '../utils/AxiosService'
import { UserAuthContext } from '../contextApi/UserAuthContextComponent'

function AppNavbar() {
  
  let {userAuth} = useContext(UserAuthContext)
  const navigate = useNavigate()
  let logout = useLogout()
  let getLoginToken = localStorage.getItem('loginToken')
  const [myProfile, setMyProfile] = useState(false)

  const handleMyProfile = () => setMyProfile(!myProfile)

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
          <Nav className='navBtnsAFterLogin d-flex justify-content-between align-items-center'>
            <Button className='authBtns' onClick={handleLogout}>Logout</Button>
            <Button className='authBtns' onClick={()=>handleMyProfile()}>
              <FontAwesomeIcon icon={faUser} style={{ height : '1.25rem'}}/>
            </Button>
          </Nav> : 
          <Nav className='navBtns d-flex justify-content-between align-items-center'>
            <Button className='authBtns' onClick={()=> navigate('/register')}>Sign Up</Button>
            <Button className='authBtns' onClick={()=> navigate('/login')}>Login</Button>
          </Nav>
        }
      </Container>
    </Navbar>

    <div>
      {
        myProfile ? 
          <div className="myProfileDrpdwn list-group list-group-flush py-2 px-3">
            <div className='listMenuUserName list-group-item list-group-item-action'>
              {/* <Image className="userImage my-2" src={`https://chillhub-social-platform.onrender.com/${user[0].imageDP}`} roundedCircle/> */}
              <div><b>Welcome, {userAuth[0]?.firstName}</b></div>
            </div>
            <Link to={'/myProfile'} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#0d6efd", width:"18px", height:"16px"}}/>My Profile
              </span>
            </Link>
          </div> : null
      }
    </div>
  </>
}

export default AppNavbar