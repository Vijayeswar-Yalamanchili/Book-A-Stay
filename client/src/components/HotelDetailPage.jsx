import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, Image, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faLocationPin }  from '@fortawesome/free-solid-svg-icons'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import { format } from 'date-fns'
import hotelRoomImg from '../assets/hotelroom.jpeg'
import logo from '../assets/book-a-stay.png'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { UserAuthContext } from '../contextApi/UserAuthContextComponent'
import { SearchContext } from '../contextApi/SearchContextComponent'

function HotelDetailPage() {
    
    let {id} = useParams()
    let navigate = useNavigate()
    let { userAuth } = useContext(UserAuthContext)
    let { dates,options } = useContext(SearchContext)

    const [rooms,setRooms] = useState([])
    const [selectedRooms, setSelectedRooms] = useState([])
    const [hotelData,setHotelData] = useState('')
    const [roomImgs,setRoomImgs] = useState([])
    const [aminities,setAminities] = useState([])
    const [show, setShow] = useState(false)

    const getLoginToken = localStorage.getItem('loginToken')
    const decodedToken = jwtDecode(getLoginToken)

    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true)
        handleRoomSelection()
    };

    const MilliSecondsPerDay = 1000 * 60 * 60 * 24
    const dayDifference = (date1,date2) => {
      const timeDifference = Math.abs(date2?.getTime() - date1?.getTime())
      const differentDays  = Math.ceil(timeDifference / MilliSecondsPerDay)
      return differentDays
    }
  
    let stayStartDate = dates[0]?.startDate
    let stayEndDate = dates[0]?.endDate
    const daysCount = dayDifference(stayStartDate, stayEndDate)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())    
        const dates = []    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }    
        return dates
    }

    const allDates = getDatesInRange(stayStartDate,stayEndDate)

    const isRoomAvailable = (roomNumber) => {
        const isFound = roomNumber.unAvailableDates.some((date) => allDates.includes(new Date(date).getTime()))
        return !isFound
    }

    const handlePayment = async(price) => {
        const paymentData = {
            amount : price * daysCount * `${options.room}` * 100,
            currency : 'INR',
            receipt : 'receipt_01',
            currentUserId : `${userAuth[0]?._id}`,
            from :`${format(dates[0].startDate, "dd/MM/yyyy")}`,
            to : `${format(dates[0]?.endDate, "dd/MM/yyyy")}`,
            hotelId : id
        }
        try {
            if(daysCount !== 0){
                await Promise.all(selectedRooms.map((roomId)=> {
                    const roomsResponse = AxiosService.put(`${ApiRoutes.UPDATEROOMAVAILABILITY.path}/${roomId}`,
                        {dates : allDates},
                        {
                            headers : {
                                'Authorization' : `${getLoginToken}`,
                                "Content-Type" : 'application/json'
                            }
                        }
                    )
                }))
                let res = await AxiosService.post(`${ApiRoutes.ORDER.path}`,paymentData, {
                    headers : {
                        'Authorization' : `${getLoginToken}`,
                        "Content-Type" : 'application/json'
                    }
                })
                const createRPOrderResult = res.data.order
                const currentOrderId = res.data.orderData
                let options = {
                    "key": "rzp_test_U7MqWkBZipoze4", // Enter the Key ID generated from the Dashboard
                    "amount": paymentData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": paymentData.currency,
                    "name": "book-A-stay", //your business name
                    "description": "Test Transaction",
                    "image": {logo},
                    "order_id": createRPOrderResult.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response){
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature)
                        const responseBody = {...response}
                        let res = await AxiosService.post(`${ApiRoutes.VALIDATEORDER.path}/${createRPOrderResult.id}`,responseBody, {
                            headers : {
                                'Authorization' : `${getLoginToken}`,
                                "Content-Type" : 'application/json'
                            }
                        })
                        const updateOrderDataResult = res.data
                        let orderDatas = {
                            orderId : updateOrderDataResult.orderId,
                            paymentId : updateOrderDataResult.paymentId,
                            id : currentOrderId._id
                        }
                        let resData = await AxiosService.put(`${ApiRoutes.UPDATEORDERDATA.path}`,orderDatas, {
                            headers : {
                                'Authorization' : `${getLoginToken}`,
                                "Content-Type" : 'application/json'
                            }
                        })                    
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
                handleClose()
                navigate('/')
            }else{
                alert("Enter the stay dates & Room Count to proceed with booking smoothly")
            }
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

    const handleRoomSelection = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETROOMBYHOTELID.path}/${id}`,{ headers : {
                'Authorization' : `${getLoginToken}`
            }})
            setRooms(res.data.list)
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
          checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
        )
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
                    <span style={{color:"green"}}>Book this Stay for just {'\u20B9'}{hotelData.lowestPrice}/day</span>
                </div>
                <Button variant='primary' onClick={handleShow}>Select Room to book</Button>
            </div>

            <div className="roomImagesList my-4">
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}>
                    <Masonry gutter='0.5rem'>
                        {
                            roomImgs.length > 0 &&
                                roomImgs.map((e,i) => {
                                    return <Image key={i} src={`https://book-a-stay.onrender.com/${e}`} alt="Room Image" className='roomViewImg'/>
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
                            <h5>{'\u20B9'}{`${hotelData.lowestPrice}`* daysCount * `${options.room}`} ({daysCount} N /{daysCount-1} D )</h5>
                            :
                            <h5>{'\u20B9'}{`${hotelData.lowestPrice}`* 1 * `${options.room}`} (1N / 1D)</h5>
                        }                        
                        <Button style={{width : "100%"}} onClick={handleShow}>Select Room to book</Button>
                    </div>
                    
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h5>Select your Preffered Rooms :</h5>
                {
                    rooms.map((ele,i) => {
                        return <div key={i}>
                            <Card className='my-3 d-flex flex-row'>
                                <Card.Body className='d-flex flex-column'>
                                    <div><b>Room Details : </b><i>{ele[0].title},{ele[0].description},{ele[0].maxPeople} persons</i></div>
                                    <div><b>Room Price : <i>{'\u20B9'}{ele[0].price}/day</i></b></div>
                                    <div className='d-flex'>
                                        {ele[0].roomNumbers.map((roomNumber,i) => (
                                            <div className="me-2" key={i}>                                            
                                                <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isRoomAvailable(roomNumber)}/>
                                                <label>{roomNumber.number}</label>
                                            </div>
                                        ))}
                                    </div>
                                </Card.Body>
                                <Button variant="primary" onClick={()=>handlePayment(ele[0]?.price)}>Pay Now</Button>
                            </Card>
                        </div>
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default HotelDetailPage