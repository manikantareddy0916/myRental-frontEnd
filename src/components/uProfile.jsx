import { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Profile from './Profile';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { startGetMyRequests } from '../actions/rentalFormAction';
import { useDispatch } from 'react-redux';
import { startAllProducts } from '../actions/myProducts';
import Table from 'react-bootstrap/Table';
import {Row, Col, Card} from 'react-bootstrap';
import Footer from './Footer';

export default function ProfileStatistics(props) {

  const [toogle, setToogle]= useState(false)
  const [data, setData] = useState('')
    const nav = useNavigate()
    const dispatch= useDispatch()
    const {ele }=props
    const user = useSelector((state)=>{
        return state
    })
    console.log('ele',ele)

    const aId = useSelector((state)=>{
      return state.address.address[0]?._id
  })
  console.log('aId',aId)

  const all = useSelector((state)=>{
    return state.payments.allPayments
})
console.log('all',all)


const prodDetails = useSelector((state)=>{
  return state.reqForm.getRequests
})
console.log('proDetails',prodDetails)


    //console.log('aidffff',aId)
   useEffect(()=>{
      dispatch(startGetMyRequests())
   },[])
  return (
    <div className="vh-100" style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                    className="rounded-circle" fluid style={{ width: '100px' }} />
                </div>
                <MDBTypography style={{fontFamily: 'cursive'}}  tag="h4">{ele.userName}</MDBTypography>
                <MDBCardText  style={{fontFamily: 'cursive'}}  className="text-muted mb-4">
                <a href="#!">{ele.email}</a>
                </MDBCardText>
                <div className="mb-4 pb-2">
                
                  {/* <MDBBtn outline floating>
                    <MDBIcon fab icon="facebook" size="lg" />
                  </MDBBtn>
                  <MDBBtn outline floating className="mx-1">
                    <MDBIcon fab icon="twitter" size="lg" />
                  </MDBBtn>
                  <MDBBtn outline floating>
                    <MDBIcon fab icon="skype" size="lg" />
                  </MDBBtn> */}
                </div>
                {/* <MDBBtn rounded size="lg">
                  Message now
                </MDBBtn> */}
              <Button  style={{fontFamily: 'cursive'}}  as={Link} to={`/Address/${aId}`}>
                  Edit My Address
              </Button>
             <div className=''>
              
              <Button style={{fontFamily: 'cursive'}}  onClick={()=>{setData('rentalUsers')}}> View Payments </Button>
              <Button style={{fontFamily: 'cursive'}}  onClick={()=>{setData('payments')}}>View RentalUsers</Button>
              {/* {!toogle ? <Button onClick={()=>{setData('rentalUsers')}} onClick={()=>{setToogle(!toogle)}}>View RentalUsers </Button>
              :<Button  onClick={()=>{setToogle(!toogle)}}>close </Button>} */}
             </div>

            
            

                <div className="d-flex justify-content-between text-center mt-5 mb-2" style={{fontFamily: 'cursive'}} >
                  <div>
                    <MDBCardText className="mb-1 h5">{ele.products?.length}</MDBCardText>
                    <MDBCardText >My Total Products</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{user.reqForm.getRequests.length}</MDBCardText>
                    <MDBCardText >Total Send Requests</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{(ele?.role)?.toUpperCase()}</MDBCardText>
                    <MDBCardText >Role</MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {
        data == 'rentalUsers' ? 
        <>
        <Button onClick={()=>{setData('')}}>Close</Button>
        <h2 style={{fontFamily: 'cursive'}} > Payment Details</h2>
          <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>PaymentId</th>
                    <th>ProductName</th>
                    <th>Days</th>
                    <th>PaymentStatus</th>
                    <th>TotalAmount</th>
                    </tr>
                </thead>
                <tbody>
                    {all.map((ele) => (
                    <tr key={ele._id}>
                        <td>{ele._id}</td>
                        <td>{ele.productName}</td>
                        <td>{ele.days}</td>
                        <td>{ele.paymentStatus}</td>
                        <td>{ele.totalAmount}</td>
                        {/* You can add more cells based on the properties of your 'ele' object */}
                    </tr>
                    ))}
                </tbody>
            </Table>
        </>
        :
        ''
      }


            { data == 'payments' ? 
            <>
            <Button style={{backgroundColor:''}} onClick={()=>{setData('')}}>Close</Button>
            <h2 style={{fontFamily: 'cursive'}} > RentalUsers Details</h2>
            <Row xs={1} md={3} className="g-4">
                {prodDetails.map((ele)=>{
                    if(ele.status == 'paymentDone'){
                        return  <Col key={ele._id} style={{ marginBottom: '20px' }}>
                        <Card className="h-100 ">
                        <Card.Img variant="top" src={ele.aadhar[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',
                                }}/><label>Aadhar</label>
                            <Card.Body>
                                <Card.Title>{ele.rentalUser.userName}</Card.Title>
                                <Card.Text>{ele.rentalUser.email}<br/></Card.Text>
                            
                                startDate
                                <Card.Text>{ele.startDate}</Card.Text>
                                <Card.Text>{ele.mobileNumber}<br/></Card.Text>Days  
                                <Card.Text>{ele.days}<br/></Card.Text>productPrice
                                <Card.Text>{ele.product?.productPrice}</Card.Text>$per{ele.days}days
                                <Card.Text>{ele.days * ele.product?.productPrice}</Card.Text>
                                productImge
                                <Card.Img variant="top" src={ele.product?.productImage[0].url} style={{ objectFit: 'cover', height: '200px', transition: 'transform 0.3s',
                                }}/>
                            
                            </Card.Body>
                            
                            <Button >PAYmentDone</Button>
                        </Card>
                        </Col>
                    }
                    
                })}
                 </Row>
            </>
                  :''
            }
    <Footer/>
    </div>
  );
}