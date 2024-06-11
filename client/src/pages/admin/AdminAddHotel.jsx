import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AdminAddHotelForm from '../../components/admin/AdminAddHotelForm'
import { Container } from 'react-bootstrap'

function AdminAddHotel() {
  return <>
    <AdminNavbar/>
    <Container className='px-5 py-4'>
      <AdminAddHotelForm/>
    </Container>
    <AdminFooter/>
  </>
}

export default AdminAddHotel