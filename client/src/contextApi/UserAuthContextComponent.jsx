import React, {useState, useEffect} from 'react'
import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

export const UserAuthContext = React.createContext()

function UserAuthContextComponent({children}) {

    const [userAuth,setUserAuth] = useState([])
    
    const getUsers = async() => {
        try {
            let getToken = localStorage.getItem('loginToken')
            if(getToken){
                const decodedToken = jwtDecode(getToken)
                const id = decodedToken.id
                let res = await AxiosService.get(`${ApiRoutes.GETALLUSERS.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
                let result = res.data.allUsers
                let currentUser = result.filter((user)=> user._id === id)
                if(res.status === 200){
                    setUserAuth(currentUser)                    
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=>{
        getUsers()
    },[])

    return <>
        <UserAuthContext.Provider value={{userAuth}}>
            {children}
        </UserAuthContext.Provider>
    </>
}

export default UserAuthContextComponent