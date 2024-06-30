import React from 'react'
import { Col, Button, Form, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function AdminForgotPassword() {

    const navigate = useNavigate()

    let formik = useFormik({
        initialValues:{
          email:'',
        },
        validationSchema:Yup.object({          
          email:Yup.string().required('Email is required').email('Enter a valid email'),
        }),
        onSubmit : async(values) => {
            try {
                let res = await AxiosService.put(`${ApiRoutes.ADMINFORGOTPASSWORD.path}`,values)
                if(res.status === 200){
                    toast.success(res.data.message)
                    localStorage.setItem('adminLoginToken',res.data.adminLoginToken)
                    navigate('/admin')
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
            <Form onSubmit={formik.handleSubmit} className='adminLoginForm mx-auto mt-5 p-5 rounded-4'>            
                <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id='adminEmail' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                    {formik.touched.email && formik.errors.email ? (<div className='authErrorText'>{formik.errors.email}</div>) : null}
                </Form.Group>

                <div className="d-grid mb-4">
                    <Button className='adminFormBtns' type='submit'>Login</Button>
                </div>
            </Form>
        </Col>
    </Container>

    <AdminFooter/>
  </>
}

export default AdminForgotPassword