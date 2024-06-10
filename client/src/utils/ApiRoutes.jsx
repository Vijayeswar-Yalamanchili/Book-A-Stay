const ApiRoutes = {
    //admin
    ADMINLOGIN : {
        path : '/admin',
        authenticate : false
    },
    ADMINREGISTER : {
        path : '/admin/register',
        authenticate : false
    },
    ADMINLOGOUT : {
        path : '/admin/logout',
        authenticate : true
    },
    GETADMINHOTELSLIST : {
        path : '/admin/hotelslist',
        authenticate :false
    },
    GETADMINVILLASLIST : {
        path : '/admin/villaslist',
        authenticate :false
    },
    GETADMINRESORTSLIST : {
        path : '/admin/resortslist',
        authenticate :false
    },
    GETADMINCOTTAGESLIST : {
        path : '/admin/cottageslist',
        authenticate :false
    },
    GETADMINCABINSLIST : {
        path : '/admin/cabinslist',
        authenticate :false
    },
    GETADMINUSERBYID : {
        path : '/admin/getadminuserbyid',
        authenticate :true
    },
    GETTYPESLIST : {
        path : '/admin/gettypeslist',
        authenticate :true
    },
    DELETESTAY : {
        path : '/admin/deletestay',
        authenticate :true
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