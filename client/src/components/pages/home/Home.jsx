import React from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AppNavbar from '../../components/navbar/AppNavbar'

import './Home.css'

function Home() {

  const navigate = useNavigate()

  return <>
    <AppNavbar/>
    Home
  </>
}

export default Home