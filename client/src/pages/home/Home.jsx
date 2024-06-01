import React from 'react'
import { Container } from 'react-bootstrap'
import AppNavbar from '../../components/AppNavbar'
import SearchHotel from '../../components/SearchHotel'
import FeaturedByCity from '../../components/FeaturedByCity'
import FeaturedByTypes from '../../components/FeaturedByTypes'
import FeaturedByLiked from '../../components/FeaturedByLiked'
import Footer from '../../components/Footer'

function Home() {

  return <>
    <AppNavbar/>
    <SearchHotel/>
    <Container className='homeWrapper mt-5 mb-3 mx-auto'>
      <FeaturedByCity/>
      <FeaturedByTypes/>
      <FeaturedByLiked/>
    </Container>
    <Footer/>    
  </>
}

export default Home