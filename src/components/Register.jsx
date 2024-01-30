import { useState } from "react"
import {  useNavigate } from "react-router-dom"
import validator from 'validator'
import axios from "../configure/axios"
import Footer from "./Footer"
export  default function Register(){
    
    const navigate= useNavigate()
    const [userName, setUserName]= useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [serverErrors,  setServerErrors] = useState([])
    const [clientErrors, setClientErrors] = useState({})
    const errors ={}

   
    // console.log('eerrors',errors)
    const runValidation =()=>{
        //username
        if(userName.trim().length ==0){
            errors.userName = 'userName is required '
        }
        //email
        if(email.trim().length ==0){
            errors.email = 'email is required '
        }else if(!validator.isEmail(email)){
            errors.email = 'valid email is required'
        }
        //password
        if(password.trim().length ==0){
            errors.password = 'password is required '
        }else if(!validator.isStrongPassword(password)){
            errors.password= 'Strong password required'
        }
    }
    const onSubmit=async (e)=>{

        e.preventDefault()

        runValidation()
        if(Object.keys(errors).length ==0){
            const formData= {
                userName,
                email, 
                password
            }
            setClientErrors(errors)
            try{
                const response = await axios.post('/api/register',formData)
                // console.log('my',response.data)
               
                navigate('/Login', { state: {message: 'You Register Sucessfully'} })
            }
            catch(e){
                setServerErrors(e.response.data.errors)
                //console.log('ee',e.response.data.errors)
            }
        }else{
            setClientErrors(errors)
            //console.log('ser',errors)
        }
        
    }
    return(
        <div>
            <div className="reglog mt-3">

                <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1>Register </h1>
                    <>
                    {serverErrors.length > 0 && (
                    <div className="alert alert-danger ">
                        {serverErrors.map(ele => (
                        <li key={ele.msg}>{ele.msg}</li>
                        ))}
                    </div>
                    )}
                    </>
                    
                    <div className="data">
                        <input type="text" name="" placeholder="Enter your Username" 
                            value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                            <box-icon type='solid' name='user'></box-icon><br />
                            {clientErrors.userName && <span>{clientErrors.userName}</span>}
                    </div> 
                    <div className="data">
                        <input type="text" name="" placeholder="Enter your Email"  
                        value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <box-icon type='solid' name='envelope'></box-icon><br />
                        {clientErrors.email && <span>{clientErrors.email}</span>}
                    </div>
                    <div className="data">
                        <input type="text" name="" placeholder="Enter your password"  
                        value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <box-icon type='solid' name='lock'></box-icon> <br />
                        {clientErrors.password && <span>{clientErrors.password}</span>}       
                    </div>
                    <div className="submit">
                        <input type="submit" value='Submit'/>
                    </div>
                    <div>
                        <p>Go to Login Page - <a href="/Login">Login Page</a></p>
                    </div>
                </form>
                </div>
            </div>
        <Footer/>
        </div>
    
        
    )
}            
