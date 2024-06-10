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

function AdminCottages() {

  const navigate = useNavigate()
  const [lists, setLists] = useState([])
  let getLoginToken = localStorage.getItem('adminLoginToken')

  const getHotelsList = async() => {
    try {
      const decodedToken = jwtDecode(getLoginToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETADMINCOTTAGESLIST.path}?type=cottage`,{ headers : { 'Authorization' : `${getLoginToken}`} })
      setLists(res.data.cottagesList)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(() => {
    getHotelsList()
  },[])

  return <>
    <AdminNavbar/>
    <Container className='py-5'>
      <div className='mb-3 d-flex justify-content-start align-items-center'>
        <Button className='me-0' variant='none' onClick={()=> navigate('/admin/dashboard')}><FontAwesomeIcon icon={faArrowLeft}/></Button>
        <h4>List of Hotels</h4>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          { 
            lists.length >=1 ?
            lists.map((e,i) => {
              return <tr key={i}>
              <td>{i+1}</td>
              <td>{e.hotelName}</td>
              <td>{e.type}</td>
              <td>{e.city}</td>
              <td>{e.rating}</td>
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
export default AdminCottages