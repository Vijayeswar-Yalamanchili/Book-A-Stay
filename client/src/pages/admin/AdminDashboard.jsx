import React, { useState,useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { jwtDecode } from 'jwt-decode'


function AdminDashboard() {

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
    
    <Container className='p-5'>
      <h4>List of stays</h4>
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