import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import Table from 'react-bootstrap/Table';
import { Card,Row, Col,Button, Modal ,Carousel} from "react-bootstrap"
import ProfileStatistics from "./uProfile";
import { startGetMyRequests } from "../actions/rentalFormAction";

export default function AdmProfile(){

   
    const {state} = useContext(UserContext)
    //addressID
    

    
    

    
  

    return (
        <div>
            <ProfileStatistics ele={state.user} />
            {/* <Link to={`/Address/${aId}`} >Edit Address</Link> */}
        </div>
    )
}
