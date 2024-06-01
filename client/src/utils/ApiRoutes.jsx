const ApiRoutes = {
    // Users
    HOME : {
        path : '/home',
        authenticate : false
    },
    LOGIN : {
        path : '/users',
        authenticate : false
    },
    REGISTER : {
        path : '/users/register',
        authenticate : false
    },
    LOGOUT : {
        path : '/users/logout',
        authenticate : true
    },
    GETALLUSERS : {
        path : '/users/getallusers',
        authenticate :true
    },
    GETUSERBYID : {
        path : '/users/getuserbyid',
        authenticate :true
    },
    USERSEARCHDATA : {
        path : '/users/usersearchdata',
        authenticate :true
    },
    HOTELSLIST : {
        path : '/hotels/searchResult',
        authenticate :true
    }
}

export default ApiRoutes