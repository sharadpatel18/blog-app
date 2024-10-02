import Axios from 'axios'

const instance = Axios.create({
    baseURL: import.meta.env.VITE_BLOG_INSTANCE,
})

const getAllBlog = async (jwtToken) => {
    try {
        const responce = await instance.get('/public/blogdata', {
            headers: {
                "Authorization": `${jwtToken}`
            }
        })
        return responce.data;
    } catch (error) {

    }
}

const AddBlogApi = async (title, blogcontent, userId, username, jwtToken) => {
    try {
        const responce = await instance.post('/blogdata', { title, blogcontent, userId, username }, {
            headers: {
                "Authorization": `${jwtToken}`
            }
        })
        console.log(responce);
    } catch (error) {
        console.log(error);
    }
}


const getUpdateBlogApi = async (id, jwtToken) => {
    try {
        const responce = await instance.get('/clickedblog/' + `${id}`, {
            headers: {
                "Authorization": `${jwtToken}`
            }
        })
        return responce.data[0]
    } catch (error) {
        console.log(error);
    }
}

const UpdateBlogApi = async (id, title, blogcontent, userId, username, jwtToken) => {
    try {
        console.log(id,title);
        
        const responce = await instance.put('/blogdata/' + `${id}`, { title, blogcontent, userId, username }, {
            headers: {
                "Authorization": `${jwtToken}`
            }
        })
        console.log(responce);
    } catch (error) {
        console.log(error);
    }
}

const getPersonalBlogApi = async (id) => {
    try {
        const responce = await instance.get('/blogdata/' + `${id}`)
        return responce.data;
    } catch (error) {
        console.log(error);
    }
}

const DeleteBlogApi = async (id, jwtToken) => {
    try {
        const responce = await instance.delete('/blogdata/' + `${id}`, {
            headers: {
                "Authorization": `${jwtToken}`
            }
        })
        return true
    } catch (error) {
        console.log(error);
    }

}


const getBlogById = async (id, senderId, editBlog) => {
    try {
        const responce = await instance.get("/clickedblog/" + `${id}`)
        return responce.data;
    } catch (error) {
        console.log(error);
    }
}

const ReqToEdit = async (senderId, recieverId, editData) => {
    try {
        const responce = await instance.post('/reqtoedit', { senderId: senderId, recieverId: recieverId, editData: editData, isCompleted: false , isAccepted:false})
        console.log(responce.data);
    } catch (error) {
        console.log(senderId, recieverId, editData);
        console.log(error);
    }
}

const getEditBlogbyId = async (recieverId) => {
    try {
        const responce = await instance.get('/geteditreqblog/' + `${recieverId}`)
        return responce.data;
    } catch (error) {
        console.log(error);
    }
}

const RequestAcceptOrReject = async (id , isAccepted) => {
    try {
        const responce = await instance.patch('/updaterequestedblog/' + `${id}` , {isCompleted:true , isAccepted:isAccepted})
        return responce
    } catch (error) {
        console.log(error);
    }
}


const EditHistory = async (recieverId) => {
    try {
        const responce = await instance.get("/gethistorybyid/"+`${recieverId}`)
        return responce.data
    } catch (error) {
        console.log(error);
    }
}

export { getAllBlog, AddBlogApi, getUpdateBlogApi, UpdateBlogApi, getPersonalBlogApi, DeleteBlogApi, getBlogById, ReqToEdit, getEditBlogbyId  , RequestAcceptOrReject, EditHistory} 