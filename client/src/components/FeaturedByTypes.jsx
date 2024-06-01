import React from 'react'
import { Card, Row } from 'react-bootstrap'
import hotelsImg from '../assets/hotels.jpeg'
import villasImg from '../assets/villas.jpeg'
import resortsImg from '../assets/resorts.jpeg'
import cottagesImg from '../assets/cottages.jpeg'
import cabinsImg from '../assets/cabins.jpeg'

function FeaturedByTypes() {

  let stayTypesList = [
    {
      image : hotelsImg,
      type : "Hotels",
      count : "10 hotels"
    },
    {
      image : villasImg,
      type : "Villas",
      count : "10 hotels"
    },
    {
      image : resortsImg,
      type : "Resorts",
      count : "10 hotels"
    },
    {
      image : cottagesImg,
      type : "Cottages",
      count : "10 hotels"
    },
    {
      image : cabinsImg,
      type : "Cabins",
      count : "10 hotels"
    },
  ]

  return <>
  <div className='my-5'>
    <h5>Browse by Stay Type</h5>
    <div className='d-flex justify-content-start' style={{gap : "8px"}}>
      <Row xs={1} className='mx-auto cityRows'>
        {
          stayTypesList.map((e,i)=> {
            return <Card className='px-0' style={{ width: '15rem'}} key={i}>
              <Card.Img variant="top" src={e.image} className='cardImageType'/>
              <Card.Body>
                <h5>{e.type}</h5>
                <p className='mb-0'>{e.count}</p>
              </Card.Body>
            </Card>
          })
        }
      </Row>
    </div>
  </div>
    
  </>
}

export default FeaturedByTypes