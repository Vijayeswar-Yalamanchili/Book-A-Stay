import React, { useState, useEffect, useContext } from 'react'
import AppNavbar from '../../components/AppNavbar'
import AppFooter from '../../components/Footer'
import { Container, Card, Row, Button } from 'react-bootstrap'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import { format } from 'date-fns'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import hotelRoom from '../../assets/hotelroom.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function OrdersList() {

    let {id} = useParams()
    let navigate = useNavigate()
    const [myOrderedList,setMyOrderedList] = useState([])
    const [stayData,setStayData] = useState()
    const getLoginToken = localStorage.getItem('loginToken')

    let getMyOrders = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETMYORDERS.path}/${id}`,{ headers : { 'Authorization' : `${getLoginToken}`} })
            if(res.status === 200){
                setMyOrderedList(res.data.allorders)
                setStayData(res.data.stayDetail)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=>{
        getMyOrders()
    },[])

    return <>
    <AppNavbar/>
        <Container>
            <div className='my-3'>
                {/* <Link to={'/'}><Button variant='secondary' className='my-4'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back</Button></Link> */}
                <div className='mb-3 d-flex justify-content-start align-items-center'>
                    <FontAwesomeIcon icon={faArrowLeft} className='me-3' onClick={() => navigate('/')}/>
                    <h4 className='mb-1'>My Orders</h4>                
                </div>
                <Row xs={1} md={2} className="g-3">
                {
                    myOrderedList.length > 0 ? 
                        myOrderedList.map((e,i)=>{
                            return <>
                                <Card className='orderCard px-0 mx-auto d-flex' key={i}>
                                    <div className='imagearea'>
                                        {e.hotelImage ? <Card.Img src={`https://book-a-stay.onrender.com/${e.hotelImage}`} className='orderHotelImage'/> : <Card.Img src={hotelRoom} className='orderHotelImage'/>}
                                    </div>
                                    <Card.Body className='ordertextdata'>
                                        <h4 className='mb-3'>Booking Details</h4> 
                                        <div style={{width : "100%"}} className='d-flex'><i className='orderText'>Stay Name</i>: <b className='ms-1'>{e.hotelName}</b></div>
                                        <div style={{width : "100%"}} className='d-flex'><i className='orderText'>Order Id</i>: {e.orderId ? e.orderId : <div className='ms-1' style={{color : "red"}}>Booking failed</div>}</div>
                                        <div style={{width : "100%"}} className='d-flex'><i className='orderText'>Booked From</i>: {e.from}</div>
                                        <div style={{width : "100%"}} className='d-flex'><i className='orderText'>Booked untill</i>: {e.to}</div> 
                                        <div style={{width : "100%"}} className='d-flex'><i className='orderText'>Amount Paid</i>: {e.amount/100}/-</div> 
                                        <div style={{width : "100%"}} className='d-flex'><i className='orderText'>Payment Id</i>: {e.paymentId ? e.paymentId : <div className='ms-1' style={{color : "red"}}>Booking failed</div>}</div>
                                        <div style={{width : "100%"}} className='d-flex'><i className='orderText'>Booked On</i>: {format(`${e.createdAt}`, "dd/MM/yyyy")}</div> 
                                        {/* `${format(dates[0].startDate, "dd/MM/yyyy")}` */}
                                    </Card.Body>
                                </Card>
                            </>
                        })
                    :
                    <div className='mx-auto' style={{height : "22.5rem"}}>
                        <Card style={{ width: '18rem' }} className='mx-auto my-5'>
                            <Card.Body className='mx-auto'>
                            <h5>No Orders</h5>
                            </Card.Body>
                        </Card>
                    </div>
                }
                </Row>
            </div>
        </Container>
    <AppFooter/>
    </>
}

export default OrdersList