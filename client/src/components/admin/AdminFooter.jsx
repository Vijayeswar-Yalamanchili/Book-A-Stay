import React from 'react'
import { Button,Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/book-a-stay.png'

function AdminFooter() {
  return <>
  <div className='adminFooter text-white'>
    <div className="adminFooterBlock d-flex justify-content-between align-items-center">
      <div className="adminContactMail flex-column d-flex justify-content-between align-items-start">
        <div style={{fontSize : "1.5em"}} className='mb-3'>Save money, Stay Comfort</div>
        <div style={{fontSize : "1em"}}>List your Hotels? - Needed Offers? - Subscribe to know more!</div>
        <div className="adminInputField mt-2 d-flex justify-content-between align-items-center">
          <input type ="email" placeholder='Enter your Email' className='adminMailInput p-2'/>
          <Button className='adminSendMailBtn'>Subscribe</Button>
        </div>
      </div>
      <Link to={'/'} className='text-white text-decoration-none'>
        <div className='d-flex flex-column justify-content-between align-items-center'>
          <Image src={logo} className='adminLogoImg'/>
          <div style={{fontSize : "1.5em"}}>book-A-stay</div>      
        </div>
      </Link>
    </div>
    <hr style={{color : "white"}}/>
    <div className='text-center pb-2' style={{fontSize : "0.7em"}}>Copyright &copy; 2024 Vijayeswar Yalmanchili</div>
  </div>
  </>
}

export default AdminFooter