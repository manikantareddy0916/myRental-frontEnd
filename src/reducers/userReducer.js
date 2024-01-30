const userReducer = (state, action)=>{
    switch(action.type){
        case 'USER_LOGIN':{
            return{...state, user: action.payload}
        }
        case 'LOGOUT_USER': {
            console.log('ReducerLOGOUT',state.user)
            return {...state, user: {}}
        }
        case 'ADDRESS':{
            return {...state, address: action.payload}
        }
        case 'ADDRESS_ADD': {
            console.log(action.payload, "aaa")
            return {...state, address: [...state.address, action.payload]}
        }
        default:{
            return{...state}
        }
    }
}   

export default userReducer 