import React, { useState,useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import AppNavbar from '../../components/AppNavbar'
import SearchHotel from '../../components/SearchHotel'
import FeaturedByCity from '../../components/FeaturedByCity'
import FeaturedByTypes from '../../components/FeaturedByTypes'
import FeaturedByLiked from '../../components/FeaturedByLiked'
import Footer from '../../components/Footer'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function Home() {
  
  let navigate = useNavigate()
  let getLoginToken = localStorage.getItem('loginToken')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const getLoginStatus = async() => {
    try {
      if(!getLoginToken){
        navigate('/')
      }else{
        const decodedToken = jwtDecode(getLoginToken)
        const id = decodedToken.id
        const res = await AxiosService.get(`${ApiRoutes.GETUSERBYID.path}/${id}`, {headers : { 'Authorization' : `${getLoginToken}`}})
        let result = res.data.userById
        if(result){
          setIsLoggedIn(result.isLoggedIn)
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    getLoginStatus()
  },[isLoggedIn])

  return <>
    <AppNavbar/>
    <SearchHotel isLoggedIn={isLoggedIn}/>
    <Footer/>    
  </>
}

export default Home