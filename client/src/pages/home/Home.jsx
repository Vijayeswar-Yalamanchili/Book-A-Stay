import React from 'react'
import { Container } from 'react-bootstrap'
import './home.css'
import AppNavbar from '../../components/navbar/AppNavbar'
import SearchHotel from '../../components/searchHotel/SearchHotel'
import FeaturedByCity from '../../components/featuredByCities/FeaturedByCity'
import FeaturedByTypes from '../../components/featuredByTypes/FeaturedByTypes'
import FeaturedByLiked from '../../components/featuredByLiked/FeaturedByLiked'
import Footer from '../../components/footer/Footer'

function Home() {

  return <>
    <AppNavbar/>
    <SearchHotel/>
    <Container className='homeWrapper my-4 mx-auto'>
      <FeaturedByCity/>
      <FeaturedByTypes/>
      <FeaturedByLiked/>
    </Container>
    <Footer/>    
  </>
}

export default Home