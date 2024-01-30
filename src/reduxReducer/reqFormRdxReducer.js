const initialState ={
    allReqProducts : [], serverErrors : [] , getRequests : []
}

export default function reqForm (state = initialState, action) {
    switch( action.type){
        case 'STATUS_PAY_DONE': {
            console.log('Reducer state before:', state.allReqProducts,'dddddd',action.payload);
            return { ...state, allReqProducts: state.allReqProducts.filter((ele)=>{
                return ele._id !== action.payload
            })}
            
        }
        case "REQ_FORM" : {
            console.log('requestForm',action.payload)
            return {...state, allReqProducts : [ ...state.allReqProducts, action.payload] }
        }
        case 'ALL_RENTAL_PRODUCT':{
            return { ...state, allReqProducts: action.payload}
        }
        // case  'Pay_SUCCESS' : {

        // }
        // case 'PAYMENT_COMPLETED':{
        //     return { ...state, allReqProducts : [...state.allReqProducts.map((ele)=>{
        //         if(ele._id === action.payload._id){
        //             return {...ele}
        //         }else{
        //             return {...ele}
        //         }
        //     })]}
        //}
        case 'SERVER_ERRORS' : {
            return {...state, serverErrors : [...state.serverErrors, action.payload]}
        }
       case 'GET_REQUESTS' : {
            return {...state, getRequests: action.payload}
       }
       case 'ACCEPT_REQ' : {
            return {...state, getRequests: state.getRequests.filter((ele)=>{
                return ele._id != action.payload
            })}
       }
        default :{
            return {
                ...state
            }
        }
    }
}