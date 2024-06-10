const ApiRoutes = {
    //admin
    ADMINLOGIN : {
        path : '/users/admin',
        authenticate : false
    },
    ADMINREGISTER : {
        path : '/users/admin/register',
        authenticate : false
    },
    ADMINLOGOUT : {
        path : '/users/admin/logout',
        authenticate : true
    },
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
    CONTACTEMAIL : {
        path : '/users/contactemail',
        authenticate : false
    }, 
    PROFILEUPDATE : {
        path : '/users/userprofileupdate',
        authenticate : true
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
    },
    GETALLHOTELS : {
        path : '/hotels/allhotels',
        authenticate : false
    },
    HOTELBYID : {
        path : '/hotels',
        authenticate : true
    },
    COUNTBYCITY : {
        path : '/hotels/countbycity',
        authenticate : false
    },
    COUNTBYTYPE : {
        path : '/hotels/countbytype',
        authenticate : false
    }
}

export default ApiRoutes