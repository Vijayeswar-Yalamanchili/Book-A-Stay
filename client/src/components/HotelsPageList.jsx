import React, { useState,useEffect,useContext } from 'react'
import { Card,Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar }  from '@fortawesome/free-solid-svg-icons'
import { UserStatusContext } from '../contextApi/UserLogInStatusContextComponent'
import { SharedDataContext } from '../contextApi/SharedDataComponent'
import hotelRoom from '../assets/hotelroom.jpeg'

function HotelsPageList({hotelsList}) {

  const navigate = useNavigate()
  let { isLoggedIn } = useContext(UserStatusContext)
  let { setSharedHotelIdData } = useContext(SharedDataContext)

  const handleAvailability = async(hotelId) => {
    try {
      if(isLoggedIn){
        setSharedHotelIdData(hotelId)
        navigate(`/hotels/${hotelId}`)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return <>
    <div className='hotelsListBlock mt-5 mx-auto'>
      <h4>List of Stays availble</h4>
      {        
        hotelsList.length ?
          hotelsList.map((e,i) => {
            return <div className='hotelListCard' key={i}>
              <Card className='hotelCard my-3 d-flex flex-row'>
                {!e.roomPhotos ? <Card.Img src={e.roomImage} className='roomImage'/> : <Card.Img src={hotelRoom} className='roomImage'/>}
                <Card.Body className='cardrightside d-flex justify-content-between align-items-center'>

                  <div className='cardLeftBlock d-flex flex-column justify-content-between align-items-start'>
                    <div className='cardLeftTopBlock'>
                      <Card.Title>{e.hotelName}</Card.Title>
                      <Card.Text>{e.description}</Card.Text>
                      <Card.Text>{e.distance}kms from center city</Card.Text>
                    </div>
                    <div className='cardLeftBottomBlock'>
                      {
                        e.aminities.map((ele,i)=> {
                          return <div className='label' key={i}>{ele}</div>
                        })
                      }
                    </div>
                  </div>
                    
                  <div className='cardRightBlock d-flex flex-column justify-content-between align-items-center'>
                    <div className='cardRightTopBlock d-flex justify-content-between'>
                      <h6 className='mb-0'>{e.experience}</h6>
                      <div className='ratingBtn me-1 d-flex align-items-center'><FontAwesomeIcon icon={faStar} className='me-1'/>{e.rating}</div>
                    </div>
                    <div className='cardRightBottomBlock d-flex flex-column justify-content-between align-items-end'>
                      <div>{'\u20B9'}{e.lowestPrice}</div>
                      <div style={{fontSize : "0.75em"}}>Inclusive Of all taxes</div>
                      <Button variant="primary" className='availabilityBtn' onClick={()=> handleAvailability(e._id)}>Check availabilty</Button>
                    </div>                  
                  </div>

                </Card.Body>
              </Card>
            </div>          
          })
          :
          <Card style={{ width: '18rem' }} className='mx-auto my-5'>
            <Card.Body className='mx-auto'>
              <h5>No Hotels Available</h5>
            </Card.Body>
          </Card>
      }
    </div>
  </>
}

export default HotelsPageList