const nodemailer = require('nodemailer');
const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
        user:"0246759@up.edu.mx",
        pass:"nxvuwyudxykmiwin"
    }
}

const send = async (email,subject,text) => {
    const transporter = nodemailer.createTransport(config);
    const mailOptions = {
        from: '"Coffee breaks" <0246759@up.edu.mx>',
        to: email,
        subject: subject,
        text: text,
        html: '<a href="http://localhost:5173/solicitudes">Consulta las solicitudes aquí</a>'
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