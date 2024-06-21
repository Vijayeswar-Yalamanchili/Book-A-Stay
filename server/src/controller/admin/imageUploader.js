import multer from 'multer'

const hotelImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "hotelImage") {
      // console.log("first")
      cb(null, 'hotelImages')
    }else if (file.fieldname === "roomImages") {
      cb(null, 'roomsImages');
    }
  },
  filename:(req,file,cb)=>{
    if (file.fieldname === "hotelImage") {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }  else  if(file.fieldname === "roomImages") {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  }

    // destination: function (req, file, cb) {
    //   console.log(file.fieldname) 
    //   cb(null, 'roomsImages')
    // },
    // filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    // }
})
  
const imageUpload = multer({ storage: hotelImageStorage })

export default {
  imageUpload
}