import React, { useState, useEffect } from 'react'
import { Card, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import hotelsImg from '../assets/hotels.jpeg'
import villasImg from '../assets/villas.jpeg'
import resortsImg from '../assets/resorts.jpeg'
import cottagesImg from '../assets/cottages.jpeg'
import cabinsImg from '../assets/cabins.jpeg'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

function FeaturedByTypes() {

  const [typesCount,setTypesCount] = useState()

  const getTypesCount = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.COUNTBYTYPE.path}?types=hotel,villa,resort,cottage,cabin`)
      let result = res.data.countByTypelist
      setTypesCount(result)        
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
}

useEffect(()=> {
  getTypesCount()
})

  let stayTypesList = [
    {
      image : hotelsImg,
      type : "Hotels",
      count : typesCount ?  `${typesCount[0]} Hotels` : null
    },
    {
      image : villasImg,
      type : "Villas",
      count : typesCount ?  `${typesCount[1]} Villas` : null
    },
    {
      image : resortsImg,
      type : "Resorts",
      count : typesCount ?  `${typesCount[2]} Resorts` : null
    },
    {
      image : cottagesImg,
      type : "Cottages",
      count : typesCount ?  `${typesCount[3]} Cottages` : null
    },
    {
      image : cabinsImg,
      type : "Cabins",
      count : typesCount ?  `${typesCount[4]} Cabins` : null
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