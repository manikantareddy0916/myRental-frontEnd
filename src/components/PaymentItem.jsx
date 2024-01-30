import { useDispatch , useSelector} from "react-redux"
import axios from "../configure/axios"
import { Card,Row, Col,Button, Modal ,Carousel} from "react-bootstrap"
import { startPaymentCreate } from "../actions/paymentAction"
//import { startPaymentDone } from "../actions/rentalFormAction"

export default function PaymentItem(props){

    const { ele } = props 
    const dispatchRdx = useDispatch()
    //console.log('ele1',ele)
    

    const pay = useSelector((state)=>{
        return state.payments.allPayments
    })
    console.log('PaymentData',pay)

    const payClick= () =>{
        console.log('ele',ele)
        const totalPrice = {
            //rentalBond : lsd
            productId : ele.product._id,
            productName : ele.product.productName,
            days : ele.days,
            totalPrice : ele.days * ele.product.productPrice,
            rentalProductId : ele._id
        }
        dispatchRdx(startPaymentCreate({totalPrice}))

    }
    // const matchingPayment = pay?.find((payment) => payment.rentalProductId === ele._id);

    //     if (matchingPayment) {
    //         console.log('Matching payment found:', matchingPayment.rentalProductId);
    //         //dispatchRdx(startPaymentDone(matchingPayment.rentalProductId))
    //     } else {
    //         console.log('No matching payment found',matchingPayment);
    //     }
    return (
        <div>
            <Col key={ele._id} style={{ marginBottom: '20px' }}>
                    <Card className="h-100 ">
                    <Card.Img variant="top" src={ele.aadhar[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',
                            }}/><label>Aadhar</label>
                        <Card.Body>
                            <Card.Title>{ele.rentalUser.userName}</Card.Title>
                            <Card.Text>{ele.rentalUser.email}<br/></Card.Text>
                            {/* <Link to={`/IdProof/${ele._id}`}><Card.Img variant="top" src={ele.aadhar[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',
                            }}/></Link> */}
                            startDate
                            <Card.Text>{ele.startDate}</Card.Text>
                            <Card.Text>{ele.mobileNumber}<br/></Card.Text>Days  
                            <Card.Text>{ele.days}<br/></Card.Text>productPrice
                            <Card.Text>{ele.product?.productPrice}</Card.Text>$per{ele.days}days
                            <Card.Text>{ele.days * ele.product?.productPrice}</Card.Text>
                            productImge
                            <Card.Img variant="top" src={ele.product?.productImage[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',
                            }}/>
                            
                            {/* <Link to={`/RentalForm/${ele.product._id}`}><Card.Img variant="top" src={ele.product.productImage[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',}}/></Link> */}
                        </Card.Body>
                        {/* <button onClick={()=>{handleSubmit(ele._id)}}>ks</button> */}
                        <Button onClick={payClick}>PAY</Button>
                    </Card>
                    </Col>
        </div>
    )
}