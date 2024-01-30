import { useEffect } from "react"
import { startDistroyPayment } from "../actions/paymentAction"
import { useDispatch } from "react-redux"

export default function Failure(){

    const dispatchRdx = useDispatch()
    // const searchParams = new URLSearchParams(window.location.search)
    //     const success= searchParams.get('success')
    //     const cancel = searchParams.get('cancel')


    useEffect(() => {
        const stripId = localStorage.getItem('transactionId')
        if (stripId) {
          dispatchRdx(startDistroyPayment(stripId))
        }
      }, [])
      
    return (
        <h1>Failure</h1>
    )
}