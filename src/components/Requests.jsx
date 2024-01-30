// import { useContext, useState } from "react"
// import { UserContext } from "../App"
// import { useSelector } from "react-redux"
// import { Card,Row, Col,Button, Modal ,Carousel} from "react-bootstrap"
// import { Link } from "react-router-dom"
// export default function Requests(){

//     const [tog, setTog]= useState(false)
//     const [toogle, setToogle]= useState(false)
//     const {state} = useContext(UserContext)
//     const reqForm = useSelector((state)=>{
//         return state.reqForm.allReqProducts
//     })

//     //console.log('reqForm',reqForm)
//     //reqested products
//     const req =reqForm.map((ele)=>{
//         return ele.product?._id 
//     })
//     console.log('AllreqProductID',req)
//     //myPro user Products
//     const user = state.user.products?.map((ele)=>{
//         return ele._id
//     })
//     console.log('userProductsId',user)
//     // console.log('ur',state.user.products?.map((ele)=>{
//     //     return ele
//     // }))
//     const data = req.filter((element) => {
//         return user.includes(element);
//     });
//     console.log('data',data)

//     const uniqueMatchesSet = new Set();
//     const u = reqForm.forEach((ele) => {
//         data.forEach((ele2) => {
//             if (ele.product?._id === ele2) {
//                 // Check if the element is not already in the set
//                 if (!uniqueMatchesSet.has(ele)) {
//                     uniqueMatchesSet.add(ele);
//                     //console.log('ele', ele);
//                     //jyo.push(ele);
//                 }
//             }
//         });
//     });
    
//     // Convert Set to Array if needed
//     const uniqueMatchesArray = Array.from(uniqueMatchesSet);
//     console.log('uniqueMatchesArray', uniqueMatchesArray);
    
    
//     // console.log('startDate',uniqueMatchesArray.map((ele)=>{
//     //     return ele.startDate.toLocaleDateString()
//     // }))


//     // const x = reqForm.map((ele) => {
//     //     return data.find((ele2) => ele.product._id === ele2);
//     // });
    

// //console.log('x', x);

//     // const y = reqForm.filter((ele)=>{
//     //     return data.map((ele2)=>{
//     //         if(ele.product._id === ele2){
//     //             return {...ele}
//     //         }
//     //     })
//     // })
//     // console.log('y',y)
//     // console.log('data from subscribe requestform product id',data)
//     // console.log('kjkj', data.map((ele) =>{
//     //     return 
//     // }))
//     // const po=data.map((ele)=>{
//     //     console.log('reqform-Id',reqForm._id)
//     //     if(reqForm._id == ele){
//     //         console.log('not',ele)
//     //     }else{
//     //         console.log('hh')
//     //     }
//     // })
//     // const select =()=>{
//     //     setTog(!tog)
//     // }
//     // const aadharSelect =()=>{
//     //     setToogle(!toogle)
//     // }
//     const handleSubmit =(e)=>{
//         alert(e)
//         //alert('hiiiiiiii')
//     }
//     return (
//         <div>
//             <h1>hireq</h1>
//             <Row xs={1} md={3} className="g-4">
                
//                 {uniqueMatchesArray.map((ele) => (
//                     <Col key={ele._id} style={{ marginBottom: '20px' }}>
//                     <Card className="h-100 hover-shadow image-hover-effect">
//                     <Card.Img variant="top" src={ele.aadhar[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',
//                             }}/><label>Aadhar</label>
//                         <Card.Body>
//                             <Card.Title>{ele.rentalUser.userName}</Card.Title>
//                             <Card.Text>{ele.rentalUser.email}<br/></Card.Text>
//                             {/* <Link to={`/IdProof/${ele._id}`}><Card.Img variant="top" src={ele.aadhar[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',
//                             }}/></Link> */}
//                             startDate
//                             <Card.Text>{ele.startDate}</Card.Text>
//                             <Card.Text>{ele.mobileNumber}<br/></Card.Text>Days  
//                             <Card.Text>{ele.days}<br/></Card.Text>productPrice
//                             <Card.Text>{ele.product.productPrice}</Card.Text>$per{ele.days}days
//                             <Card.Text>{ele.days * ele.product?.productPrice}</Card.Text>
//                             productImge
//                             <Card.Img variant="top" src={ele.product.productImage[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',
//                             }}/>
                            
//                             {/* <Link to={`/RentalForm/${ele.product._id}`}><Card.Img variant="top" src={ele.product.productImage[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',}}/></Link> */}
//                         </Card.Body>
//                         <button onClick={()=>{handleSubmit(ele.product.productPrice)}}>ks</button>
//                     </Card>
//                     </Col>
//                 ))}
//             </Row>
           
//         </div>
//     )
// }
// {/* <Carousel key={ele._id} className="w-50 h-50 carousel-fade">
// {ele.aadhar.map((image, index) => (
//     <Carousel.Item key={index}>
//     <img
//         className="d-block w-100 h-100"
//         src={image.url}
//         alt={`Slide ${index + 1}`}
//     />
//     <Carousel.Caption>
//         <h3>First slide label</h3>
//         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//     </Carousel.Caption>
//     </Carousel.Item>
    
// ))}
// </Carousel> */}

import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Card,Row, Col,Button, Modal ,Carousel} from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "../configure/axios"
import { startAcceptedRequests } from "../actions/rentalFormAction"
export default function Requests(){

    // const [tog, setTog]= useState(false)
    // const [toogle, setToogle]= useState(false)
    //const {state} = useContext(UserContext)
   const dispatchRdx = useDispatch()
    const myReq = useSelector((state)=>{
        return state.reqForm.getRequests
    })
    //console.log('myreq',myReq)
    

    const handleSubmit =async (aId)=>{
        console.log('aid',aId)
        const sure = window.confirm('Are U sure to Accept')
        if(sure){
            console.log('3',aId)
            dispatchRdx(startAcceptedRequests({aId}))
        }
        
    }
  
    return (
        <div className="p-3">
            <h2 style={{fontFamily: 'cursive'}} >Accept the Rental  users Requests</h2>
            <Row xs={1} md={3} className="g-4 " >
                {myReq.map((ele) => (
                     ele.status == 'pending' ? (
                    <Col key={ele._id} style={{ marginBottom: '20px' }}>
                    <Card className="h-100 ">
                    {/* <Card className="h-100 hover-shadow image-hover-effect"> */}
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
                            <Card.Text>{ele.product.productPrice}</Card.Text>$per{ele.days}days
                            <Card.Text>{ele.days * ele.product?.productPrice}</Card.Text>
                            productImge
                            <Card.Img variant="top" src={ele.product.productImage[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',
                            }}/>
                            
                            {/* <Link to={`/RentalForm/${ele.product._id}`}><Card.Img variant="top" src={ele.product.productImage[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',}}/></Link> */}
                        </Card.Body>
                        <Button onClick={()=>{handleSubmit(ele._id)}}>Accept</Button>
                    </Card>
                    </Col>) : ''
                ))}
            </Row>
           
        </div>
    )
}
{/* <Carousel key={ele._id} className="w-50 h-50 carousel-fade">
{ele.aadhar.map((image, index) => (
    <Carousel.Item key={index}>
    <img
        className="d-block w-100 h-100"
        src={image.url}
        alt={`Slide ${index + 1}`}
    />
    <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
    </Carousel.Item>
    
))}
</Carousel> */}