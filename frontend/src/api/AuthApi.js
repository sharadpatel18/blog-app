import Axios from 'axios'

const instance = Axios.create({
    baseURL:import.meta.env.VITE_AUTH_INSTANCE, 
})

const SignupApi = async (name, email, password) => {
    try {
        const responce = await instance.post('/signup', { name, email, password })
        console.log(responce);
    } catch (error) {
        console.log(error);
    }
}

const LoginApi = async (email, password) => {
    try {
        const responce = await instance.post('/login', { email, password }) 
        return responce.data;
    } catch (error) {
        
    }
}

export { SignupApi, LoginApi }