import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, Row, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faLocationPin }  from '@fortawesome/free-solid-svg-icons'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import hotelRoomImg from '../assets/hotelroom.jpeg'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'


function HotelDetailPage() {

    let {id} = useParams()
    const [hotelData,setHotelData] = useState('')
    const [roomImgs,setRoomImgs] = useState([])
    const [aminities,setAminities] = useState([])
    const getLoginToken = localStorage.getItem('loginToken')

    const getHotelData = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.HOTELBYID.path}/find/${id}`,{ headers : { 'Authorization' : `${getLoginToken}`} })
            let result = res.data.getHotelData
            setRoomImgs(result.roomImages)
            setAminities(result.aminities)
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
                        <h3>{hotelData.name}</h3>
                    </div>
                    <span className='my-1'><FontAwesomeIcon icon={faLocationPin} style={{color : "gray"}}/> {hotelData.address}</span>
                    <span style={{color:"green"}}>Pay now {'\u20B9'}500 to Reserve your here (Refundable)</span>
                </div>
                <Button variant='primary'> Pay {'\u20B9'}500 to Reserve stay</Button>
            </div>

            <div className="roomImagesList my-4">
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}>
                    <Masonry gutter='0.5rem'>
                        {
                            roomImgs.length > 0 ?
                                roomImgs.map((e,i) => {
                                    console.log(e)
                                    return <Image key={i} src={`http://localhost:7000/${e}`} alt="Room Image" className='roomViewImg'/>            //onClick={()=> handleViewImage(e.image,i)}
                                }) : null
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>

            <div className='desc d-flex justify-content-between align-items-center'>
                <div className='rightDesc px-2 py-2'>
                    <h3>Stay In {hotelData.name}</h3>
                    <p className='d-flex flex-column'>
                        {hotelData.overview}
                        <div className='d-flex flex-row mt-2' style={{gap : "5px"}}> Aminities we have : 
                            {
                                aminities.map((ele,i)=> {
                                    return <div className='label' key={i}>{ele}</div>
                                })
                            }
                        </div>
                    </p>
                </div>
                <div className='leftDesc  d-flex flex-column justify-content-between align-items-start'>
                    <div className='leftDescData px-4 py-3 d-flex flex-column justify-content-between align-items-start'>
                        <h5>Perfect for Stay</h5>
                        <p>Located in center of {hotelData.city} city, It has an awesome Experience rating of about {hotelData.rating}</p>
                        <h5>{'\u20B9'}{hotelData.lowestPrice}/day</h5>
                        <Button style={{width : "100%"}}>Pay {'\u20B9'}500 to Reserve stay</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
}

export default HotelDetailPage