import React from 'react'
import { Card } from 'react-bootstrap'
import './featuredByTypes.css'
import hotelsImg from '../../assets/hotels.jpeg'
import villasImg from '../../assets/villas.jpeg'
import resortsImg from '../../assets/resorts.jpeg'
import cottagesImg from '../../assets/cottages.jpeg'

function FeaturedByTypes() {
  return <>
  <div className='my-5'>
    <h5>Browse by Stay Type</h5>
    <div className='d-flex justify-content-start ' style={{gap : "8px"}}>
      <Card style={{ width: '15rem'}}>
        <Card.Img variant="top" src={hotelsImg} className='cardImageType'/>
        <Card.Body>
          <h5>Hotels</h5>
          <p className='mb-0'>10 hotels</p>
        </Card.Body>
      </Card>

      <Card style={{ width: '15rem'}}>
        <Card.Img variant="top" src={villasImg} className='cardImageType'/>
        <Card.Body>
          <h5>Villas</h5>
          <p className='mb-0'>10 Villas</p>
        </Card.Body>
      </Card>

      <Card style={{ width: '15rem'}}>
        <Card.Img variant="top" src={cottagesImg} className='cardImageType'/>
        <Card.Body>
          <h5>Cottages</h5>
          <p className='mb-0'>10 Cottages</p>
        </Card.Body>
      </Card>

      <Card style={{ width: '15rem'}}>
        <Card.Img variant="top" src={resortsImg} className='cardImageType'/>
        <Card.Body>
          <h5>Resorts</h5>
          <p className='mb-0'>10 Resorts</p>
        </Card.Body>
      </Card>

      <Card style={{ width: '15rem'}}>
        <Card.Img variant="top" src={resortsImg} className='cardImageType'/>
        <Card.Body>
          <h5>Cabins</h5>
          <p className='mb-0'>10 Cabins</p>
        </Card.Body>
      </Card>
    </div>
  </div>
    
  </>
}

export default FeaturedByTypes