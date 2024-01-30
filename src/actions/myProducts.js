import axios from "../configure/axios"


export const startMyProducts=({formData,reset,setClientErrors,setToogle,notify})=>{
    return async (dispatch)=>{
       
        try{
            //console.log('ACTION PRODUCT11',formData)
            const response = await axios.post('/api/product/add',formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : localStorage.getItem('token')
                }
            })
            // console.log('ACTION PRODUCT22',formData)
            // console.log('RES.DATA',response.data)
            dispatch(addProduct(response.data))
            setClientErrors({})
            notify()
            reset()
            setToogle(false)

            
        }catch(e){
            //console.log('ee',e)
            dispatch(serverErrors(e.response.data.errors))
        }
    }
}

const addProduct = (products) =>{
    return {
        type : "ADD_PRODUCTS",
        payload : products
    }
}
const serverErrors = (errors)=>{
    return{
        type: 'SERVER_ERRORS',
        payload: errors
    }
}
export const startMyAllProducts = ()=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.get(`/api/product/list`,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            //dispatch(myAllProducts(resp.data))
        }
        catch(e){
            console.log('err',e)
        }
    }
}
// const myAllProducts =(pro)=>{
//     return{
//         type :"ADD_ALL_PRODUCTS",
//         payload : pro
//     }
// }
export const startAllProducts = ()=>{
    return async (dispatch) =>{
        //?page=${currentPage}
        try{
            const resp = await axios.get(`/api/product/listAll`,{
              headers:{
                'Authorization': localStorage.getItem('token')
              }
            }) 
            dispatch(addAllProducts(resp.data))
            // console.log('ALLproductsUseEff',resp.data)
            //dispatch({ type : "ADD_ALL_PRODUCTS", payload: resp.data})
          }
          catch(e){
            console.log('err',e)
          }
    }
}
const addAllProducts =(pro)=>{
    return{
        type :"ADD_ALL_PRODUCTS",
        payload : pro
    }
}

//Edit product 
export const startEdit =({editProId,formData,reset,setClientErrors,setToogle})=>{
    return async (dispatch)=>{
        try{
           console.log('Aciton1',formData,editProId)
            const resp = await axios.put(`/api/product/update/${editProId}`,formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data',
                    'Authorization':localStorage.getItem('token')
                }
            })
            console.log('AACTIONresp',resp.data)
            dispatch(proEdit(resp.data))
            setClientErrors({})
            reset()
            setToogle(false)
        }catch(e){
            console.log('er',e)
        }
    }
}

const proEdit = (editPro)=>{
    return {
        type: 'EDIT_PRODUCT', 
        payload: editPro
    }
}


export const startDelete =({id})=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.delete(`/api/product/delete/${id}`,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('djf',resp.data)
            dispatch(productDelete(resp.data._id))
        }
        catch(e){
            console.log('error',e)
        }
    }
}
const productDelete =(id)=>{
    return {
        type : 'PRODUCT_DELETE',
        payload : id
    }
}
export const startProductNotAvailable =(pId)=>{
    return async (dispatch)=>{
        try{
            console.log("pID",pId)
            const resp = await axios.put(`/api/product/updateStock/${pId}`,{},{
                headers:{
                    "Authorization": localStorage.getItem('token')
                }
            })
            console.log('data',resp.data)
            localStorage.removeItem("productId");
            dispatch(stockNot(resp.data))
        }
        catch(e){
            console.log('error',e)
        }
    }
}
const stockNot =(stockProduct)=>{
    return {
        type: 'STOCK_NOT_AVAILABLE',
        payload: stockProduct
    }
}
export const startMakeAvailable =(pId)=>{
    return async (dispatch)=>{
        try{
            console.log("pIDava",pId)
            const resp = await axios.put(`/api/product/updateStockAvlb/${pId}`,{},{
                headers:{
                    "Authorization": localStorage.getItem('token')
                }
            })
            console.log('data',resp.data)
            dispatch(stockAvalb(resp.data))
        }
        catch(e){
            console.log('error',e)
        }
    }
}
const stockAvalb =(stockProduct)=>{
    return {
        type: 'STOCK_AVAILABLE',
        payload: stockProduct
    }
}

export const startQuery =({searchValue,sortValue})=>{
    return async (dispatch)=>{
        try{
            //console.log('noo',searchValue)
            if(searchValue){
                const resp = await axios.get(`/api/product/listQuery?search=${searchValue}`,{
                    headers:{
                        "Authorization": localStorage.getItem('token')
                    }
                })
               // console.log('data',resp.data)
                dispatch(query(resp.data))
            }
            if(sortValue){
                if(sortValue){
                    console.log('noo',sortValue)
                    const resp = await axios.get(`/api/product/listQuery?sort=${sortValue}`,{
                        headers:{
                            "Authorization": localStorage.getItem('token')
                        }
                    })
                    console.log('hoho',resp.data)
                    dispatch(query(resp.data))
                }
            }
            
        }
        catch(e){
            console.log('error',e)
        }
    }
}
const query =(Query)=>{
    return {
        type: 'QUERY',
        payload: Query
    }
}
