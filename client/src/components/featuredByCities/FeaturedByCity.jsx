import React from 'react'
import { Card, Row } from 'react-bootstrap'
import bangaloreCity from '../../assets/bangaloreCity.jpeg'
import chennaiCity from '../../assets/chennaiCity.jpeg'
import hyderabadCity from '../../assets/hyderabadCity.jpeg'
import vizagCity from '../../assets/vizagCity.jpeg'

function FeaturedByCity() {
    
    let cityList = [
        {
            image : bangaloreCity,
            city : "Bengaluru",
            properties : "150 Hotels",
        },
        {
            image : chennaiCity,
            city : "Chennai",
            properties : "150 Hotels",
        },
        {
            image : hyderabadCity,
            city : "Hyderabad",
            properties : "150 Hotels",
        },
        {
            image : vizagCity,
            city : "Vizag",
            properties : "150 Hotels",
        }
    ]

  return <>
    <div className="cities my-3 mx-auto">
        <Row xs={1} className='mx-auto cityRows'>
            {
                cityList.map((e,i)=> {
                    return <Card style={{ width: '19rem', padding : "0"}} key={i}>
                        <Card.Img src={e.image} className='cardImage'/>
                        <Card.ImgOverlay className='cardCityData'>
                            <h3>{e.city}</h3>
                            <h5>{e.properties}</h5>
                        </Card.ImgOverlay>
                    </Card>
                })
            }            
        </Row>
    </div>
  </>
}

export default FeaturedByCity