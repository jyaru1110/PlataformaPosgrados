const user =  process.env.EMAIL;
const pass = process.env.PASS;
const nodemailer = require('nodemailer');
const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
        user:user,
        pass:pass
    }
}

const send = async (email,subject,text,id) => {
    const transporter = nodemailer.createTransport(config);
    const mailOptions = {
        from: '"Coffee breaks" <0246759@up.edu.mx>',
        to: email,
        subject: subject,
        text: text,
        html: '<a href="http://localhost:5173/solicitudes">Consulta las solicitudes aquí '+id+'</a>'
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = send;