import React, { useState,useEffect } from 'react'
import { Card, Container, Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function AdminCabins() {

  const navigate = useNavigate()
  const [lists, setLists] = useState([])
  let getLoginToken = localStorage.getItem('adminLoginToken')

  const getCabinsList = async() => {
    try {
      const decodedToken = jwtDecode(getLoginToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETADMINCABINSLIST.path}?type=Cabin`,{ headers : { 'Authorization' : `${getLoginToken}`} })
      setLists(res.data.cabinsList)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const handleDelete = async(stayId) => {
    try {
      let res = await AxiosService.delete(`${ApiRoutes.DELETESTAY.path}/${stayId}`,{ headers : { 'Authorization' : `${getLoginToken}`} })
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(() => {
    getCabinsList()
  },[lists])

  return <>
    <AdminNavbar/>
    <Container className='py-5'>
      <div className='mb-3 d-flex justify-content-start align-items-center'>
        <Button className='me-0' variant='none' onClick={()=> navigate('/admin/dashboard')}><FontAwesomeIcon icon={faArrowLeft}/></Button>
        <h4 className='mb-0'>List of Hotels</h4>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <th>S.No</th>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>Rating</th>
            <th>Rooms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { 
            lists.length >=1 ?
            lists.map((e,i) => {
              return <tr key={i} className='text-center'>
              <td>{i+1}</td>
              <td>{e.name}</td>
              <td>{e.type}</td>
              <td>{e.city}</td>
              <td>{e.rating}</td>
              <td>
                <Button variant='primary' onClick={()=>{navigate(`/admin/rooms/${e._id}`)}}>Rooms List</Button>
                &nbsp;
                <Button variant='success' onClick={()=>{navigate(`/admin/addRoom/${e._id}`)}}>Add Room</Button>
              </td>
              <td>
                <Button variant='primary' onClick={()=>navigate(`/admin/editStay/${e._id}`)}>Edit</Button>
                &nbsp;
                <Button variant='danger' onClick={()=>{handleDelete(e._id)}}>Delete</Button>
              </td>
            </tr> 
            }) : 
            <Card style={{width : "100%",textAlign : 'center'}}>
              <Card.Body>
                <Card.Text>No Hotels availble</Card.Text>
              </Card.Body>
            </Card>
          }
        </tbody>
      </Table>
    </Container>
    <AdminFooter/>
  </>
}

export default AdminCabins