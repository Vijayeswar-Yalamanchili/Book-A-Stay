import Home from '../pages/home/Home'
import Login from '../pages/authentications/Login'
import Register from '../pages/authentications/Register'
import Hotels from '../pages/hotelsList/Hotels'
import HotelPage from '../pages/hotelPage/HotelPage'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminRegister from '../pages/admin/AdminRegister'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminAddHotel from '../pages/admin/AdminAddHotel'
import AdminEditHotel from '../pages/admin/AdminEditHotel'
import UserAuthContextComponent from '../contextApi/UserAuthContextComponent'
import UserLogInStatusContextComponent from '../contextApi/UserLogInStatusContextComponent'

const Approutes = [
    {
        path : '/',
        element : <UserAuthContextComponent><UserLogInStatusContextComponent><Home/></UserLogInStatusContextComponent></UserAuthContextComponent>,
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
        path : '/hotels',
        element : <UserAuthContextComponent><UserLogInStatusContextComponent><Hotels/></UserLogInStatusContextComponent></UserAuthContextComponent>,
        exact : true
    },
    {
        path : '/:hotelId',
        element : <UserAuthContextComponent><UserLogInStatusContextComponent><HotelPage/></UserLogInStatusContextComponent></UserAuthContextComponent>,
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
        element : <AdminDashboard/>,
        exact : true
    },
    {
        path : '/admin/addHotel',
        element : <AdminAddHotel/>,
        exact : true
    },
    {
        path : '/admin/editHotel',
        element : <AdminEditHotel/>,
        exact : true
    },
]

export default Approutes