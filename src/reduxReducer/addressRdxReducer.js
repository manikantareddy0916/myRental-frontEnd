const initialState={
    address :[], serverErrors : [], allAddress : []
}

export default function addressRdxReducer(state = initialState, action){
        switch(action.type){
            case 'ADD_ADDRESS' :{
                return{...state, address:[...state.address, action.payload]}
            }
            case 'GET_ADDRESS':{
                return {...state, address: action.payload}
            }
            case 'SET_ERRORS' : {
                console.log('SetErrorrs', serverErrors)
                return { ...state , serverErrors : action.payload }
            } 
            // case 'SET_ERRORS_EDIT' : {
            //     console.log('SetErrorrs', serverErrors)
            //     return { ...state , serverErrors : action.payload }
            // } 
            case 'EDIT_ADDRESS' :{
                console.log('edited','address',action.payload)
                return { ...state, address: state.address.map((ele)=>{
                    if(ele._id === action.payload._id){
                        return {...ele, ...action.payload}
                    }else{
                        return {...ele}
                    }
                })}
            }
            
            case 'ALL_USER_ADDRESS' : {
                return {...state, allAddress: action.payload}
            }
            case 'LOGOUT_ADDR_RDX':{
                console.log('errorRDXX',state.address)
                return {...state, address:[]}
            }
            default:{
                return { ...state }
            }
        }
}