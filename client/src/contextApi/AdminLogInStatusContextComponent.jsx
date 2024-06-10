import React, { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"
import AxiosService from "../utils/AxiosService"
import ApiRoutes from "../utils/ApiRoutes"

export const AdminStatusContext = React.createContext()

function AdminLogInStatusContextComponent({children}){

  let navigate = useNavigate()
  let getLoginToken = localStorage.getItem('adminLoginToken')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const getLoginStatus = async() => {
    try {
      if(!getLoginToken){
        navigate('/admin')
      }else{
        const decodedToken = jwtDecode(getLoginToken)
        const id = decodedToken.id
        const res = await AxiosService.get(`${ApiRoutes.GETADMINHOTELSLIST.path}/${id}`, {headers : { 'Authorization' : `${getLoginToken}`}})
        let result = res.data.userById
        if(result){
          setIsLoggedIn(result.isLoggedIn)
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    getLoginStatus()
  },[isLoggedIn])

  return <>
    <AdminStatusContext.Provider value={{isLoggedIn}}>
      {children}
    </AdminStatusContext.Provider>
  </>
}

export default AdminLogInStatusContextComponent