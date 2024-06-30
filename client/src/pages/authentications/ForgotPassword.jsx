import React from 'react'
import { Col, Button, Form, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import AppNavbar from '../../components/AppNavbar'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function ForgotPassword() {

  const navigate = useNavigate()

  let formik = useFormik({
    initialValues:{
      email:'',
    },
    validationSchema:Yup.object({          
      email:Yup.string().required('Email is required').email('Enter a valid email'),
    }),
    onSubmit : async(values) => {
        console.log(values)
        try {
            let res = await AxiosService.put(`${ApiRoutes.FORGOTPASSWORD.path}`,values)
            if(res.status === 200){
                toast.success(res.data.message)
                localStorage.setItem('forgotPassToken',res.data.forgotPassToken)
                // navigate('/login')
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
                <Form.Group className="mb-5">
                    <Form.Label>Enter Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                    {formik.touched.email && formik.errors.email ? (<div className='authErrorText'>{formik.errors.email}</div>) : null}
                </Form.Group>
                <div className="d-grid mb-4">
                    <Button  utton className='formBtns' type='submit'>Send password</Button>
                </div>
            </Form>
      </Col>
    </Container>

    <Footer/>
  </>
}

export default ForgotPassword