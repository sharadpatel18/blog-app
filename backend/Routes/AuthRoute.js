const { Signup, Login, ForgetPassword  , Resetpassword} = require('../controllers/AuthControllers')
const { SignupValidation, LoginValidation } = require('../middlewares/AuthValidation')

const router = require('express').Router()

router.post("/signup" , SignupValidation , Signup)
router.post("/login" , LoginValidation , Login)
router.post("/forgetpassword" , ForgetPassword)
router.post("/resetpassword/:id" , Resetpassword)

module.exports = router;