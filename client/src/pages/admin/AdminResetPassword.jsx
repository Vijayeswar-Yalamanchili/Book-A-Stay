import React from 'react'
import {Container,Row, Col,Form,Button} from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'


function AdminResetPassword() {

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
                    console.log(values)
                    let res = await AxiosService.put(`${ApiRoutes.ADMINRESETPASSWORD.path}`,values)
                    if(res.status === 200){
                        toast.success(res.data.message)
                        navigate('/admin')
                        console.log(res.data)
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
        <AdminNavbar/>
        <Container className='mb-5'>
            <Link to={'/admin'}><Button variant='secondary' className='my-4'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back</Button></Link> 
            <Col md xs={12}>
                <Form onSubmit={formik.handleSubmit} className='adminLoginForm mx-auto mt-2 p-5 rounded-4'>            
                    <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id='adminEmail' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                        {formik.touched.email && formik.errors.email ? (<div className='authErrorText'>{formik.errors.email}</div>) : null}
                    </Form.Group>

                    <Form.Group className="mb-4" >
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter New Password" id='adminEmail' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
                        {formik.touched.password && formik.errors.password ? (<div className='authErrorText'>{formik.errors.password}</div>) : null}
                    </Form.Group>

                    <Form.Group className="mb-4" >
                        <Form.Label>Confirm new Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Confirm Password" id='adminEmail' name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur}/>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div style={{color:"red"}}>{formik.errors.confirmPassword}</div>) : null}
                    </Form.Group>


                    <div className="mb-3 pt-3">
                        <Button variant='primary' type='submit' style={{width : "100%"}}>Update password</Button>
                    </div>
                </Form>
            </Col>
        </Container>
        <AdminFooter/>
    </>
}

export default AdminResetPassword