import axios from "../configure/axios"


export const startForm=({rId,formData,reset,setClientErrors,navigate,setToogle})=>{
    return async (dispatch)=>{
       
        try{
           
            const response = await axios.post(`/api/rentaProduct/add/${rId}`,formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : localStorage.getItem('token')
                }
            })
            
            console.log('RES.DATA',response.data)
            dispatch(requestForm(response.data))
            setClientErrors({})
            reset()
            setToogle(false)
            navigate('/',{state: {messageSendReq : 'You Send Request Sucesufflly'}})
            
        }catch(e){
            //console.log('ee',e)
            dispatch(serverErrors(e.response.data.errors))
        }
    }
}

const requestForm = (form) =>{
    return {
        type : "REQ_FORM",
        payload : form
    }
}
const serverErrors = (errors)=>{
    return{
        type: 'SERVER_ERRORS',
        payload: errors
    }
}

//all
export const startGetAllRentalProducts =()=>{
    return async(dispatch)=>{
        try{
            const resp = await axios.get('/api/rentalProduct/all',{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            //console.log('noe',resp.data)
            dispatch(getAllRentalPro(resp.data))
            //console.log('suuuu')
        }catch(e){
            console.log('e',e)
        }
    }
}
const getAllRentalPro =( prod)=>{
    return {
        type: 'ALL_RENTAL_PRODUCT',
        payload: prod
    }
}

// export const startGetRentalProducts =()=>{
//     return async(dispatch)=>{
//         try{
//             const resp = await axios.get('/api/rentaProduct/list',{
//                 headers:{
//                     'Authorization': localStorage.getItem('token')
//                 }
//             })
//             //console.log('noe',resp)
//             dispatch(getRentalPro(resp.data))
//         }catch(e){
//             console.log('e',e)
//         }
//     }
// }
// const getRentalPro =( prod)=>{
//     return {
//         type: 'RENTAL_PRODUCT',
//         payload: prod
//     }
// }


export const startGetMyRequests =()=>{
    return async (dispathcRdx)=>{
        try{
            const resp = await axios.get('/api/rentalProduct/requests',{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            console.log('getReq',resp.data)
            dispathcRdx(getRequests(resp.data))
        }catch(e){
            console.log('e',e)
        }
    }
}
const getRequests = (getReq)=>{
    return {
        type : 'GET_REQUESTS',
        payload: getReq
    }
}

export const startAcceptedRequests =({aId})=>{
    return async(dispatchRdx)=>{
        try{
            console.log('jj',aId)
            const acce = await axios.put(`/api/requests/accept/${aId}`,{},{
                headers:{
                    'Authorization': localStorage.getItem('token')
                  }
                })
                console.log('ddddddd',acce.data)
               dispatchRdx(acceptData(acce.data._id))
        }catch(e){
            console.log('e',e)
        }
    }
}

const acceptData = (acc)=>{
    return {
        type : 'ACCEPT_REQ',
        payload: acc
    }
}
export const startStatusPayCmp = (aid)=>{
    return async(dispatch)=>{
        console.log('aid',aid)
        try{
            const resp = await axios.put(`/api/requests/payCompleted/${aid}`,{},{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('sldkjf',resp.data)
            localStorage.removeItem("rentalProductId");
            dispatch(payCompleted(resp.data._id))
        }catch(e){
            console.log('startstatuspaycmp',e)
        }
    }
}
const payCompleted = (payComp)=>{
    return {
        type: 'STATUS_PAY_DONE',
        payload: payComp
    }
}