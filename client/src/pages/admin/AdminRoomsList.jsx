import React, { useEffect, useState } from 'react'
import { Container, Button, Table, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function AdminRoomsList() {

    let{id} = useParams()
    const navigate = useNavigate()
    const [lists, setList] = useState([])
    let getLoginToken = localStorage.getItem('adminLoginToken')

    const getRoomsList = async() => {  
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETROOMSLIST.path}/${id}`, { headers : { 'Authorization' : `${getLoginToken}` }})
            let result = res.data.getRoomsData
            if(res.status === 200){
                setList(result)
            }            
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleDelete = async(roomsId,roomId) => {
        try {
            console.log(roomsId,roomId)
            let res = await AxiosService.delete(`${ApiRoutes.DELETEROOM.path}/${roomsId}/${roomId}`, { headers : { 'Authorization' : `${getLoginToken}` }})
            console.log(res.data)
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
    
    const sortedData = [...lists].sort((a, b) => {
        return a.roomNumbers[0]?.number - b.roomNumbers[0]?.number;
    })

    useEffect(()=> {
        getRoomsList()
    },[])

    return <>
        <AdminNavbar/>
        <Container className='my-4'>
            <div className='mb-3 d-flex justify-content-start align-items-center'>
                <Button className='me-0' variant='none' onClick={()=> navigate(`/admin/dashboard`)}><FontAwesomeIcon icon={faArrowLeft}/></Button>
                <h4 className='mb-0'>List of Rooms</h4>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>S.No</th>
                        <th>Stay Name</th>
                        <th>Room Number</th>
                        <th>Price</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                { 
                    lists.length > 0 ?
                        sortedData.map((e,i) => (
                            e.roomNumbers.length > 0 && e.roomNumbers.map((roomdata,i) => (
                            <tr key={i} className='text-center'>
                                    <td>{i+1}</td>
                                    <td>{e.hotelName}</td>
                                    <td>{roomdata?.number}</td>
                                    <td>{e.price}/-</td>
                                    <td>{e.title}</td>
                                    <td>
                                        {/* <Button variant='primary' onClick={()=>navigate(`/admin/editroom/${e._id}`)}>Edit</Button>
                                        &nbsp; */}
                                        <Button variant='danger' onClick={()=>{handleDelete(e._id,roomdata._id)}}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        ))
                    : 
                    <Card style={{width : "100%",textAlign : 'center'}}>
                        <Card.Body>
                            <Card.Text>No Rooms availble</Card.Text>
                        </Card.Body>
                    </Card>
                }
                </tbody>
            </Table>
        </Container>
        <AdminFooter/>
    </>
}

export default AdminRoomsList