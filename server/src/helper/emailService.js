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

const contactEmailId = async(to) => {
    try {
        let mailContent = await transporter.sendMail({
            from : 'vijayeswarybe@gmail.com',
            to : to,
            subject : 'Connect with book-A-stay!!!',
            html : `<div>
              <p>Hi Sir/Mam, <br><br>
                Thanks for reaching out. We will get back to you as soon to discuss more <br><br>
                With Regards, <br>
                book-A-stay </p>
            </div>`
        })
    } catch (error) {
        throw "something went wrong in submiting request"
    }
}

export default contactEmailId