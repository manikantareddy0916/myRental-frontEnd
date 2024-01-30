import axios from "../configure/axios"
import { startGetAllRentalProducts } from "./rentalFormAction"

export const startPaymentCreate = ({totalPrice})=>{
    return async()=>{
        try{
          console.log('totalpro',totalPrice)
          //console.log('local',localStorage.getItem('token'))
            const result = await axios.post('/api/payment/create',totalPrice,{
           headers:{
            'Authorization':localStorage.getItem('token')
           }
        })
        console.log('result',result)
        //storing to localStorage
        localStorage.setItem("transactionId", result.data.id);
       
        window.location = result.data.url
        }catch(e){
            console.log('paymenterror',e)
        }
    }
}


export const startUpdatePayment = ({ stripId }) => {
    return async (dispatch) => {
      try {
        console.log('33333', stripId);
        //await dispatch(startGetAllRentalProducts())
        const response = await axios.put(`/api/payment/update/${stripId}`,null,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        //console.log('4', response.data);
        if (Object.keys(response.data).length > 0) {
         
         // console.log('5', response.data);
          dispatch(userPamentList(response.data));

          console.log('p',response.data.rentalProductId)
          localStorage.setItem("rentalProductId", response.data.rentalProductId);
          dispatch(reqPro(response.data.rentalProductId));
          
          console.log('productId',response.data.productId)
          localStorage.setItem("productId", response.data.productId)
          //dispatch(productStock(response.data.productId))  we cannot dispatch only store in localstoreage and dispatch in successpage
          localStorage.removeItem("transactionId");
        }
      } catch (e) {
        console.log('eeeee', e);
      }
    };
  };
const userPamentList = (payll)=>{
  return {
    type: 'USER_PAYMENT_LIST', 
    payload: payll
  }
}
const reqPro = (id)=>{
  return {
    type : 'PAY_COMPLETE',
    payload : id
  }
}
// const statusPaySucces = (id)=>{
//   return{
//     type : 'Pay_SUCCESS',
//     payload: id
//   }
// }
// const successPayment = (data) => {
//     return {type:'SUCCESS_PAYMENT',payload:data}
// }
  
export const startUserPaymentList = ()=>{
  return async (dispatch)=>{
    try{
      const resp = await axios.get('/api/payment/userList',{
        headers:{
          'Authorization': localStorage.getItem('token')
        }
      })
      //console.log('kj',resp.data)
      dispatch(userPayment(resp.data))
    }catch(e){
      console.log('err',e)
    }
  }
}
const userPayment =(payList)=>{
  console.log('2',payList)
  return {
    type: 'USER_PAY_LIST',
    payload : payList
  }
}

export const startDistroyPayment = (stripId) => {
  return async (dispatch) => {
    try {
      const deletePayment = await axios.delete(`/api/payments/delete/${stripId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(deletePayment);
      localStorage.removeItem('stripId')
    } catch (e) {
      console.log(e);
    }
  }
}