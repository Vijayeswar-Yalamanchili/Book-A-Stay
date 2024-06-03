import React from 'react'
import { Container } from 'react-bootstrap'
import AppNavbar from '../../components/AppNavbar'
import HotelDetailPage from '../../components/HotelDetailPage'
import Footer from '../../components/Footer'

function HotelPage() {

  return <>
    <AppNavbar/>
    <Container>
      <HotelDetailPage/>      
    </Container>
    <Footer/>
  </>
}

export default HotelPage