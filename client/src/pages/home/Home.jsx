import React from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AppNavbar from '../../components/navbar/AppNavbar'
import './Home.css'
import SearchHotel from '../../components/searchHotel/SearchHotel'

function Home() {

  const navigate = useNavigate()

  return <>
    <AppNavbar/>
    <SearchHotel/>
    home
  </>
}

export default Home