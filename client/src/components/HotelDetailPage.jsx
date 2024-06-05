import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faLocationPin }  from '@fortawesome/free-solid-svg-icons'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Link } from 'react-router-dom'
import hotelRoomImg from '../assets/hotelroom.jpeg'
import { SharedDataContext } from '../contextApi/SharedDataComponent'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'


function HotelDetailPage() {

    let { sharedHotelIdData } = useContext(SharedDataContext)
    const [hotelData,setHotelData] = useState('')
    const getLoginToken = localStorage.getItem('loginToken')

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

    // const handleViewImage = (image,i) => {
    //     console.log(image,i)
    // }

    const getHotelData = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.HOTELBYID.path}/${sharedHotelIdData}`,{ headers : { 'Authorization' : `${getLoginToken}`} })
            let result = res.data.getHotelData
            setHotelData(result)            
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=> {
        getHotelData()
    },[])

    return <>
        <div className='my-4'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-column'>
                    <div className='d-flex justify-content-start align-items-center' style={{gap : "2%"}}>
                        <Link to={'/'}><Button variant='none' className='px-0'><FontAwesomeIcon icon={faArrowLeftLong}/></Button></Link>
                        <h3>{hotelData.hotelName}</h3>
                    </div>
                    <span><FontAwesomeIcon icon={faLocationPin} style={{color : "gray"}}/> {hotelData.address}</span>
                    <span style={{color:"green"}}>Book to stay over {'\u20B9'}{hotelData.lowestPrice} at this stay and get free Breakfast</span>
                </div>
                <Button variant='primary'> Reserve or Book Now</Button>
            </div>

            <div className="roomImagesList my-4">
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}>
                    <Masonry gutter='0.5rem'>
                        {
                            imagesList.map((e,i) => {
                                return <img key={i} src={e.image} alt="Room Image" className='roomViewImg'/>            //onClick={()=> handleViewImage(e.image,i)}
                            })
                        }
                    </Masonry>
                </ResponsiveMasonry>
                {/* <Row xs={1} className='mx-auto cityRows'>
                {
                    imagesList.map((e,i) => {
                        return <Card key={i} style={{width : "20rem"}} className='p-0'>
                            <Card.Img src={e.image} className='roomViewImg'/>
                        </Card>
                    })
                }
                </Row> */}
            </div>

            <div className='desc d-flex justify-content-between align-items-center'>
                <div className='rightDesc px-2 py-2'>
                    <h3>Stay In {hotelData.hotelName}</h3>
                    <p>{hotelData.detailedDesc}</p>
                </div>
                <div className='leftDesc  d-flex flex-column justify-content-between align-items-start'>
                    <div className='leftDescData px-4 py-3 d-flex flex-column justify-content-between align-items-start'>
                        <h5>Perfect for Stay</h5>
                        <p>Located in center of {hotelData.city} city, It has an awesome Experience rating of about {hotelData.rating}</p>
                        <h5>{'\u20B9'}{hotelData.lowestPrice}/day</h5>
                        <Button style={{width : "100%"}}>Book now</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
}

export default HotelDetailPage