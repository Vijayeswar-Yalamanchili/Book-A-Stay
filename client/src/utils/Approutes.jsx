import Home from '../pages/home/Home'
import Login from '../pages/authentications/Login'
import Register from '../pages/authentications/Register'
import Hotels from '../pages/hotelsList/Hotels'
import HotelPage from '../pages/hotelPage/HotelPage'

const Approutes = [
    {
        path : '/',
        element : <Home/>,
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
        element : <Hotels/>,
        exact : true
    },
    {
        path : '/hotels/:hotelId',
        element : <HotelPage/>,
        exact : true
    },
]

export default Approutes