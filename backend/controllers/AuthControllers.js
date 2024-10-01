const User = require('../models/UserModule');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
require('dotenv').config()
const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name);
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "user is already existed", success: false })
        }
        const usermodule = new User({ name, email, password })
        usermodule.password = await bcrypt.hash(password, 10)
        usermodule.save()
        res.status(203)
            .json({ message: "signup successfully", success: true })
    } catch (error) {
        res.status(500)
            .json({
                message: "internal server error",
                success: false
            })
        console.log(error);
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(409)
                .json({
                    message: "email and password wrong",
                    success: false
                })
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403)
                .json({ message: "email and password is wrong" })
        }

        const jwtToken = jwt.sign({
            email: user.email,
            name: user.name,
            id: user._id
        },
            process.env.SCRETE_KEY,
            { expiresIn: "24h" }
        )
        res.status(203)
            .json({
                message: "Login successfully",
                success: true,
                jwtToken,
                email,
                name: user.name,
                id: user._id,
            })
    } catch (error) {
        res.status(500)
            .json({
                message: "internal server error",
                success: false
            })
        console.log(error);
    }
}

const ForgetPassword = async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({email})
    console.log(findUser._id);
    if (!findUser) {
        return res.status(401)
                    .json({message:"user is not existed" , success:false})
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
        }
    });
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <patelsharad595@gmail.email>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `http://localhost:5173/resetpassword/${findUser._id}`// plain text body
      });
}

const Resetpassword = async (req,res) => {
    const {id} = req.params;
    const {password} = req.body;
    console.log(id , password);
    try {
        const hassPass = await bcrypt.hash(password , 10)
        const updatePass = await User.findByIdAndUpdate(id , {password:hassPass})
        .then(()=>{
            console.log("updated");
        })
    } catch (error) {
        console.log(error,"password is not updated");
    }
} 

module.exports = {
    Signup,
    Login,
    ForgetPassword,
    Resetpassword
}