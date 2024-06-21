import React, { useState } from 'react'
import { Button, Form, Row, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { jwtDecode } from "jwt-decode"
import { useSelector, useDispatch } from 'react-redux'
import { saveDatas, addCheckbox, removeCheckbox, setImage, addMultipleImage, removeMultipleImage, resetDatas } from '../../redux/admin/addStaySlice'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'

function AdminAddHotelForm() {

    let navigate = useNavigate()
    const dispatch = useDispatch()
    let getToken = localStorage.getItem('adminLoginToken')
    // const [hotelImgFile, setHotelImgFile] = useState(null)
    const [formValues, setFormValues] = useState({
        name : '',
        type : '',
        title : '',
        address : '',
        city : '',
        distance : '',
        description : '',
        lowestPrice : 0,
        aminities : [],
        rating : '',
        experience : '',
        featured : '',
        overview : '',
        hotelImage : '',
        roomImages : []
    })

    let stayType = ['Hotel','Resort','Villa','Cottage','Cabin']
    let userExperience = ['Poor','Average','Good','Satisfactory','Excellent']
    let hotelRating = ['0','1','2','3','4','5','6','7','8','9','10']
    let isFeaturedHotel = ['True','False']
    let hotelAminities = ['Free Wifi','Breakfast','Cab service','Spa','Gym','Parking']

    const handleReset = () => {
      setFormValues('')
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
          setFormValues(prevState => ({ ...prevState,
            aminities: checked ? [...prevState.aminities, value] : prevState.aminities.filter(item => item !== value)
          }));
        } 
        else if (type === 'file') {
            if (name === 'hotelImage') {
                setFormValues({ ...formValues, hotelImage: e.target.files[0] });
            } else if (name === 'roomImages') {
                setFormValues({ ...formValues, roomImages: Array.from(files) });
            }
            // setFormValues({ ...formValues, roomImages: Array.from(files) });

            // if (name === 'hotelImage') {
            //     setFormValues({ ...formValues, hotelImage: e.target.files[0] });
            // } else if (name === 'roomImages') {
            //     setFormValues({ ...formValues, roomImages: [...e.target.files] });
            // }
            //   setFormValues(prevState => ({
            //     ...prevState,
            //     [name]: files
            //   }));
        } 
        else {
          setFormValues( prevState => ({ ...prevState,[name]: value }) );
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formDataToSend = new FormData();
        for (const key in formValues) {
            if (key === 'roomImages') {
                console.log(formValues)
                formValues.roomImages.forEach(image => {
                    formDataToSend.append('roomImages', image);
                    console.log(image)
                });
            } 
            // else if(key === 'hotelImage') {
            //     formDataToSend.append('hotelImage',formValues[hotelImage]);
            // }
            else {
                formDataToSend.append(key, formValues[key]);
            }
        }
        console.log('Form submitted:', formValues)
        try {
            const decodedToken = jwtDecode(getToken)
            const id = decodedToken.id
            let res = await AxiosService.post(`${ApiRoutes.ADDSTAY.path}/${id}`, formDataToSend, { headers : 
                { 
                    'Authorization' : `${getToken}`,
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    };

    return <>
        <div className='d-flex justify-content-start align-items-center'>
            <Button variant='none' onClick={() => navigate('/admin/dashboard')}><FontAwesomeIcon icon={faArrowLeft}/></Button>
            <h4 className='text-uppercase mb-0'>Add New Stay Details</h4>
        </div>
        <Form className='mt-4' onSubmit={handleSubmit}>

            {/* line 1 */}
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' value={formValues.name} placeholder="Enter Name" onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' value={formValues.title} placeholder="Enter Title" onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Type</Form.Label>
                    <Form.Select name='type' onChange={handleChange} value={formValues.type}>
                        <option>Select Type...</option>
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
                    <Form.Control name='address' value={formValues.address} placeholder="Areaname, cityname" onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' name='city' value={formValues.city} placeholder='Enter City' onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Distance from Railway station</Form.Label>
                    <Form.Control type='number' name='distance' value={formValues.distance} onChange={handleChange} placeholder='Enter distance in numbers'/>
                </Form.Group>
            </Row>

            {/* line 3 */}
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>One line Description</Form.Label>
                    <Form.Control type='text' name='description' value={formValues.description} onChange={handleChange} placeholder="Rooms With AC, parking, etc" />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Starting Price</Form.Label>
                    <Form.Control type='number' name='lowestPrice' value={formValues.lowestPrice} placeholder="Enter Price" onChange={handleChange}/>
                </Form.Group>
            </Row>

            {/* line 4 */}
            <Row className='mt-3'>
                <Form.Group as={Col} >
                    <Form.Label>Rating</Form.Label>
                    <Form.Select defaultValue="Choose..." name='rating' value={formValues.rating} onChange={handleChange}>
                        <option>Select Rating...</option>
                        {
                            hotelRating.reverse().map((e,i) => {
                                return <option value={e} key={i}>{e}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Experience</Form.Label>
                    <Form.Select defaultValue="Choose..." name='experience' value={formValues.experience} onChange={handleChange}>
                        <option>Select Experience...</option>
                        {
                            userExperience.reverse().map((e,i) => {
                                return <option value={e} key={i}>{e}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Featured</Form.Label>
                    <Form.Select defaultValue="Choose..." name='featured' value={formValues.featured} onChange={handleChange}>
                        <option >Choose...</option>
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
              <Form.Control as="textarea" rows={3} name='overview' value={formValues.overview} onChange={handleChange} placeholder='Overview about your stay'/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Aminities</Form.Label>
                <div className='d-flex justify-content-between align-items-center'>
                {
                    hotelAminities.map((e,i)=> {
                        return <Form.Check value={e} name='aminities' checked={formValues.aminities.includes(e)} type="checkbox" label={e} key={i} onChange={handleChange}/>
                    })
                }
                </div>
            </Form.Group>

            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Hotel Image</Form.Label>
                    <Form.Control type='file'  accept='image/*' name='hotelImage' onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Room Images</Form.Label>
                    <Form.Control type='file'  accept='image/*' name='roomImages' onChange={handleChange} multiple/>
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">Save</Button>
            <Button variant="secondary" type="button" className='ms-2' onClick={handleReset}>Reset</Button>
        </Form>
    </>
}

export default AdminAddHotelForm