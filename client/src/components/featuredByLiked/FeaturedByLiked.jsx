import React from 'react'
import { Card, Button, Row } from 'react-bootstrap'
import courtyard from '../../assets/courtyard.jpeg'
import ITCChola from '../../assets/ITCChola.jpeg'
import ThePark from '../../assets/ThePark.jpeg'
import Novotel from '../../assets/Novotel.jpeg'
import ITCKohenur from '../../assets/ITCKohenur.jpeg'
import './featuredByLiked.css'

function FeaturedByLiked() {
  return <>
    <div className='my-5'>
        <h5>Most Liked Stays</h5>
        <div className='d-flex justify-content-start ' style={{gap : "8px"}}>
          <Row xs={1} className='mx-auto cityRows'>
            <Card style={{ width: '15rem'}}>
              <Card.Img variant="top" src={courtyard} className='cardImageType'/>
              <Card.Body>
                <h5>CourtYard</h5>
                <p>Bengaluru</p>
                <h6>Starting from {'\u20B9'}12,980/- onwards</h6>
                <div className="rating">
                  <Button variant='none' className='me-1' style={{backgroundColor : "#003580", color : "white"}}>9.3</Button>
                  <span>Excellent</span>
                </div>
              </Card.Body>
            </Card>
  
            <Card style={{ width: '15rem'}}>
              <Card.Img variant="top" src={ITCChola} className='cardImageType'/>
              <Card.Body>
                <h5>ITC Grand Chola</h5>
                <p>Chennai</p>
                <h6>Starting from {'\u20B9'}12,914/- onwards</h6>
                <div className="rating">
                  <Button variant='none' className='me-1' style={{backgroundColor : "#003580", color : "white"}}>9.2</Button>
                  <span>Excellent</span>
                </div>
              </Card.Body>
            </Card>
  
            <Card style={{ width: '15rem'}}>
              <Card.Img variant="top" src={ThePark} className='cardImageType'/>
              <Card.Body>
                <h5>The park</h5>
                <p>Chennai</p>
                <h6>Starting from {'\u20B9'}6,185/- onwards</h6>
                <div className="rating">
                  <Button variant='none' className='me-1' style={{backgroundColor : "#003580", color : "white"}}>8.8</Button>
                  <span>Excellent</span>
                </div>
              </Card.Body>
            </Card>
  
            <Card style={{ width: '15rem'}}>
              <Card.Img variant="top" src={Novotel} className='cardImageType'/>
              <Card.Body>
                <h5>Novotel</h5>
                <p>Vizag alias Visakhapatnam</p>
                <h6>Starting from {'\u20B9'}9,438/- onwards</h6>
                <div className="rating">
                  <Button variant='none' className='me-1' style={{backgroundColor : "#003580", color : "white"}}>9</Button>
                  <span>Excellent</span>
                </div>
              </Card.Body>
            </Card>
  
            <Card style={{ width: '15rem'}}>
              <Card.Img variant="top" src={ITCKohenur} className='cardImageType'/>
              <Card.Body>
                <h5>ITC Kohenur</h5>
                <p>Hyderabad</p>
                <h6>Starting from {'\u20B9'}13,806/- onwards</h6>
                <div className="rating">
                  <Button variant='none' className='me-1' style={{backgroundColor : "#003580", color : "white"}}>9.5</Button>
                  <span>Excellent</span>
                </div>
              </Card.Body>
            </Card>
          </Row>
        </div>
    </div>
  </>
}

export default FeaturedByLiked