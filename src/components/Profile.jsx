import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { startGetAddress } from "../actions/addressAction";
import { Card,Row, Col,Button, Modal ,Carousel} from "react-bootstrap"
import ProfileStatistics from "./uProfile";


export default function Profile(){
    
    const [toogle, setToogle]= useState(false)
    const dispatch=useDispatch()
    //userDetails
    const {state} = useContext(UserContext)
   // console.log('ss',state.user)
    //addressId
    const aId = useSelector((state)=>{
        return state.address.address[0]?._id
    })
    //console.log('Id',aId)

    const all = useSelector((state)=>{
        return state.payments.allPayments
    })
    //console.log('all',all)

    const payedProducts = useSelector((state)=>{
        return state.reqForm.allReqProducts
    })
    //console.log('productsPayed',payedProducts)
    const prodDetails = useSelector((state)=>{
        return state.reqForm.getRequests
    })
    console.log('proDetails',prodDetails)
   
 
       
   
    
    return(
        <div>
            <ProfileStatistics ele={state.user }/>
         
        </div>
    )
}