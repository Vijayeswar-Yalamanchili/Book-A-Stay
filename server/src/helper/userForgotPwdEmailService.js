import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service : 'gmail',
    secure : true,
    auth : {
        user : 'vijayeswarybe@gmail.com',
        pass : 'fhqyirzgxaznsliq'
    },
    tls : {
        rejectUnauthorized : false
    }
})

const forgotPasswordMail = async(to,emailVerifyURL) => {
    try {
        let mailContent = await transporter.sendMail({
            from: 'vijayeswarybe@gmail.com',
            to: to,
            subject: 'Code to reset password',
            html: `<div><h3>Hi sir/mam</h3></div>
            <div>
              <p>To reset your password,click the below link</p>
              <a href="${process.env.BASE_URL}/resetPassword">${emailVerifyURL}</a>     
              <p>Thanks!!!</p>       
            </div>
            `
        })
    } catch (error) {
        throw error.message
    }
}

export default forgotPasswordMail