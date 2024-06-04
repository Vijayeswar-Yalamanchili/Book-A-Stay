import React, { useContext } from 'react'
import { Col, Container, Button } from 'react-bootstrap'
import { UserAuthContext } from '../contextApi/UserAuthContextComponent'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Profile() {

    let {userAuth} = useContext(UserAuthContext)

    return <>
        <Container className='mb-5'>
            <Link to={'/'} >
                <Button className='mt-3' variant='secondary'><FontAwesomeIcon icon={faArrowLeft}/> Back</Button>
            </Link>
            <Col md xs={12}>
                <div className='detailsForm mx-auto mt-3 p-5 rounded-4'>
                    <h4 className='text-center mb-3'>Personal Details</h4>
                    <div className='d-flex'><h6 className='detailtext'>Firstname</h6><h6> : {userAuth[0]?.firstName}</h6></div>
                    <div className='d-flex'><h6 className='detailtext'>Lastname</h6><h6> : {userAuth[0]?.lastName}</h6></div>
                    <div className='d-flex'><h6 className='detailtext'>Mobile</h6><h6> : {userAuth[0]?.mobile}</h6></div>
                    <div className='d-flex'><h6 className='detailtext'>Email</h6><h6> : {userAuth[0]?.email}</h6></div>
                    <div className="d-grid mt-4">
                        <Button className='updateDetailBtn' type='submit'>Edit Details</Button>
                    </div>
                </div>
            </Col>
        </Container>
    </>
}

export default Profile