import React from 'react'
import { Card, Button, Row } from 'react-bootstrap'
import courtyard from '../assets/courtyard.jpeg'
import ITCChola from '../assets/ITCChola.jpeg'
import ThePark from '../assets/ThePark.jpeg'
import Novotel from '../assets/Novotel.jpeg'
import ITCKohenur from '../assets/ITCKohenur.jpeg'

function FeaturedByLiked() {

  let hotelsLikedList = [
    {
      image : courtyard,
      hotelName : "CourtYard",
      location : "Bengaluru",
      desc : "Starting from \u20B912,980/- onwards",
      rating : 9.3,
      experience : "Excellent"
    },
    {
      image : ITCChola,
      hotelName : "ITC Grand Chola",
      location : "Chennai",
      desc : "Starting from \u20B912,914/- onwards",
      rating : 9.2,
      experience : "Excellent"
    },
    {
      image : ThePark,
      hotelName : "The Park",
      location : "Chennai",
      desc : "Starting from \u20B96,185/- onwards",
      rating : 8.8,
      experience : "Excellent"
    },
    {
      image : Novotel,
      hotelName : "Novotel",
      location : "Vizag alias Visakhapatnam",
      desc : "Starting from \u20B99,438/- onwards",
      rating : 9,
      experience : "Excellent"
    },
    {
      image : ITCKohenur,
      hotelName : "ITC Kohenur",
      location : "Hyderabad",
      desc : "Starting from \u20B913,806/- onwards",
      rating : 9.5,
      experience : "Excellent"
    },
  ]

  return <>
    <div className='my-5'>
        <h5>Most Liked Stays</h5>
        <div className='d-flex justify-content-start ' style={{gap : "8px"}}>
          <Row xs={1} className='mx-auto cityRows'>
            {
              hotelsLikedList.map((e,i) => {
                return <Card className='px-0' style={{ width: '15rem'}} key={i}>
                  <Card.Img variant="top" src={e.image} className='cardImageType'/>
                  <Card.Body>
                    <h5>{e.hotelName}</h5>
                    <p>{e.location}</p>
                    <h6>{e.desc}</h6>
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