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
    ADMINFORGOTPASSWORD : {
        path : '/admin/forgotpassword',
        authenticate : false
    },
    ADMINRESETPASSWORD : {
        path : '/admin/resetPassword',
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
    GETSTAYBYID : {
        path : '/admin/getstaybyid',
        authenticate :true
    },
    ADDSTAY : {
        path : '/admin/addstay',
        authenticate :true
    },
    UPDATESTAY : {
        path : '/admin/updatestay',
        authenticate :true
    },
    DELETESTAY : {
        path : '/admin/deletestay',
        authenticate :true
    },
    GETADMINALLUSERS : {
        path : '/admin/getadminallusers',
        authenticate :true
    },
    UPDATEADMINUSERS : {
        path : '/admin/updateadminuser',
        authenticate :true
    },
    DELETEADMINUSERS : {
        path : '/admin/deleteadminuser',
        authenticate :true
    },
    ADDROOM : {
        path : '/admin/addroom',
        authenticate :true
    },
    GETROOMSLIST : {
        path : '/admin/roomslist',
        authenticate :true
    },
    EDITROOM : {
        path : '/admin/editroom',
        authenticate :true
    },
    DELETEROOM : {
        path : '/admin/deleteroom',
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
    FORGOTPASSWORD : {
        path : '/users/forgotpassword',
        authenticate : false
    },
    RESETPASSWORD : {
        path : '/users/resetPassword',
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
    },
    GETROOMBYHOTELID : {
        path : `/rooms`,
        authenticate : true
    },
    UPDATEROOMAVAILABILITY : {
        path : `/rooms/availability`,
        authenticate : true
    },
    GETMYORDERS : {
        path : `/orders/myorders`,
        authenticate : true
    },
    UPDATEORDERDATA : {
        path : '/orders/updateOrderId',
        authenticate : true
    },
    //Razorpay
    ORDER : {
        path : '/razorpay/order',
        authenticate : true
    },
    VALIDATEORDER : {
        path : '/razorpay/order/validate',
        authenticate : true
    },
    
}

export default ApiRoutes