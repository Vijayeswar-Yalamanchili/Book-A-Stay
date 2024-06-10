import React, { useState,useEffect } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function AdminDashboard() {

  const navigate = useNavigate()
  const [lists, setLists] = useState([])
  let getLoginToken = localStorage.getItem('adminLoginToken')

  const getHotelsList = async() => {
    try {
      const decodedToken = jwtDecode(getLoginToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETADMINHOTELSLIST.path}/${id}`,{ headers : { 'Authorization' : `${getLoginToken}`} })
      setLists(res.data.list)
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
      <div className='mb-3 d-flex justify-content-between align-items-center'>
        <h4>List of stays</h4>
        <Button onClick={()=> navigate('/admin/addHotel')}> + Add New Stay</Button>
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
            lists.length > 0 ? 
              lists.map((e,i) => {
                return <tr key={i}>
                <td>{i+1}</td>
                <td>{e.hotelName}</td>
                <td>{e.type}</td>
                <td>{e.city}</td>
                <td>{e.rating}</td>
              </tr> 
              })
            
          : 
           <tr>
           <td>-</td>
           <td>-</td>
           <td>-</td>
           <td>-</td>
           <td>-</td>
         </tr>
          }
        </tbody>
      </Table>
    </Container>

    <AdminFooter/>
  </>
}

export default AdminDashboard