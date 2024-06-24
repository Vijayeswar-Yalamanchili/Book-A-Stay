import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate,useParams } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function AdminEditStayForm() {

    let navigate = useNavigate()
    let {id} = useParams()
    let getToken = localStorage.getItem('adminLoginToken')
    const [editFormValues, setEditFormValues] = useState({
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

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
          setEditFormValues(prevState => ({ ...prevState,
            aminities: checked ? [...prevState.aminities, value] : prevState.aminities.filter(item => item !== value)
          }));
        } 
        else if (type === 'file') {
            if (name === 'hotelImage') {
                setEditFormValues({ ...editFormValues, hotelImage: e.target.files[0] });
            } else if (name === 'roomImages') {
                setEditFormValues({ ...editFormValues, roomImages: Array.from(files) });
            }
        } 
        else {
          setEditFormValues( prevState => ({ ...prevState,[name]: value }) );
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formDataToSend = new FormData();
        for (const key in editFormValues) {
            if (key === 'roomImages') {
                editFormValues.roomImages.forEach(image => {
                    formDataToSend.append('roomImages', image)
                });
            } 
            else if(key === 'hotelImage') {
                formDataToSend.append('hotelImage',editFormValues[key]);
            }
            else {
                formDataToSend.append(key, editFormValues[key]);
            }
        }
        try {
            const decodedToken = jwtDecode(getToken)
            const tokenId = decodedToken.id
            console.log(`${ApiRoutes.UPDATESTAY.path}/${id}/${tokenId}`)
            let res = await AxiosService.put(`${ApiRoutes.UPDATESTAY.path}/${id}/${tokenId}`, formDataToSend, {
              headers : { 
                'Authorization' : `${getToken}`,
                'Content-Type' : 'multipart/form-data'
              }
            })
            if(res.status===200){
                navigate('/admin/dashboard')
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const getStayDatas = async() => {
      try {
        let res = await AxiosService.get(`${ApiRoutes.GETSTAYBYID.path}/${id}`,{
          headers : { 
            'Authorization' : `${getToken}`
          }
        })
        if(res.status === 200){
          setEditFormValues(res.data.stayById)
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message)
      }
    }

    useEffect(() => {
      getStayDatas()
    },[])

    return <>
        <div className='d-flex justify-content-start align-items-center'>
            <Button variant='none' onClick={() => navigate('/admin/dashboard')}><FontAwesomeIcon icon={faArrowLeft}/></Button>
            <h4 className='text-uppercase mb-0'>Edit Stay Details</h4>
        </div>
        <Form className='mt-4' onSubmit={handleSubmit}>

            {/* line 1 */}
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' value={editFormValues.name} placeholder="Enter Name" onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' value={editFormValues.title} placeholder="Enter Title" onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Type</Form.Label>
                    <Form.Select name='type' onChange={handleChange} value={editFormValues.type}>
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
                    <Form.Control name='address' value={editFormValues.address} placeholder="Areaname, cityname" onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' name='city' value={editFormValues.city} placeholder='Enter City' onChange={handleChange}/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Nearest Railway station</Form.Label>
                    <Form.Control type='number' name='distance' value={editFormValues.distance} onChange={handleChange} placeholder='Enter distance in numbers'/>
                </Form.Group>
            </Row>

            {/* line 3 */}
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>One line Description</Form.Label>
                    <Form.Control type='text' name='description' value={editFormValues.description} onChange={handleChange} placeholder="Rooms With AC, parking, etc" />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Starting Price</Form.Label>
                    <Form.Control type='number' name='lowestPrice' value={editFormValues.lowestPrice} placeholder="Enter Price" onChange={handleChange}/>
                </Form.Group>
            </Row>

            {/* line 4 */}
            <Row className='mt-3'>
                <Form.Group as={Col} >
                    <Form.Label>Rating</Form.Label>
                    <Form.Select defaultValue="Choose..." name='rating' value={editFormValues.rating} onChange={handleChange}>
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
                    <Form.Select defaultValue="Choose..." name='experience' value={editFormValues.experience} onChange={handleChange}>
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
                    <Form.Select defaultValue="Choose..." name='featured' value={editFormValues.featured} onChange={handleChange}>
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
              <Form.Control as="textarea" rows={3} name='overview' value={editFormValues.overview} onChange={handleChange} placeholder='Overview about your stay'/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Aminities</Form.Label>
                <div className='d-flex justify-content-between align-items-center'>
                {
                    hotelAminities.map((e,i)=> {
                        return <Form.Check value={e} name='aminities' checked={editFormValues.aminities.includes(e)} type="checkbox" label={e} key={i} onChange={handleChange}/>
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

            <Button variant="primary" type="submit">Update Details</Button>
            {/* <Button variant="secondary" type="button" className='ms-2' onClick={handleReset}>Reset</Button> */}
        </Form>
    </>
}

export default AdminEditStayForm