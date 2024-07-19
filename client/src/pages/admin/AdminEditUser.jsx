import React, { useState, useEffect } from 'react'
import { Container, Col, Form, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'

function AdminEditUser() {

    let {id} = useParams()
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])
    const firstName = userData?.firstName
    const lastName = userData?.lastName
    const mobileNum = userData?.mobile
    const emailID = userData?.email
    const [fname, setFname] = useState()
    const [lname, setLname] = useState()
    const [mobile, setMobile] = useState()
    const [email, setEmail] = useState()

    let getLoginToken = localStorage.getItem('adminLoginToken')
    const decodedToken = jwtDecode(getLoginToken)

    const getUserById = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETADMINUSERBYID.path}/user/${id}`,{ headers : { 'Authorization' : `${getLoginToken}`} })
            let result = res.data.userById
            setUserData(result)
            setIsAdmin(result.isAdmin)
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let updatedDatas = {
            firstName : fname === ''? userData?.firstName : fname,
            lastName : lname === '' ? userData?.lastname : lname,
            mobile : mobile === ''? userData?.mobile : mobile,
            email : email === ''? userData?.email : email,
            isAdmin
        }
        try {
            let res = await AxiosService.put(`${ApiRoutes.UPDATEUSER.path}/${id}`,updatedDatas,{ headers : { 'Authorization' : `${getLoginToken}`} })
            navigate('/admin/allusers')
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(() => {
        getUserById()
    },[])

    return <>
        <AdminNavbar/>
        <Container>
            <div className='mb-3 d-flex justify-content-start align-items-center'>
                <Button className='me-0' variant='none' onClick={()=> navigate('/admin/allusers')}><FontAwesomeIcon icon={faArrowLeft}/></Button>
                <h4 className='mb-0'>Edit User</h4>
            </div>
            <Col md xs={12}>
                <Form onSubmit={handleSubmit} className=' mx-auto'>
                <Row className="mb-3">
                    <Col lg xs={12} className='fieldBottom'>
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type='text' defaultValue={firstName} onChange={(e) => setFname(e.target.value)} placeholder="Enter Firstname" id='adminFirstName' name='firstName' />
                    </Col>
                    <Col lg xs={12}>
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type='text' defaultValue={lastName} onChange={(e) => setLname(e.target.value)} placeholder="Enter Lastname" id='adminLastName' name='lastName'/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg xs={12} className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" defaultValue={emailID} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" id="adminEmail" name='email'/>
                    </Col>
                    <Col lg xs={12}>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" defaultValue={mobileNum} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile number" maxLength={10} id="adminMobile" name='mobile' />
                    </Col>
                </Row>

                {/* <fieldset> */}
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label>Does  is Admin?</Form.Label>
                    <Col sm={10} className='d-flex flex-row'>
                        <Form.Check className='me-3' type="radio" label="Yes" value="yes" checked={isAdmin === "yes"} onChange={(e) => setIsAdmin(e.target.value)}/>
                        <Form.Check className='me-3' type="radio" label="No" value="no" checked={isAdmin === "no"} onChange={(e) => setIsAdmin(e.target.value)}/>                        
                    </Col>
                    </Form.Group>
                {/* </fieldset> */}
                
                <div className="d-grid mb-3">
                    <Button variant='primary'className='adminFormBtns' type="submit">Update</Button>
                </div>
                </Form>
            </Col>
        </Container>
        <AdminFooter/>
    </>
}

export default AdminEditUser