import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../configure/axios"
import validator from "validator"
import { useContext } from "react"
import { UserContext } from "../App"
import { useDispatch, useSelector } from "react-redux" 
import { startAllCategorys } from "../actions/categoryAction"
import { startAllProducts } from "../actions/myProducts"
import { startAllAddress, startGetAddress } from "../actions/addressAction"
import { startGetAllRentalProducts, startGetMyRequests } from "../actions/rentalFormAction"
import { startUserPaymentList } from "../actions/paymentAction"
// import { startUser } from "../actions/userAction"
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom"
import Footer from "./Footer"
export default function Login(){
   
    const  {dispatch} = useContext(UserContext)
    const dispatchRdx = useDispatch() //redux
    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [serverErrors, setServerErrors] = useState([])
    const [clientErrors, setClientErrors] = useState({})
    const errors ={}

    const msg = location.state?.message
    const notify = () => toast(msg);
//     const serverErrors = useSelector((state)=> {
//       return state.user.serverErrors
//     })
// if(serverErrors){
//   console.log('jjj',serverErrors)
// }
    const runValidation =()=>{
      //email
      if(email.trim().length ==0){
          errors.email = 'EMAIL IS REQUIRED '
      }else if  (!validator.isEmail(email)){
          errors.email = 'valid email is required'
      }
      //password
      if(password.trim().length ==0){
          errors.password = 'password is required '
      }else if(!validator.isStrongPassword(password)){
          errors.password= 'Strong password required'
      }
  }
  

    const handleSubmit= async (e)=>{
      e.preventDefault()
      runValidation()

      if(Object.keys(errors).length ==0){
        const formData={
          email,
          password
        }
        setClientErrors(errors)
        try{
          const response = await axios.post('/api/login',formData)
          //console.log('resp',response)
          localStorage.setItem('token', response.data.token)
          const profile = await axios.get('/api/account', {
            headers: {
               'Authorization': localStorage.getItem('token')
            }
          })  
          //console.log('prog',profile)
          
          const user = profile.data
          dispatch({ type : 'USER_LOGIN', payload: user}) //reducer
          dispatchRdx(startAllCategorys())

          dispatchRdx(startAllProducts())

          dispatchRdx(startGetAddress())
          dispatchRdx(startAllAddress())

          dispatchRdx(startGetAllRentalProducts())
         
          dispatchRdx(startGetMyRequests())
          dispatchRdx(startUserPaymentList())
          
          navigate('/', { state: {message: 'You Login Sucessfully'} })
        }
        catch(e){
          setServerErrors(e.response.data.errors)
          //console.log('catch',e)
        }
      
        // dispatch(startUser({formData,navigate})) redux
      }else{
        setClientErrors(errors)
      }
      
      
    }
    useEffect(()=>{
      notify()
    },[])
   
    return(
    <div>
      <div className="reglog">
     
     <div className="form">
     <form action="" onSubmit={handleSubmit}>
       <h1>Login</h1>
       <>
       {serverErrors.length > 0 && (
               <div className="alert alert-danger">
                   {serverErrors.map(ele => (
                       <li key={ele.msg}>{ele.msg}</li>
                   ))}
               </div>
           )}
       </>
       <div className="data">
           <input type="text"  name="" placeholder="Enter your email" 
           value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
           <box-icon name="user"></box-icon>
           {clientErrors.email && <span>{clientErrors.email}</span>}
       </div>
       <div className="data">
           <input type="password"  name="" placeholder="Enter your password" 
           value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
           <box-icon type='solid' name='lock'></box-icon> 
           {clientErrors.password && <span>{clientErrors.password}</span>}
       </div>
       <div className="submit">
               <input type="submit" value='Submit'/>
       </div>
       <div>
           <p>dont have an account? <a href="/Register">Register</a></p>
       </div>
     </form>
     </div>  
    
     <ToastContainer/>
   </div>
   <Footer/>
  </div>
    
    )
}            
