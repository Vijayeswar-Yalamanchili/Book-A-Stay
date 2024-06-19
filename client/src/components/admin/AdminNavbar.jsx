import React, { useState } from 'react'
import { Button, Container, Nav, Navbar, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser}  from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/book-a-stay.png'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'

function AdminNavbar() {

  const navigate = useNavigate()
  let getLoginToken = localStorage.getItem('adminLoginToken')
  const [myProfile, setMyProfile] = useState(false)
  
  const handleMyProfile = () => setMyProfile(!myProfile)

  const handleLogout = async() => {
    try {
      const decodedToken = jwtDecode(getLoginToken)
      const id = decodedToken.id
      let res = await AxiosService.put(`${ApiRoutes.ADMINLOGOUT.path}/${id}`,{},{ headers : { 'Authorization' : ` ${getLoginToken}`}})
      if(res.status === 200){
        toast.success("Logged Out Successfully")
        localStorage.clear()
        navigate('/admin')
      }
    } catch (error) {console.log(error.message)
      toast.error(error.response.data.message || error.message)
    }
  }

  return <>
    <Navbar data-bs-theme="dark" style={{backgroundColor : "#fd7e14"}}>
      <Container>
        <Navbar.Brand className='me-0'>
          <span className='appinfo'>
            {
              getLoginToken ? 
                <Link to={'/admin/dashboard'} className='adminAppData d-flex justify-content-between align-items-center'>
                  <Image src={logo} width={40} height={40} className='appLogo' rounded/>
                  <div className='adminAppName'>book-A-stay</div>
                </Link> : 
                <Link to={'/admin'} className='adminAppData d-flex justify-content-between align-items-center'>
                  <Image src={logo} width={40} height={40} className='appLogo' rounded/>
                  <div className='adminAppName'>book-A-stay</div>
              </Link>
            }
          </span>
        </Navbar.Brand>

        {
          getLoginToken ? 
          <Nav className='navBtnsAFterLogin navBtnsAFterAdminLogin  d-flex justify-content-between align-items-center'>
            <Button className='adminAuthBtns' onClick={handleLogout}>Logout</Button>
            <Button className='adminAuthBtns usericon' onClick={()=>handleMyProfile()}>
              <FontAwesomeIcon icon={faUser} style={{ height : '1.25rem'}}/>
            </Button>
          </Nav> : 
          <Nav className='navBtns d-flex justify-content-between align-items-center'>
            <Button className='adminAuthBtns' onClick={()=> navigate('/admin/register')}>Sign Up</Button>
            <Button className='adminAuthBtns' onClick={()=> navigate('/admin')}>Login</Button>
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
              <div><b>Welcome Admin !!!</b></div>
            </div>
            <Link to={'/admin/myProfile'} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#0d6efd", width:"18px", height:"16px"}}/>My Profile
              </span>
            </Link>
          </div> : null
      }
    </div>
  </>
}

export default AdminNavbar