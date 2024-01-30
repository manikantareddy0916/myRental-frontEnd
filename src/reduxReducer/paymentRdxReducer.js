const initialState = { payment:{}, allPayments:[] }

export const paymentsReducer = (state=initialState,action) => {
    switch(action.type){
        case 'SUCCESS_PAYMENT':{
            
            //console.log('6',action.payload)
            return {...state, payment : action.payload }    
        }
        case 'USER_PAYMENT_LIST' : {
            return { ...state, allPayments: [...state.allPayments, action.payload]}
        }
        case 'USER_PAY_LIST' : {
            //console.log('6',action.payload)
            return {...state, allPayments: action.payload}
        }
        default : {
            return {...state}
        }
    }
}