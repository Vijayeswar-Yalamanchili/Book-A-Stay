import React, { useState, useEffect } from 'react'
import { Card, Button, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
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
      let res = await AxiosService.get(`${ApiRoutes.GETALLHOTELS.path}?featured=True`)
      let result = res.data.allHotels
      setFeaturedList(result)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    getFeaturedList()
  },[])

  return <>
    <div className='my-5'>
        {
          featuredList && <>
            <h5>Most Liked Stays</h5>
            <div className='d-flex justify-content-start ' style={{gap : "8px"}}>
              <Row xs={1} className='mx-auto cityRows'>
                {
                  featuredList.map((e,i) => {
                    return <Card className='px-0' style={{ width: '15rem'}} key={i}>
                      {/* <Card.Img variant="top" src={`http://localhost:7000/${e.hotelImage}`} className='cardImageType'/> */}
                      <Card.Img variant="top" src={`https://book-a-stay.onrender.com/${e?.hotelImage}`} className='cardImageType'/>
                      <Card.Body>
                        <h5>{e.name}</h5>
                        <p style={{textTransform : 'capitalize'}}>{e.city}</p>
                        <h6 style={{height : "2.5rem"}}>Starting from {e.lowestPrice}/- onwards</h6>
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
          </>}
    </div>
  </>
}

export default FeaturedByLiked