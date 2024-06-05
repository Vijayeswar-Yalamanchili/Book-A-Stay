import React, { useState, useEffect } from 'react'
import { Card, Button, Row } from 'react-bootstrap'
import courtyard from '../assets/courtyard.jpeg'
import ITCChola from '../assets/ITCChola.jpeg'
import ThePark from '../assets/ThePark.jpeg'
import Novotel from '../assets/Novotel.jpeg'
import ITCKohenur from '../assets/ITCKohenur.jpeg'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

function FeaturedByLiked() {

  const [featuredList, setFeaturedList] = useState()

  const getFeaturedList = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETALLHOTELS.path}?featured=true`)
      let result = res.data.allHotels
      setFeaturedList(result)
      console.log(result)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    getFeaturedList()
  },[])

  return <>
    <div className='my-5'>
        <h5>Most Liked Stays</h5>
        <div className='d-flex justify-content-start ' style={{gap : "8px"}}>
          <Row xs={1} className='mx-auto cityRows'>
            {
              featuredList && featuredList.map((e,i) => {
                return <Card className='px-0' style={{ width: '15rem'}} key={i}>
                  <Card.Img variant="top" src={e.image} className='cardImageType'/>
                  <Card.Body>
                    <h5>{e.hotelName}</h5>
                    <p style={{textTransform : 'capitalize'}}>{e.city}</p>
                    <h6>Starting from {e.lowestPrice}/- onwards</h6>
                    <div className="rating">
                      <Button variant='none' className='me-1' style={{backgroundColor : "#003580", color : "white"}}>{e.rating}</Button>
                      <span>{e.experience}</span>
                    </div>
                  </Card.Body>
                </Card>
              })
            }
          </Row>
        </div>
    </div>
  </>
}

export default FeaturedByLiked