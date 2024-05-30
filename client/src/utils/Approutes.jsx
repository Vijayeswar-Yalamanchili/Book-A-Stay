import Home from '../components/pages/home/Home'
import Login from '../components/authentications/Login'
import Register from '../components/authentications/Register'
import Hotels from '../components/pages/hotelsList/Hotels'
import HotelPage from '../components/pages/hotelPage/HotelPage'

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