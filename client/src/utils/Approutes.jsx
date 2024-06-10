import Home from '../pages/home/Home'
import Login from '../pages/authentications/Login'
import Register from '../pages/authentications/Register'
// import Hotels from '../pages/hotelsList/Hotels'
import HotelPage from '../pages/hotelPage/HotelPage'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminRegister from '../pages/admin/AdminRegister'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminAddHotel from '../pages/admin/AdminAddHotel'
import AdminEditHotel from '../pages/admin/AdminEditHotel'
import UserAuthContextComponent from '../contextApi/UserAuthContextComponent'
import UserLogInStatusContextComponent from '../contextApi/UserLogInStatusContextComponent'
import AdminLogInStatusContextComponent from '../contextApi/AdminLogInStatusContextComponent'
import SharedDataComponent from '../contextApi/SharedDataComponent'
import MyProfile from '../pages/myProfile/MyProfile'

const Approutes = [
    {
        path : '/',
        element : <UserAuthContextComponent><UserLogInStatusContextComponent><SharedDataComponent><Home/></SharedDataComponent></UserLogInStatusContextComponent></UserAuthContextComponent>,
        exact : true
    },
    {
        path : '/login',
        element : <Login/>,
        exact : true
    },
    {
        path : '/register',
        element : <Register/>,
        exact : true
    },
    {
        path : '/myProfile',
        element : <UserAuthContextComponent><UserLogInStatusContextComponent><MyProfile/></UserLogInStatusContextComponent></UserAuthContextComponent>,
        exact : true
    },
    {
        path : '/hotels/:hotelId',
        element : <UserAuthContextComponent><UserLogInStatusContextComponent><SharedDataComponent><HotelPage/></SharedDataComponent></UserLogInStatusContextComponent></UserAuthContextComponent>,
        exact : true
    },
    // Admin
    {
        path : '/admin',
        element : <AdminLogin/>,
        exact : true
    },
    {
        path : '/admin/register',
        element : <AdminRegister/>,
        exact : true
    },
    {
        path : '/admin/dashboard',
        element : <AdminLogInStatusContextComponent><AdminDashboard/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/addHotel',
        element : <AdminLogInStatusContextComponent><AdminAddHotel/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/editHotel',
        element : <AdminLogInStatusContextComponent><AdminEditHotel/></AdminLogInStatusContextComponent>,
        exact : true
    },
]

export default Approutes