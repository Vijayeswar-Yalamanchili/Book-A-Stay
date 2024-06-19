import React, { useState,useEffect } from 'react'
import { Container, Table, Button, Card, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import hotelsImg from '../../assets/hotels.jpeg'
import AdminHotels from './AdminHotels'

function AdminDashboard() {

  const navigate = useNavigate()
  const [lists, setLists] = useState([])
  const [hotelLists, setHotelLists] = useState([])
  let getLoginToken = localStorage.getItem('adminLoginToken')

  const getStayTypes = async() => {
    try {
      const decodedToken = jwtDecode(getLoginToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETTYPESLIST.path}/lists/${id}`,{ headers : { 'Authorization' : `${getLoginToken}`} })
      const typesList = [...new Set(res.data.types)]
      setLists(typesList)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

    useEffect(() => {
      getStayTypes()
  },[])


  return <>
    <AdminNavbar/>

    <Container className='p-5'>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>List of Stay types</h4>
        <Button onClick={()=> navigate('/admin/addHotel')}>Add new Stay</Button>
      </div>
      {
        lists.length > 0 ? 
        <div className='d-flex justify-content-start mt-4' style={{gap : "8px"}}>
          <Row xs={1} md={2} className='mx-auto cityRows d-flex justify-content-around align-items-center'>
            {
              lists.map((e,i)=> {
                return  <Card className='px-0 mb-4' style={{ width: '15rem',minHeight:"10rem"}} key={i} onClick={() =>navigate(`/admin/${e}`)}>
                  <Card.Img variant="top" src={hotelsImg} alt='a'/>
                  <Card.Body>
                    <h5 style={{textTransform : 'capitalize'}}>{e+`s`}</h5>
                  </Card.Body>
                </Card>
              })
            }
          </Row>
        </div>
        :null
       }
    </Container>

    <AdminFooter/>
  </>
}

export default AdminDashboard