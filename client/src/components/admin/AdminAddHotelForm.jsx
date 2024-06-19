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
    // const [selectedAminity, setSelectedAminity] = useState([]);

    let stayType = ['Hotel','Resort','Villa','Cottage','Cabin']
    let userExperience = ['Poor','Average','Good','Satisfactory','Excellent']
    let hotelRating = ['0','1','2','3','4','5','6','7','8','9','10']
    let isFeaturedHotel = ['True','False']
    let hotelAminities = ['Free Wifi','Breakfast','Cab service','Spa','Gym','Parking']
    // let hotelAminities = [
    //     {
    //         label : 'Free Wifi',
    //         value : 'Free Wifi'
    //     },
    //     {
    //         label : 'Breakfast',
    //         value : 'Breakfast'
    //     },
    //     {
    //         label : 'Cab service',
    //         value : 'Cab service'
    //     },
    //     {
    //         label : 'Spa',
    //         value : 'Spa'
    //     },
        
    //     {
    //         label : 'Gym',
    //         value : 'Gym'
    //     },
    //     {
    //         label : 'Parking',
    //         value : 'Parking'
    //     },
    // ]

    const form = useSelector((state) => state.form);
    // const handleChange = (e) => {
    //     const { name, value,type, checked } = e.target;
        
    //     if (type === 'checkbox') {
    //         let newValue = [...form[name]];
    //         if (checked) {
    //           newValue.push(value);
    //         } else {
    //           newValue = newValue.filter((item) => item !== value);
    //         }
    //         dispatch(saveDatas({ field: name, newValue }));
    //       } else {
    //         dispatch(saveDatas({ field: name, value }));
    //       }
    //     // dispatch(saveDatas({ field: name, value }));
    // };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
          if (checked) {
            dispatch(addCheckbox(value));
          } else {
            dispatch(removeCheckbox(value));
          }
        } else if (type === 'file') {
          if (name === 'hotelImage') {
            dispatch(setImage(e.target.files[0]));
          } else if (name === 'roomImages') {
            Array.from(e.target.files).forEach(file => dispatch(addMultipleImage(file)));
          }
        } else {
          dispatch(saveDatas({ field: name, value }));
        }
        
    }

    const handleReset = () => {
      dispatch(resetDatas())
      console.log("reset done",dispatch(resetDatas()))
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
    //   console.log('Form submitted:', form)
        const decodedToken = jwtDecode(getToken)
        const id = decodedToken.id
        let res = await AxiosService.post(`${ApiRoutes.ADDSTAY.path}/${id}`,form,{headers : { 'Authorization' : `${getToken}`}})
        console.log(res)
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
                <Form.Control type="text" name='name' value={form.name} placeholder="Enter Name" onChange={handleChange}/>
            </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name='title' value={form.title} placeholder="Enter Title" onChange={handleChange}/>
            </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Type</Form.Label>
                <Form.Select name='type' onChange={handleChange} value={form.type}>
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
                <Form.Control name='address' value={form.address} placeholder="Areaname, cityname" onChange={handleChange}/>
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' name='city' value={form.city} placeholder='Enter City' onChange={handleChange}/>
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Distance from Railway station</Form.Label>
                <Form.Control type='number' name='distance' value={form.distance} onChange={handleChange} placeholder='Enter distance in numbers'/>
            </Form.Group>
        </Row>

        {/* line 3 */}
        <Row>
            <Form.Group as={Col}>
                <Form.Label>One line Description</Form.Label>
                <Form.Control type='text' name='description' value={form.description} onChange={handleChange} placeholder="Rooms With AC, parking, etc" />
            </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Starting Price</Form.Label>
                <Form.Control type='number' name='lowestPrice' value={form.lowestPrice} placeholder="Enter Price" onChange={handleChange}/>
            </Form.Group>

            {/* <Form.Group as={Col} >
                <Form.Label>Aminities</Form.Label>
                <Form.Select defaultValue="Choose..." name='rating' value={form.rating} onChange={handleChange}>
                    <option>Select Rating...</option>
                    {
                        hotelAminities.reverse().map((e,i) => {
                            return <option value={e} key={i}>{e}</option>
                        })
                    }
                </Form.Select>                
            </Form.Group> */}
            {/* <MultiSelect name='aminities' value={selectedAminity} options={hotelAminities} onChange={setSelectedAminity} labelledBy='Select'/> */}

        </Row>

        {/* line 4 */}
        <Row className='mt-3'>
            <Form.Group as={Col} >
                <Form.Label>Rating</Form.Label>
                <Form.Select defaultValue="Choose..." name='rating' value={form.rating} onChange={handleChange}>
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
                <Form.Select defaultValue="Choose..." name='experience' value={form.experience} onChange={handleChange}>
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
                <Form.Select defaultValue="Choose..." name='featured' value={form.featured} onChange={handleChange}>
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
          <Form.Control as="textarea" rows={3} name='overview' value={form.overview} onChange={handleChange} placeholder='Overview about your stay'/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Aminities</Form.Label>
            {/* <Form.Check type="checkbox" label="Check me out" /> */}
            <div className='d-flex justify-content-between align-items-center'>
            {
                hotelAminities.map((e,i)=> {
                    return <Form.Check value={e} name='aminities' checked={form.aminities.includes(e)} type="checkbox" label={e} key={i} onChange={handleChange}/>
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