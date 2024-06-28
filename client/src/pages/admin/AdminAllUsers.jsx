import React, { useState,useEffect } from 'react'
import { Card, Container, Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'

function AdminAllUsers() {

    const navigate = useNavigate()
    const [lists, setLists] = useState([])
    let getLoginToken = localStorage.getItem('adminLoginToken')

    const getUsersList = async() => {
        try {
          const decodedToken = jwtDecode(getLoginToken)
          const id = decodedToken.id
          let res = await AxiosService.get(`${ApiRoutes.GETALLUSERS.path}/${id}`,{ headers : { 'Authorization' : `${getLoginToken}`} })
        //   console.log(res.data.allUsers)
          setLists(res.data.allUsers)
        } catch (error) {
          toast.error(error.response.data.message || error.message)
        }
    }

    const handleDelete = async(userId) => {
        try {
          let res = await AxiosService.delete(`${ApiRoutes.DELETEUSER.path}/${userId}`,{ headers : { 'Authorization' : `${getLoginToken}`} })
        } catch (error) {
          toast.error(error.response.data.message || error.message)
        }
      }

    useEffect(() => {
        getUsersList()
    },[])

    return <>
        <AdminNavbar/>
        <Container className='py-5'>
        <div className='mb-3 d-flex justify-content-start align-items-center'>
            <Button className='me-0' variant='none' onClick={()=> navigate('/admin/dashboard')}><FontAwesomeIcon icon={faArrowLeft}/></Button>
            <h4 className='mb-0'>Users</h4>
        </div>
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>IsAdmin</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            { 
                lists.length >=1 ?
                lists.map((e,i) => {
                return <tr key={i}>
                <td>{i+1}</td>
                <td>{e.firstName} {e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.mobile}</td>
                <td>{e.isAdmin === false ? 'No' : <i>Yes</i>}</td>
                <td>
                  <Button variant='primary' onClick={()=>navigate(`/admin/edituser/${e._id}`)}>Edit</Button>
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

export default AdminAllUsers