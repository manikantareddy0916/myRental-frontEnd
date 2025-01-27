
import { useSelector } from "react-redux"
import { useContext, useState } from "react"
import { Card,Row, Col,Button, Modal ,Carousel} from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserContext } from "../App"
import PaymentItem from "./PaymentItem"
import Footer from "./Footer"
export default function Payment(){


    // const [pro ,setPro] = useState({})
    // const [price, setPrice] = useState(number)
    //const [status, setStatus]= useState('')

    const {state} = useContext(UserContext)
    //console.log('loginuser',state.user)
    let  footerValue = false
    const myReq = useSelector((state)=>{
        return state.reqForm.allReqProducts
    })
    console.log('requestedData',myReq)
    console.log('requestedData',(myReq.length))
    
    const dataa= myReq.map((ele)=>{
        if((ele.status == 'accepted' && ele.rentalUser._id == state.user._id )){
            footerValue=true
            return 0
        }
    })
    const pay = useSelector((state)=>{
        return state.payments.allPayments
    })

    //console.log('PaymentData',pay)
    // const d = pay.filter((ele) => {
    //     const foundElement = myReq.find((ele2) => ele2._id === ele.rentalProductId);
        
    //     if (foundElement) {
    //         console.log('Match found for:', ele.rentalProductId);
    //         return true;  // Include this element in the filtered result
    //     } else {
    //         console.log('No match for:', ele.rentalProductId);
    //         return false; // Exclude this element from the filtered result
    //     }
    // });
    //console.log('d', d);
    

    //localStorage.removeItem('rentalProductId');
    return (
        <div >
            <div className="p-3">
            <h2 style={{fontFamily: 'cursive'}}>Your Request is Accepted And Hear your Payment link  </h2>
            <Row xs={1} md={3} className="g-3 ">
                {/* {pay.map((ele)=>{
                    if(ele.rentalProductId === myReq._id){
                        return <h1>{ele._id}</h1>
                    }else{
                        return <h1>no</h1>
                    }
                })} */}
                {myReq.map((ele) => (
                    (ele.status == 'accepted' && ele.rentalUser._id == state.user._id )  ? 
                    <PaymentItem key= {ele._id} ele={ele}/>
                     : ''
                ))}
            </Row>
            </div>
            {!footerValue ? 
             <div className="fixed-bottom">
             <Footer/>
             </div>
             :
             <Footer/>
            }
            {/* <div >
            {myReq.length ==0 ?
            
            <div className="fixed-bottom">
            <Footer/>
            </div>
            :
            <Footer/>
            }
            </div> */}
           
        </div>
        
    )
}