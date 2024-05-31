import React from 'react'
import { Card, Row } from 'react-bootstrap'
import './FeaturedByCity.css'
import bangaloreCity from '../../assets/bangaloreCity.jpeg'
import chennaiCity from '../../assets/chennaiCity.jpeg'
import hyderabadCity from '../../assets/hyderabadCity.jpeg'
import vizagCity from '../../assets/vizagCity.jpeg'

function FeaturedByCity() {
  return <>
    <div className="cities my-3 mx-auto">
        <Row xs={1} className='mx-auto cityRows'>
            <Card style={{ width: '19rem', padding : "0"}}>
                <Card.Img src={bangaloreCity} className='cardImage'/>
                <Card.ImgOverlay className='cardCityData'>
                    <h3>Bengaluru</h3>
                    <h5>150 Hotels</h5>
                </Card.ImgOverlay>
            </Card>

            <Card style={{ width: '19rem', padding : "0"}}>
                <Card.Img src={chennaiCity} className='cardImage'/>
                <Card.ImgOverlay className='cardCityData'>
                    <h3>Chennai</h3>
                    <h5>150 Hotels</h5>
                </Card.ImgOverlay>
            </Card>

            <Card style={{ width: '19rem', padding : "0"}}>
                <Card.Img src={hyderabadCity} className='cardImage'/>
                <Card.ImgOverlay className='cardCityData'>
                    <h3>Hyderabad</h3>
                    <h5>150 Hotels</h5>
                </Card.ImgOverlay>
            </Card>

            <Card style={{ width: '19rem', padding : "0"}}>
                <Card.Img src={vizagCity} className='cardImage'/>
                <Card.ImgOverlay className='cardCityData'>
                    <h3>Vizag</h3>
                    <h5>150 Hotels</h5>
                </Card.ImgOverlay>
            </Card>            
        </Row>
    </div>
  </>
}

export default FeaturedByCity