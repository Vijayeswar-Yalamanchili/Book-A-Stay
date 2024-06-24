import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AdminEditStayForm from '../../components/admin/AdminEditStayForm'
import { Container } from 'react-bootstrap'

function AdminEditHotel() {
  return <>
    <AdminNavbar/>
    <Container className='px-5 py-4'>
      <AdminEditStayForm/>
    </Container>      
    <AdminFooter/>
  </>
}

export default AdminEditHotel