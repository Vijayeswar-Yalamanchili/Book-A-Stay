import React, { useState, useEffect } from 'react'
import { Card, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import bangaloreCity from '../assets/bangaloreCity.jpeg'
import chennaiCity from '../assets/chennaiCity.jpeg'
import hyderabadCity from '../assets/hyderabadCity.jpeg'
import vizagCity from '../assets/vizagCity.jpeg'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

function FeaturedByCity() {

    const [cityPropsCount,setCityPropsCount] = useState()

    const getCitiesPropsCount = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.COUNTBYCITY.path}?cities=bengaluru,chennai,hyderabad,vizag`)
            let result = res.data.countByCitylist
            setCityPropsCount(result)            
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=> {
        getCitiesPropsCount()
    })

    let cityList = [
        {
            image : bangaloreCity,
            city : "Bengaluru",
            properties : cityPropsCount ?  cityPropsCount[0] : null
        },
        {
            image : chennaiCity,
            city : "Chennai",
            properties : cityPropsCount ?  cityPropsCount[1] : null
        },
        {
            image : hyderabadCity,
            city : "Hyderabad",
            properties : cityPropsCount ?  cityPropsCount[2] : null
        },
        {
            image : vizagCity,
            city : "Vizag",
            properties : cityPropsCount ?  cityPropsCount[3] : null
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
                            <h5>{e.properties >= 0 ? e.properties : 'Loading properties'} Properties</h5>
                        </Card.ImgOverlay>
                    </Card>
                })
            }            
        </Row>
    </div>
  </>
}

export default FeaturedByCity