const { Signup, Login } = require('../controllers/AuthControllers')
const { SignupValidation, LoginValidation } = require('../middlewares/AuthValidation')

const router = require('express').Router()

router.post("/signup" , SignupValidation , Signup)
router.post("/login" , LoginValidation , Login)


module.exports = router;