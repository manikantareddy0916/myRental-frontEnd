import { useEffect } from "react"
import { startUpdatePayment } from "../actions/paymentAction"
import { useDispatch, useSelector } from "react-redux"
import { startGetAllRentalProducts, startStatusPayCmp } from "../actions/rentalFormAction"
import { startProductNotAvailable } from "../actions/myProducts"

export default function Success(){

    const dispatchRdx = useDispatch()
    // const searchParams = new URLSearchParams(window.location.search)
    //     const success= searchParams.get('success')
    //     const cancel = searchParams.get('cancel')
    const pathN = window.location.pathname

    const payments = useSelector((state)=>{
        return state.payments.allPayments 
    })
    // console.log('11111',payments)

    const myReq = useSelector((state)=>{
        return state.reqForm.allReqProducts
    })
    console.log('222222222',myReq)

    //rentalproductid
    const rentalProductId = localStorage.getItem('rentalProductId')
        console.log('rentalProductID',rentalProductId)
    if(rentalProductId){
        console.log('working',rentalProductId)
        dispatchRdx(startStatusPayCmp(rentalProductId))
    }

    //productId notAvailable funcinality after payment sucessfull
    const productId = localStorage.getItem('productId')
    if(productId){
        console.log("productiddd",productId)
        dispatchRdx(startProductNotAvailable(productId))
    }

    
    useEffect( () => {
        const stripId = localStorage.getItem('transactionId')
        
        console.log('1',stripId)
        if(stripId){
            dispatchRdx(startUpdatePayment({stripId})) 
        }
        
      }, [])
      
    return (
        <h1>Payment Success</h1>
    )
}