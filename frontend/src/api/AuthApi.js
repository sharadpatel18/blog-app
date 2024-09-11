import Axios from 'axios'

const SignupApi = async (name, email, password) => {
    try {
        const responce = await Axios.post(import.meta.env.VITE_SIGN_UP_API, { name, email, password })
        alert('signup successfully, please go to login page!')
        console.log(responce);
    } catch (error) {
        console.log(error);
    }
}

const LoginApi = async (email, password) => {
    try {
        const responce = await Axios.post( import.meta.env.VITE_LOGIN_API, { email, password }) 
        alert('login successfully')
        return responce.data;
    } catch (error) {
        
    }
}

export { SignupApi, LoginApi }