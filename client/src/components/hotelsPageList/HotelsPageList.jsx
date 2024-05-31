import React from 'react'
import { Card,Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar }  from '@fortawesome/free-solid-svg-icons'
import hotelRoom from '../../assets/hotelroom.jpeg'

function HotelsPageList() {

  let hotelsList = [
    {
      roomImage: hotelRoom,
      hotelName : "Olive Hotels",
      rating : 8.9,
      experience : "Excellent",
      price : "\u20B96000",
      desc : "Room With AC - 1 bathroom - 1 king Size Bed"
    },
    {
      roomImage: hotelRoom,
      hotelName : "Olive Hotels",
      rating : 8.9,
      experience : "Excellent",
      price : "\u20B96000",
      desc : "Room With AC - 1 bathroom - 1 king Size Bed"
    },
    {
      roomImage: hotelRoom,
      hotelName : "Olive Hotels",
      rating : 8.9,
      experience : "Excellent",
      price : "\u20B96000",
      desc : "Room With AC - 1 bathroom - 1 king Size Bed"
    },
    {
      roomImage: hotelRoom,
      hotelName : "Olive Hotels",
      rating : 8.9,
      experience : "Excellent",
      price : "\u20B96000",
      desc : "Room With AC - 1 bathroom - 1 king Size Bed"
    }
  ]

  return <>
    <div className='hotelsListBlock'>
      {
        hotelsList.map((e,i) => {
          return <div className='hotelListCard' key={i}>
            <Card className='hotelCard my-3 d-flex flex-row'>
              <Card.Img src={e.roomImage} className='roomImage'/>
              <Card.Body className='d-flex justify-content-between align-items-center'>
              
                <div className='cardLeftBlock d-flex flex-column justify-content-between align-items-start'>
                  <div className='cardLeftTopBlock'>
                    <Card.Title>{e.hotelName}</Card.Title>
                    <Card.Text>{e.desc}</Card.Text>
                  </div>
                  <div className='cardLeftBottomBlock'>
                    <div className='label'>Free Wifi</div>
                    <div className='label'>Breakfast</div>
                    <div className='label'>Cab Service</div>
                  </div>
                </div>
                
                <div className='cardRightBlock d-flex flex-column justify-content-between align-items-center'>
                  <div className='cardRightTopBlock d-flex justify-content-between'>
                    <h6 className='mb-0'>{e.experience}</h6>
                    <div className='ratingBtn me-1 d-flex align-items-center'><FontAwesomeIcon icon={faStar} className='me-1'/>{e.rating}</div>
                  </div>
                  <div className='cardRightBottomBlock d-flex flex-column justify-content-between align-items-end'>
                    <div>{e.price}</div>
                    <div style={{fontSize : "0.75em"}}>Inclusive Of all taxes</div>
                    <Button variant="primary" className='availabilityBtn'>Check availabilty</Button>
                  </div>                  
                </div>

              </Card.Body>
            </Card>
          </div>          
        })
      }
    </div>
  </>
}

export default HotelsPageList