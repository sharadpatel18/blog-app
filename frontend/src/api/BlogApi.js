import Axios from 'axios'

const getAllBlog = async (jwtToken) => {
    try {
        const responce = await Axios.get(import.meta.env.VITE_ALL_BLOG_API, {
            headers: {
                "Authorization": `${jwtToken}`
            }
        })
        return responce.data;
    } catch (error) {
        
    }
}

const AddBlogApi = async (title , blogcontent , userId , username) => {
    try {
        const responce = await Axios.post(import.meta.env.VITE_ADD_BLOG_API, { title, blogcontent, userId, username })
        console.log(responce);
    } catch (error) {
        console.log(error);
    }
}


const getUpdateBlogApi = async (id) => {
    try {
        const responce = await Axios.get(`${import.meta.env.VITE_GET_UPDATE_BLOG_API}` + `${id}`)
        return responce.data[0]
    } catch (error) {
        console.log(error);
    }
}

const UpdateBlogApi = async (id ,title , blogcontent , userId ,username) => {
    try {
        const responce = await Axios.put(`${import.meta.env.VITE_UPDATE_BLOG_API}` + `${id}`, { title, blogcontent, userId, username })
        console.log(responce);
    } catch (error) {
        console.log(error);
    }
}   

const getPersonalBlogApi = async (id) => {
   try {
        const responce = await Axios.get(`${import.meta.env.VITE_GET_PERSONAL_BLOG_API}` + `${id}`)
        return responce.data;
   } catch (error) {
        console.log(error);
   }
}

const DeleteBlogApi = async (id) => {
    try {
        const responce = await Axios.delete(`${import.meta.env.VITE_DELETE_BLOG_API}` + `${id}`)
        return true
    } catch (error) {
        console.log(error);
    }
    
} 


const getBlogById = async (id) => {
    try {
        const responce = await Axios.get(`${import.meta.env.VITE_FULL_SCREEN_BLOG_API}`+`${id}`)
        return responce.data;
    } catch (error) {
        console.log(error);
    }
}

export { getAllBlog , AddBlogApi , getUpdateBlogApi , UpdateBlogApi , getPersonalBlogApi , DeleteBlogApi , getBlogById} 