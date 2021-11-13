import axios from 'axios'
const api = axios.create({
    baseURL: "http://localhost:4000/api"
})


export const GetUserData = async (id)=>{
    return await api.get("/users/getUserData/"+id);
}

export const GetAllAction = async (id)=>{
    return await api.get(`users/getAllAction/${id}`)
}



export const AddWithDrawal=async(params)=>{
    return await api.post(`/users/addWithDrawal`, params)
}

export const TranferMoney=async(params)=>{
    return await api.post(`/users/TranferMoney`, params)
}

export const TransferCash=async(params)=>{
    return await api.post(`/users/TranferMoney`, params)
}


export const AddNewUser=async(params)=>{
    return await api.post(`/users/createUser`, params)
}

export const LoginUser = async (email, password) => {
    console.log('LoginUser api', email, password);
    return await api.get(`/users/login/${email}/${password}`, {})
}

export const GetAllUsers = async ()=>{
    return await api.get("/users/getAllUsers/")
}

export const GetFilteredUsers = async (params)=>{
    console.log('GetFilteredUsers', params);  
    return await api.get(`/users/getFilteredUsers/${params.filter}/${params.filterValue}`, params)
}

export const DeleteUser = async (id)=>{
    return await api.delete("/users/deleteUsers/"+id)
}

export const UpdateUserStatus = async (id)=>{
    return await api.put("/users/updateUserStatus/"+id)
}

export const TransferFromManager=async(params)=>{
    return await api.post(`/users/transferFromManager`, params)
}



