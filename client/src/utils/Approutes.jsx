import Home from '../components/pages/Home'
import Login from '../components/authentications/Login'
import Register from '../components/authentications/Register'

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
    }
]

export default Approutes