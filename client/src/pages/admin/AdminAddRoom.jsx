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

function AdminAddRoom() {
  
    let {id} = useParams()
    const navigate = useNavigate()
    let getLoginToken = localStorage.getItem('adminLoginToken')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [maxPeople, setMaxPeople] = useState('')
    const [room, setRoom] = useState('')
    const [roomNumbers, setRoomNumbers] = useState([{
      number : '',
      unAvailableDates: []
    }])

    const handleRoomNumberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRoomNumbers = [...roomNumbers];
        updatedRoomNumbers[index][name] = name === 'number' ? parseInt(value) : value;
        setRoomNumbers(updatedRoomNumbers);
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let updatedDatas = {
          title,
          description,
          price,
          maxPeople,
          roomNumbers
        }
        try {
            let res = await AxiosService.post(`${ApiRoutes.ADDROOM.path}/${id}`,updatedDatas,
              { headers : {
                'Authorization' : `${getLoginToken}`,
                'Content-Type' : 'application/json'
              } 
            })
            if(res.status === 200){
                toast.success(res.data.message)
                navigate('/admin/dashboard')
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <AdminNavbar/>
        <Container>
            <div className='my-4 d-flex justify-content-start align-items-center'>
                <Button className='me-0' variant='none' onClick={()=> navigate('/admin/Hotel')}><FontAwesomeIcon icon={faArrowLeft}/></Button>
                <h4 className='mb-0'>Add Rooms</h4>
            </div>
            <Col md xs={12}>
                <Form onSubmit={handleSubmit} className=' mx-auto'>
                    <Row className="mb-3">
                        <Col lg xs={12} className='fieldBottom mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" id='adminFirstName' name='firstName' />
                        </Col>
                        <Col lg xs={12}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" id='adminLastName' name='lastName'/>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg xs={12} className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" id="adminEmail" name='email'/>
                        </Col>
                        <Col lg xs={12} className="mb-3">
                            <Form.Label>Persons Limit</Form.Label>
                            <Form.Control type="number" value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} placeholder="Enter maxPeople" maxLength={10} id="adminMobile" name='mobile' />
                        </Col>
                        {roomNumbers.map((roomNumber, index) => {
                            return <div key={index}>
                                <Form.Group controlId={`number${index}`}>
                                    <Form.Label>Room Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="number"
                                        value={roomNumber.number}
                                        onChange={(e) => handleRoomNumberChange(index, e)}
                                        required
                                    />
                                </Form.Group>
                            </div>
                        })}
                    </Row>
                    <div className="mb-4"><Button variant='primary' type="submit">Create Room</Button></div>
                </Form>
            </Col>
        </Container>
        <AdminFooter/>
  `</>
}

export default AdminAddRoom