const {Router} = require('express');
const nodemailer = require('nodemailer');

require('dotenv').config();
const router = Router();

router.post('/send-email', async (req, res) => {
    const {email, nombre, texto} = req.body.form;

    const transporter = nodemailer.createTransport({
        host: `${process.env.HOST}`,
        port: '587',
        secure: false,
        auth:{
            user:`${process.env.EMAIL}`,
            pass: `${process.env.PASSWORD}`
        },
    });

    const mailOptions = {
        from: `'Club Santa Paula' <${process.env.EMAIL}>`,
        to: `${email}`,
        bcc: `${process.env.EMAIL}`,
        subject: 'Formulario de Contacto WEB CSP',
        text: `${texto}`
    }

    const info = await transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            return res.status(500).send({message: "error " + err.message});
        }
        return res.send({message: "Mensaje enviado"})
    })
})


module.exports = router;