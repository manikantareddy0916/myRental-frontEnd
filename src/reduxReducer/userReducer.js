// const initialState={
//     user :[], serverErrors : []
// }
// export default function userReducer(state = initialState, action){
//         switch(action.type){
//             case 'ADD_USER' :{
//                 console.log("user-3")
//                 return{...state, user:[...state.user, action.payload]}
//             }
//             case 'SET_ERRORS' : {
//                 return { ...state , serverErrors : action.payload }
//             }
//             // case 'LOGOUT_USER': {
//             //     return { ...state, user:{}}
//             // }
//             default:{
//                 return { ...state }
//             }
//         }
// }