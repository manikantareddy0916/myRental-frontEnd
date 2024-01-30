import axios from "../configure/axios"

export  const startCategory=({formData, setName, setClientErrors})=>{
    return async ( dispatch )=>{
        try{
            const response = await axios.post('/api/category',formData,{
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            console.log('cat111111',response.data) // single obj
            dispatch(addCategory(response.data))
            setName('')
            setClientErrors({})
        }catch(e){
            console.log('ee',e)
        }
    }
}

const addCategory =(category)=>{
    return {
        type : 'ADD_CATEGORY',
        payload : category
    }
}

export const startDeleteId=({id})=>{
    return async (dispatch)=>{
        try{
            const respo = await axios.delete(`/api/category/delete/${id}`,{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            console.log('f',respo.data._id)
            dispatch(deleteCategory(respo.data._id))

        }catch(e){
            alert('error',e)
        }
    }
}
const deleteCategory =(id)=>{
    return {
        type : 'DELETE_CATEGORY',
        payload: id
    }
}
 
export const startAllCategorys =()=>{
    return async ( dispatch )=>{
        try{
            const resp = await axios.get('/api/category/list',{
              headers: {
                'Authorization':localStorage.getItem('token')
              }
            })
            dispatch(allCategory(resp.data))
          }catch(e){
            console.log('err',e)
          }
    }
}
const allCategory =(cat)=>{
    return {
        type:'SET_ALL_CATEGORY',
        payload : cat
    }
}