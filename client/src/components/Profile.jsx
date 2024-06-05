import React, { useState, useContext, useEffect } from 'react'
import { Col, Container, Button, Modal, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { UserAuthContext } from '../contextApi/UserAuthContextComponent'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

function Profile() {

    let {userAuth} = useContext(UserAuthContext)
    let firstname = userAuth[0]?.firstName
    let lastname = userAuth[0]?.lastName
    let mobileNum = userAuth[0]?.mobile
    let emailId = userAuth[0]?.email
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false)
    const getLoginToken = localStorage.getItem('loginToken')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleUpdatedDetails = async() => {
        try {
            let updatedDetails = {
                firstName : fname === ''? firstname : fname,
                lastName : lname === '' ? lastname : lname,
                mobile : mobile === ''? mobileNum : mobile,
                email : email === ''? emailId : email
            }
            let res = await AxiosService.put(`${ApiRoutes.PROFILEUPDATE.path}/${userAuth[0]?._id}`,updatedDetails, {headers : {'Authorization' : `${getLoginToken}`}})
            let result = res.data.updatedUserDetails
            handleClose()
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <Container className='mb-5'>
            <Link to={'/'} >
                <Button className='mt-3' variant='secondary'><FontAwesomeIcon icon={faArrowLeft}/> Back</Button>
            </Link>
            <Col md xs={12}>
                <div className='detailsForm mx-auto mt-3 rounded-4'>
                    <h4 className='text-center mb-3'>Personal Details</h4>
                    <div className='detailText d-flex'><h6 className='detailtextleft'>Firstname</h6><h6 className='detailtextright'> : {userAuth[0]?.firstName}</h6></div>
                    <div className='detailText d-flex'><h6 className='detailtextleft'>Lastname</h6><h6 className='detailtextright'> : {userAuth[0]?.lastName}</h6></div>
                    <div className='detailText d-flex'><h6 className='detailtextleft'>Mobile</h6><h6 className='detailtextright'> : {userAuth[0]?.mobile}</h6></div>
                    <div className='detailText d-flex'><h6 className='detailtextleft'>Email</h6><h6 className='detailtextright'> : {userAuth[0]?.email}</h6></div>
                    <div className="d-grid mt-4">
                        <Button className='updateDetailBtn' onClick={handleShow}>Edit Details</Button>
                    </div>
                </div>
            </Col>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                  <Modal.Title>Update Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>                
                    <Form.Group className="mb-3">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text" defaultValue={firstname} onChange={(e)=>setFname(e.target.value)} placeholder="Firstname" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" defaultValue={lastname} onChange={(e)=>setLname(e.target.value)} placeholder="Lastname" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number" defaultValue={mobileNum} onChange={(e)=>setMobile(e.target.value)} placeholder="0123456789" maxLength={10} minLength={10}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" defaultValue={emailId} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleUpdatedDetails}>
                    Save Changes
                  </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
}

export default Profile