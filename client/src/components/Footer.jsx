import React from 'react'
import { Form,Button,Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import logo from '../assets/book-a-stay.png'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

function Footer() {

  let emailFormik = useFormik({
    initialValues:{
        email : ''
    },
    validationSchema:Yup.object({          
        email:Yup.string().required('Email is required').email('Enter a valid email')
    }),
    onSubmit : async(values, { resetForm }) => {
        try {
          let res = await AxiosService.put(`${ApiRoutes.CONTACTEMAIL.path}`,values)
          if(res.status === 200){
              toast.success(res.data.message)
              resetForm()
          }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
  })

  return <>
  <div className='footer text-white'>
    <div className="footerBlock d-flex justify-content-between align-items-center">
      <div className="contactMail flex-column d-flex justify-content-between align-items-start">
        <div style={{fontSize : "1.5em"}} className='mb-3'>Save money, Stay Comfort</div>
        <div style={{fontSize : "1em"}}>List your Hotels? - Needed Offers? - Subscribe to know more!</div>

        <Form onSubmit={emailFormik.handleSubmit} className='inputField mt-2 d-flex justify-content-between align-items-center'>
          <input type ="email" placeholder='Enter your Email' className='mailInput p-2' name='email' onChange={emailFormik.handleChange} value={emailFormik.values.email} onBlur={emailFormik.handleBlur}/>
          <Button className='sendMailBtn' type="submit">Subscribe</Button>
        </Form>

      </div>
      <Link to={'/'} className='text-white text-decoration-none'>
        <div className='d-flex flex-column justify-content-between align-items-center'>
          <Image src={logo} className='logoImg'/>
          <div style={{fontSize : "1.5em"}}>book-A-stay</div>      
        </div>
      </Link>
    </div>
    <hr style={{color : "white"}}/>
    <div className='text-center pb-2' style={{fontSize : "0.7em"}}>Copyright &copy; 2024 Vijayeswar Yalmanchili</div>
  </div>
  </>
}

export default Footer