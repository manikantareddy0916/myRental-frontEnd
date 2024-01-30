import axios from "../configure/axios"


export const startCreateAddress =({formData,resetForm,redirect})=>{
    return async( dispatch)=>{
        try{
            //console.log('md',formData)
            const response = await axios.post('/api/address/add',formData,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            //console.log('fffffffff ',response.data)
            dispatch(addAddress(response.data))//redux
            
            resetForm()
            redirect()
        }catch(e){
            console.log('ee',e)
            dispatch(setServerErrors(e.response.data.errors))
        }
    }
    
}
const addAddress=(address)=>{
    return {
        type: 'ADD_ADDRESS',
        payload: address
    }
}
const setServerErrors = (err) => {
    return { type : 'SET_ERRORS', payload: err }
}

//get user address only
export const startGetAddress =()=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.get('/api/address/list',{
                headers : {
                    'Authorization':localStorage.getItem('token')
                }
            })
            //console.log('userAddress',resp.data)
            dispatch(getAddress(resp.data))
        }catch(e){
            console.log('err',e)
        }
    }
}
const getAddress =(addr)=>{
    return{
        type: 'GET_ADDRESS',
        payload: addr
    }
}
//get all address
export const startAllAddress =()=>{
    return async (dispatch) =>{
        try{
            const resp = await axios.get('/api/address/all',{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            //console.log('allAdress',resp.data)
            dispatch(getAllAddress(resp.data))
        }
        catch(e){
            console.log('error',e)
        }
    }
}
const getAllAddress =(allAddress)=>{
    return {
        type : 'ALL_USER_ADDRESS',
        payload : allAddress
    }
}
//Edit user Address 
export const startEditAddress =({aId,formData,resetForm,redirect2})=>{
    return async (dispatch)=>{
        try{
            console.log('aId',aId)
            console.log('formData',formData)
            const resp = await axios.put(`/api/address/update/${aId}`,formData,{
                headers :{
                    'Authorization':localStorage.getItem('token')
                }
            })
            console.log('editaddress',resp)
            dispatch(editAddress(resp.data))
            resetForm()
            redirect2()
        }catch(e){
            console.log('e',e)
            dispatch(ServerErrors(e.response.data.errors))
        }
    }
}
const editAddress = (edit) =>{
    return {
        type : 'EDIT_ADDRESS',
        payload: edit
    }
}
const ServerErrors = (err) => {
    return { type : 'SET_ERRORS', payload: err }
}