import React from 'react'
import { Container } from 'react-bootstrap'
import AppNavbar from '../../components/navbar/AppNavbar'
import HotelDetailPage from '../../components/hotelDetailPage/HotelDetailPage'
import Footer from '../../components/footer/Footer'

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