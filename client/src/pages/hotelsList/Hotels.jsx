import React from 'react'
import { Container } from 'react-bootstrap'
import AppNavbar from '../../components/navbar/AppNavbar'
import HotelsPageSearchBar from '../../components/hotelsPageSearchbar/HotelsPageSearchBar'
import HotelsPageList from '../../components/hotelsPageList/HotelsPageList'
import Footer from '../../components/footer/Footer'

function Hotels() {
  return <>
    <AppNavbar/>

    <Container className='hotelsPage d-flex justify-content-start'>
      <HotelsPageSearchBar/>
      <HotelsPageList/>
    </Container>

    <Footer/>
  </>
}

export default Hotels