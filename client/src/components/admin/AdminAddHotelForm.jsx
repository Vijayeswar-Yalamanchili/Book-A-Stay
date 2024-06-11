import React, { useState } from 'react'
import { Button, Form, Row, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MultiSelect } from "react-multi-select-component"

function AdminAddHotelForm() {

    let navigate = useNavigate()
    const [selectedAminity, setSelectedAminity] = useState([]);

    let stayType = ['Hotel','Resort','Villa','Cottage','Cabin']
    let userExperience = ['Poor','Average','Good','Satisfactory','Excellent']
    let hotelRating = ['0-2','3-4','5-6','7-8','9-10']
    let isFeaturedHotel = ['True','False']
    let hotelAminities = [
        {
            label : 'Free Wifi',
            value : 'Free Wifi'
        },
        {
            label : 'Breakfast',
            value : 'Breakfast'
        },
        {
            label : 'Cab service',
            value : 'Cab service'
        },
        {
            label : 'Spa',
            value : 'Spa'
        },
        
        {
            label : 'Gym',
            value : 'Gym'
        },
        {
            label : 'Parking',
            value : 'Parking'
        },
    ]

  return <>
    <div className='d-flex justify-content-start align-items-center'>
        <Button variant='none' onClick={() => navigate('/admin/dashboard')}><FontAwesomeIcon icon={faArrowLeft}/></Button>
        <h4 className='text-uppercase mb-0'>Add New Stay Details</h4>
    </div>
    <Form className='mt-4'>

        {/* line 1 */}
        <Row className="mb-3">
            <Form.Group as={Col} >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Type</Form.Label>
                <Form.Select defaultValue="Select Type ...">
                    <option disabled>Select Type ...</option>
                    {
                        stayType.sort().map((e,i) => {
                            return <option value={e} key={i}>{e}</option>
                        })
                    }
                </Form.Select>
            </Form.Group>
        </Row>

        {/* line 2 */}
        <Row className="mb-3">
            <Form.Group as={Col}>
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Areaname, cityname" />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter City'/>
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Distance from Railway station</Form.Label>
                <Form.Control type='number' placeholder='Enter distance in numbers'/>
            </Form.Group>
        </Row>

        {/* line 3 */}
        <Row>
            <Form.Group as={Col}>
                <Form.Label>One line Description</Form.Label>
                <Form.Control type='text' placeholder="Rooms With AC, parking, etc" />
            </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Starting Price</Form.Label>
                <Form.Control type='number' placeholder="Enter Price"/>
            </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Aminities</Form.Label>
                <MultiSelect options={hotelAminities} value={selectedAminity} onChange={setSelectedAminity} labelledBy='Select'/>
            </Form.Group>

        </Row>

        {/* line 4 */}
        <Row className='mt-3'>
            <Form.Group as={Col} >
                <Form.Label>Rating</Form.Label>
                <Form.Select defaultValue="Choose...">
                    <option disabled>Select Rating...</option>
                    {
                        hotelRating.reverse().map((e,i) => {
                            return <option value={e} key={i}>{e}</option>
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Experience</Form.Label>
                <Form.Select defaultValue="Choose...">
                    <option disabled>User Experience...</option>
                    {
                        userExperience.reverse().map((e,i) => {
                            return <option value={e} key={i}>{e}</option>
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Featured</Form.Label>
                <Form.Select defaultValue="Choose...">
                    <option disabled>Choose...</option>
                    {
                        isFeaturedHotel.reverse().map((e,i) => {
                            return <option value={e} key={i}>{e}</option>
                        })
                    }
                </Form.Select>
            </Form.Group>
        </Row>

        <Form.Group className="my-3">
          <Form.Label>Overview</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder='Overview about your stay'/>
        </Form.Group>

        <Row>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Hotel Image</Form.Label>
                <Form.Control type='file' accept='image/*'/>
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
                <Form.Label>Room Images</Form.Label>
                <Form.Control type='file' accept='image/*' multiple/>
            </Form.Group>
        </Row>            

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
    </Form>
  </>
}

export default AdminAddHotelForm