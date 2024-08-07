import Home from '../pages/home/Home'
import Login from '../pages/authentications/Login'
import Register from '../pages/authentications/Register'
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
import AdminHotels from '../pages/admin/AdminHotels'
import AdminVillas from '../pages/admin/AdminVillas'
import AdminResorts from '../pages/admin/AdminResorts'
import AdminCottages from '../pages/admin/AdminCottages'
import AdminCabins from '../pages/admin/AdminCabins'
import AdminMyProfile from '../pages/admin/AdminMyProfile'
import AdminAllUsers from '../pages/admin/AdminAllUsers'
import AdminEditUser from '../pages/admin/AdminEditUser'
import AdminAddRoom from '../pages/admin/AdminAddRoom'
import AdminRoomsList from '../pages/admin/AdminRoomsList'
import ForgotPassword from '../pages/authentications/ForgotPassword'
import VerifyPassword from '../pages/authentications/VerifyPassword'
import ResetPassword from '../pages/authentications/ResetPassword'
import AdminForgotPassword from '../pages/admin/AdminForgotPassword'
import AdminVerifyPassword from '../pages/admin/AdminVerifyPassword'
import AdminResetPassword from '../pages/admin/AdminResetPassword'
import OrdersList from '../pages/orders/OrdersList'

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
        path : '/forgotpassword',
        element : <ForgotPassword/>,
        exact : true
    },
    {
        path:'/forgotpassword/:id/verify/:token',
        element : <VerifyPassword/>,
        exact:true
    },
    {
        path : '/resetPassword',
        element : <ResetPassword/>,
        exact: true
    },
    {
        path : '/orders/:id',
        element : <OrdersList/>,
        exact : true
    },
    {
        path : '/myProfile',
        element : <UserAuthContextComponent><UserLogInStatusContextComponent><MyProfile/></UserLogInStatusContextComponent></UserAuthContextComponent>,
        exact : true
    },
    {
        path : '/hotels/:id',
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
        path : '/admin/forgotpassword',
        element : <AdminForgotPassword/>,
        exact : true
    },
    {
        path:'/admin/forgotpassword/:id/verify/:token',
        element : <AdminVerifyPassword/>,
        exact:true
    },
    {
        path : '/admin/resetPassword',
        element : <AdminResetPassword/>,
        exact: true
    },
    {
        path : '/admin/myProfile',
        element : <AdminLogInStatusContextComponent><AdminMyProfile/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/dashboard',
        element : <AdminLogInStatusContextComponent><AdminDashboard/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/allusers',
        element : <AdminLogInStatusContextComponent><AdminAllUsers/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/edituser/:id',
        element : <AdminLogInStatusContextComponent><AdminEditUser/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/addStay',
        element : <AdminLogInStatusContextComponent><AdminAddHotel/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/editStay/:id',
        element : <AdminLogInStatusContextComponent><AdminEditHotel/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/rooms/:id',
        element : <AdminLogInStatusContextComponent><AdminRoomsList/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/addRoom/:id',
        element : <AdminLogInStatusContextComponent><AdminAddRoom/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/hotel',
        element : <AdminLogInStatusContextComponent><AdminHotels/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/villa',
        element : <AdminLogInStatusContextComponent><AdminVillas/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/resort',
        element : <AdminLogInStatusContextComponent><AdminResorts/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/cottage',
        element : <AdminLogInStatusContextComponent><AdminCottages/></AdminLogInStatusContextComponent>,
        exact : true
    },
    {
        path : '/admin/cabin',
        element : <AdminLogInStatusContextComponent><AdminCabins/></AdminLogInStatusContextComponent>,
        exact : true
    }

]

export default Approutes