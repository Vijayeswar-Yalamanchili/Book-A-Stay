import React, { useState, useEffect, useContext } from 'react'
import { Button, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faLocationPin }  from '@fortawesome/free-solid-svg-icons'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import hotelRoomImg from '../assets/hotelroom.jpeg'
import logo from '../assets/book-a-stay.png'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { SearchContext } from '../contextApi/SearchContextComponent'

function HotelDetailPage() {

    let {id} = useParams()
    let { dates,city,options } = useContext(SearchContext)
    console.log(city,dates,options)

    const [hotelData,setHotelData] = useState('')
    const [roomImgs,setRoomImgs] = useState([])
    const [aminities,setAminities] = useState([])
    const getLoginToken = localStorage.getItem('loginToken')
    const decodedToken = jwtDecode(getLoginToken)

    const MilliSecondsPerDay = 1000 * 60 * 60 * 24
    const dayDifference = (date1,date2) => {
      const timeDifference = Math.abs(date2.getTime() - date1.getTime())
      const differentDays  = Math.ceil(timeDifference / MilliSecondsPerDay)
      return differentDays
    }
  
    let startDate = dates[0].startDate
    let endDate = dates[0].endDate
    const daysCount = dayDifference(startDate, endDate)
    console.log(daysCount)

    const handlePayment = async(e) => {
        const paymentData = {
            amount : `${hotelData.lowestPrice}`* daysCount * `${options.room}` * 100,
            currency : 'INR',
            receipt : 'receipt_01'
        }
        try {
            let res = await AxiosService.post(`${ApiRoutes.ORDER.path}`,paymentData, {
                headers : {
                    'Authorization' : `${getLoginToken}`,
                    "Content-Type" : 'application/json'
                }
            })
            const result = res.data.order
            console.log(result)

            let options = {
                "key": "rzp_test_U7MqWkBZipoze4", // Enter the Key ID generated from the Dashboard
                "amount": paymentData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": paymentData.currency,
                "name": "book-A-stay", //your business name
                "description": "Test Transaction",
                "image": {logo},
                "order_id": result.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": async function (response){
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature)
                    const responseBody = {...response}
                    let res = await AxiosService.post(`${ApiRoutes.VALIDATEORDER.path}`,responseBody, {
                        headers : {
                            'Authorization' : `${getLoginToken}`,
                            "Content-Type" : 'application/json'
                        }
                    })
                    const result = res.data
                    // console.log(result)
                },
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                    "name": `${decodedToken.firstName} ${decodedToken.lastName}`, //your customer's name
                    "email": `${decodedToken.email}`, 
                    "contact": `${decodedToken.mobile}`  //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#0D6EFD"
                }
            }
            let rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response){
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
            })
            rzp1.open();
            e.preventDefault();
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

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
                    <span className='my-2'><FontAwesomeIcon icon={faLocationPin} style={{color : "gray"}}/> {hotelData.address}</span>
                    {/* <span style={{color:"green"}}>Now Pay {'\u20B9'}500 to Reserve your stay here (Refundable)</span> */}
                    <span style={{color:"green"}}>Book this Stay for just {'\u20B9'}{hotelData.lowestPrice}/day</span>
                </div>
                <Button variant='primary' onClick={handlePayment}>Book Now</Button>
            </div>

            <div className="roomImagesList my-4">
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}>
                    <Masonry gutter='0.5rem'>
                        {
                            roomImgs.length > 0 &&
                                roomImgs.map((e,i) => {
                                    return <Image key={i} src={`http://localhost:7000/${e}`} alt="Room Image" className='roomViewImg'/>            //onClick={()=> handleViewImage(e.image,i)}
                                }) 
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>

            <div className='desc d-flex justify-content-between align-items-center'>
                <div className='rightDesc px-2 py-2'>
                    <h3>Stay In {hotelData.name}</h3>
                    <p className='d-flex flex-column'>
                        {hotelData.overview}
                        <div className='d-flex flex-row mt-2' style={{gap : "5px"}}> <i>Aminities we have :</i> 
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
                        {
                            daysCount > 1 ? 
                            <h5>{'\u20B9'}{`${hotelData.lowestPrice}`* daysCount * `${options.room}`} ({daysCount} nights)</h5>
                            :
                            <h5>{'\u20B9'}{`${hotelData.lowestPrice}`* 1 * `${options.room}`} (1 night)</h5>
                        }                        
                        <Button style={{width : "100%"}} onClick={handlePayment}>Book Now</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
}

export default HotelDetailPage