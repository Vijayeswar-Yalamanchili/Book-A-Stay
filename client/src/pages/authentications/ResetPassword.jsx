import React from 'react'
import {Container,Row, Col,Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes'
import AppNavbar from '../../components/AppNavbar'
import AppFooter from '../../components/Footer'


function ResetPassword() {

    let navigate = useNavigate()

    let formik = useFormik({
        initialValues:{
            email : '',
            text:'',
            password:''
        },
        validationSchema:Yup.object({
            email:Yup.string().required('Email is required').email('Enter a valid email'),
            password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password'),
            confirmPassword:Yup.string().required('Confirm Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Confirm Password should match Password')
        }),
        onSubmit : async(values) => {
            try {
                if(values.password === values.confirmPassword){
                    let res = await AxiosService.put(`${ApiRoutes.RESETPASSWORD.path}`,values)
                    if(res.status === 200){
                        toast.success(res.data.message)
                        navigate('/login')
                    }     
                }else{
                  toast.error("Passwords doesnt match! Please enter the same passwords")
                }
            } catch (error) {
                toast.error(error.response.data.message || error.message)                              
            }
        }
    })

    return <>
        <AppNavbar/>
        <Container className='mb-5'>
            <Col md xs={12}>
                <Link to={'/login'}><Button variant='secondary' className='my-4'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back</Button></Link> 
                <Form onSubmit={formik.handleSubmit} className='loginForm mx-auto mt-4 p-5 rounded-4'>
                    
                    <Form.Group className="mb-4">
                        <Form.Label>Enter Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                        {formik.touched.email && formik.errors.email ? (<div className='authErrorText'>{formik.errors.email}</div>) : null}
                    </Form.Group>

                    <Form.Group className="mb-4" >
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter New Password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
                        {formik.touched.password && formik.errors.password ? (<div style={{color:"red"}}>{formik.errors.password}</div>) : null}
                    </Form.Group>

                    <Form.Group className="mb-4" >
                        <Form.Label>Confirm new Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Confirm Password" id='confirmPassword' name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur}/>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div style={{color:"red"}}>{formik.errors.confirmPassword}</div>) : null}
                    </Form.Group>

                    <div className="mb-3 pt-3">
                        <Button className='formBtns' type='submit' style={{width : "100%"}}>Update password</Button>
                    </div>
                </Form>
            </Col>
        </Container>
        <AppFooter/>
    </>
}

export default ResetPassword