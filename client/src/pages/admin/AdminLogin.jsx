import React from 'react'
import { Col, Button, Form, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function AdminLogin() {

    const navigate = useNavigate()

    let formik = useFormik({
        initialValues:{
          email:'',
          password:''
        },
        validationSchema:Yup.object({          
          email:Yup.string().required('Email is required').email('Enter a valid email'),
          password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password')
        }),
        onSubmit : async(values) => {
            try {
                let res = await AxiosService.post(`${ApiRoutes.ADMINLOGIN.path}`,values)
                if(res.status === 200){
                    localStorage.setItem('adminLoginToken',res.data.adminLoginToken)
                    navigate('/admin/dashboard')
                }
            } catch (error) {
                toast.error(error.response.data.message || error.message)
            }
        }
    })
    return <>
    <AdminNavbar/>

    <Container className='mb-5'>
      <Col md xs={12}>
        <Form onSubmit={formik.handleSubmit} className='adminLoginForm mx-auto mt-5 p-5 rounded-4'>
          <Form.Group className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id='adminEmail' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
            {formik.touched.email && formik.errors.email ? (<div className='authErrorText'>{formik.errors.email}</div>) : null}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" id='adminPassword' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
            {formik.touched.password && formik.errors.password ? (<div className='authErrorText'>{formik.errors.password}</div>) : null}
          </Form.Group>
          <div className='mb-4'>
            <Link to={'/forgotpassword'} className='adminFrgtPwdText'>Forgot Password ?</Link>
          </div>
          <div className="d-grid mb-4">
            <Button className='adminFormBtns' type='submit'>Login</Button>
          </div>
          <hr style={{color:"black"}}/>
          <div className="d-grid mb-4">
            <Button className='adminFormBtns' onClick={()=>navigate('/admin/register')}>Sign Up</Button>
          </div>
        </Form>
      </Col>
    </Container>

    <AdminFooter/>
  </>
}

export default AdminLogin