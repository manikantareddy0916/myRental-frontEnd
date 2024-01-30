// import axios from "../configure/axios"


// export const startUser =({formData,navigate})=>{
//     return async( dispatch)=>{
//         try{
//               const response = await axios.post('/api/login',formData)
//               //console.log('resp',response)
//               localStorage.setItem('token', response.data.token)
//               const profile = await axios.get('/api/account', {
//                 headers: {
//                    'Authorization': localStorage.getItem('token')
//                 }
//               })
//               console.log('prof. 1',profile.data)
//               //const user = profile.data
//               dispatch(addUser(profile.data))
//               navigate('/')
//             }
//             catch(e){
//                 if(e){
//                     dispatch(setServerErrors(e.response.data.errors))
//                 }
              
//               console.log('catch--2',e)
//             }
//     }
// }
// const addUser=(user)=>{
//     return {
//         type: 'ADD_USER',
//         payload: user
//     }
// }
// const setServerErrors = (err) => {
//     console.log('[',err)
//     return { type : 'SET_ERRORS', payload: err }
// }

// export const logout = (logout)=>{
//     return {type : 'LOGOUT_USER', payload : logout}
// }