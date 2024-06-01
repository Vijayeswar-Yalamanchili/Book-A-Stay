import React from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin }  from '@fortawesome/free-solid-svg-icons'
import hotelRoomImg from '../assets/hotelroom.jpeg'

function HotelDetailPage() {

    let imagesList = [
        {
            image : hotelRoomImg
        },
        {
            image : hotelRoomImg
        },
        {
            image : hotelRoomImg
        },
        {
            image : hotelRoomImg
        },
        {
            image : hotelRoomImg
        },
        {
            image : hotelRoomImg
        },
        {
            image : hotelRoomImg
        },
        {
            image : hotelRoomImg
        }
    ]

    return <>
        <div className='my-4'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-column'>
                    <h3>Olive Hotels</h3>
                    <span><FontAwesomeIcon icon={faLocationPin} style={{color : "gray"}}/> Indira Nagar,Bangaluru</span>
                    <span style={{color:"green"}}>Book to stay over {'\u20B9'}6000 at this stay and get free Breakfast</span>
                </div>
                <Button variant='primary'> Reserve or Book Now</Button>
            </div>

            <div className="roomImagesList my-4">
                <Row xs={1} className='mx-auto cityRows'>
                {
                    imagesList.map((e,i) => {
                        return <Card key={i} style={{width : "20rem"}} className='p-0'>
                            <Card.Img src={e.image} className='roomViewImg'/>
                        </Card>
                    })
                }
                </Row>
            </div>

            <div className='desc d-flex justify-content-between align-items-center'>
                <div className='rightDesc px-5 py-2'>
                    <h3>Stay In Olive Hotels</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis blanditiis, repellendus ullam ratione, aspernatur ut nisi possimus autem omnis ipsam consectetur! Expedita, nobis quod voluptatum odit voluptatem nesciunt doloremque blanditiis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam porro ducimus quaerat, error nostrum consequatur eaque sed possimus sit ut itaque facere odio dignissimos laborum veritatis quis suscipit sequi.</p>
                </div>
                <div className='leftDesc  d-flex flex-column justify-content-between align-items-start'>
                    <div className='leftDescData px-4 py-3 d-flex flex-column justify-content-between align-items-start'>
                        <h5>Perfect for Stay</h5>
                        <p>Located in center of city, It has awesome Experience rating of about 9</p>
                        <h5>{'\u20B9'}6000/day</h5>
                        <Button style={{width : "100%"}}>Book now</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
}

export default HotelDetailPage