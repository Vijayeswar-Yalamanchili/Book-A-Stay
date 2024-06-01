import React from 'react'
import { Container } from 'react-bootstrap'
import AppNavbar from '../../components/AppNavbar'
import HotelsPageSearchBar from '../../components/HotelsPageSearchBar'
import HotelsPageList from '../../components/HotelsPageList'
import Footer from '../../components/Footer'

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