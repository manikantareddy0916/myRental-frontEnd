// //NAVBAR1
// import {Link} from 'react-router-dom'
// import Container from 'react-bootstrap/Container';
// import {Navbar, Nav} from 'react-bootstrap';
// import { useContext } from 'react';
// import { UserContext } from '../App';
// //import { useSelector } from 'react-redux';
// import _ from 'lodash'
// import { useDispatch } from 'react-redux';



// export default function Navbar1(props){
   
//   const {state, dispatch} = useContext(UserContext)
//   const dispatchRdx = useDispatch()

//   // const data = useSelector((state)=>{
//   //   //return state.user
//   // })
//   // console.log('jjnav',data)

//   const handleClick =() => {
    
//     localStorage.removeItem('token')
//     dispatch ({type: 'LOGOUT_USER'} )
//     dispatchRdx({type: 'LOGOUT_ADDR_RDX'})//removing from rdx
//     //dispatchRdx({type: 'LOGOUT_MYPRODUCTS'})
//     // console.log('1i')
//     //localStorage.removeItem('token') 
//   }
 
//     return(
      
//         <div className='mb-5 pb-3' >
//             <Navbar bg="dark" data-bs-theme="dark" className='fixed-top '>
//                 <Container>

//                   <Navbar.Brand 
//                   style={{fontFamily:"Teko",
//                             fontSize:26}}> MyRental </Navbar.Brand>


//                   <Nav >  
//                       <Nav.Link as={Link} to='/'
//                             style={{color:'white',fontSize:22}}> Home </Nav.Link>


//                     { (localStorage.getItem('token'))  ? 
//                     ( 
//                       (state.user.role === 'admin') ? 
//                     (<>

//                       <Nav.Link as={Link} to='/Category'
//                         style={{fontSize:22}}> Category </Nav.Link>
//                       <Nav.Link as={Link} to='/AdmProfile'
//                         style={{fontSize:22}}> Profile </Nav.Link>
//                       <Nav.Link as={Link} to='/'
//                         style={{fontSize:22}} onClick={handleClick}> Logout </Nav.Link> 

//                     </>)
//                     :
//                     (<>
//                       <Nav.Link as={Link} to='/Profile'
//                         style={{fontSize:22}}> Profile </Nav.Link>

//                       <Nav.Link as={Link} to='/'
//                         style={{fontSize:22}} onClick={handleClick}> Logout </Nav.Link> 
//                     </>)
//                     ) 

//                     :

//                     (<>
//                       <Nav.Link as={Link} to='/Login'
//                       style={{fontSize:22}}> Login </Nav.Link>

//                       <Nav.Link as={Link} to='/Register'
//                         style={{fontSize:22}}> Register </Nav.Link>
//                     </>)
//                     }

                    
//                       {/* <Nav.Link as={Link} to='/MyProducts'
//                         style={{fontSize:22}}> MyProducts </Nav.Link> */}

//                       {/* <Nav.Link as={Link} to='/Address'
//                         style={{fontSize:22}}> Address </Nav.Link> */}


//                   </Nav>
//                 </Container>
//             </Navbar>
//         </div>     
//     )
// }

// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

// function RoughBoot() {
//   return (
   
//     <Row xs={1} md={4} className="g-4">
//       {Array.from({ length: 7 }).map((_, idx) => (
//         <Col key={idx}>
//           <Card>
//             <Card.Img variant="top" src={`${"https://myrental-manikanta.s3.ap-south-1.amazonaws.com/a497e3d6-74ce-405d-9055-5966262b41ed-ocean-water-wave-sunset-blue-sky-rocks-4k-wallpaper-1024x683.jpg"}`} />
//             <Card.Body>
//               <Card.Title>Card title</Card.Title>
//               <Card.Text>
//                 This is a longer card with supporting text below as a natural
//                 lead-in to additional content. This content is a little bit
//                 longer.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }
// {/* <ul key={ele._id}>
//                 <li>{ele._id}</li>
//                 <li>{ele.productName}</li>
//                 <img src={`${ele.productImage[0].url}`}/>
//                 <a href="#"><button
//                     onClick={()=>{handleEdit(ele._id)}}>Edit</button></a>
//                 <button onClick={()=>{handleDelete(ele._id)}} >Delete</button>
//             </ul> */}

// export default RoughBoot;
// (fil.map((ele)=>{
//     return (
//         <Row xs={1} md={4} className="g-4">
//         {Array.from({ length: 7 }).map((_, idx) => (
//           <Col key={idx}>
//             <Card>
//               <Card.Img variant="top" src={`${ele.productImage[0].url}`} />
//               <Card.Body>
//                 <Card.Title>Card title</Card.Title>
//                 <Card.Text>
//                   This is a longer card with supporting text below as a natural
//                   lead-in to additional content. This content is a little bit
//                   longer.
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//      )
// }))
// import { Carousel } from 'react-bootstrap';

// function ControlledCarousel() {
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-0 overflow-hidden">
//       <Carousel className="w-75" crossfade>
//         <Carousel.Item>
//           <img
//             className="d-block w-100 h-100"
//             src="https://myrental-manikanta.s3.ap-south-1.amazonaws.com/fb22b755-581c-4e04-b7aa-644e4a1a6a5a-3d-illustration-hands-giving-receiving-money_258743-583.jpg"
//             alt="First slide"
//           />
//           <Carousel.Caption>
//             <h3>First slide label</h3>
//             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//           </Carousel.Caption>
//         </Carousel.Item>

//         <Carousel.Item>
//           <img
//             className="d-block w-100 h-100"
//             src="https://myrental-manikanta.s3.ap-south-1.amazonaws.com/fb22b755-581c-4e04-b7aa-644e4a1a6a5a-3d-illustration-hands-giving-receiving-money_258743-583.jpg"
//             alt="Second slide"
//           />
//           <Carousel.Caption>
//             <h3>Second slide label</h3>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//           </Carousel.Caption>
//         </Carousel.Item>

//         <Carousel.Item>
//           <img
//             className="d-block w-100 h-100"
//             src="https://myrental-manikanta.s3.ap-south-1.amazonaws.com/fb22b755-581c-4e04-b7aa-644e4a1a6a5a-3d-illustration-hands-giving-receiving-money_258743-583.jpg"
//             alt="Third slide"
//           />
//           <Carousel.Caption>
//             <h3>Third slide label</h3>
//             <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//       </Carousel>
//     </div>
//   );
// }

// export default ControlledCarousel;

// import { useState } from 'react';
// import {Modal, Form,Dropdown ,Button,DropdownButton} from 'react-bootstrap'


// function Example() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
          
//           <Form.Control size="lg" type="text" placeholder="Large text" />
//           <DropdownButton id="dropdown-item-button" title="Dropdown button">
//             <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
//             <Dropdown.Item as="button">Action</Dropdown.Item>
//             <Dropdown.Item as="button">Another action</Dropdown.Item>
//             <Dropdown.Item as="button">Something else</Dropdown.Item>
//           </DropdownButton><br/>
//           <Form.Control size="lg" type="text" placeholder="Large text" />
//           <Form.Control size="lg" type="text" placeholder="Large text" /><br/>

//           <Form.Group controlId="formFileMultiple" className="mb-3">
//             <Form.Label>Multiple files input example</Form.Label>
//             <Form.Control type="file" multiple />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default Example;

{/* <Button variant="primary" onClick={handleShow}> Send Request</Button>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Modal heading</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Form.Control size="lg" type="text" placeholder="Large text" />
    <Form.Control size="lg" type="text" placeholder="Large text" />
    <Form.Control size="lg" type="text" placeholder="Large text" /><br/>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>Close</Button>
    <Button variant="primary" onClick={handleClose}>Save Changes</Button>
  </Modal.Footer>
  
</Modal> */}
    
// import React, { useState } from 'react';
// import { Pagination } from 'react-bootstrap';

// const roughBootstrap = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of items to display per page
//   const totalItems = 7/* total number of items in your data */;

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Generate an array of page numbers for rendering pagination items
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // You can fetch the data for the selected page here or update your data accordingly
//   };

//   return (
//     <div>
//       {/* Your data rendering logic goes here */}
      
//       {/* Pagination component */}
//       <Pagination>
//         {pageNumbers.map((number) => (
//           <Pagination.Item
//             key={number}
//             active={number === currentPage}
//             onClick={() => handlePageChange(number)}
//           >
//             {number}
//           </Pagination.Item>
//         ))}
//       </Pagination>
//     </div>
//   );
// };

// export default roughBootstrap;

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// function BasicExample() {
//   return (
//     <Form>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" style={{ fontSize: '0.8rem', padding: '0.4rem',maxWidth: '200px' }} />
//         <Form.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </Form.Text>
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" style={{ fontSize: '0.8rem', padding: '0.4rem' }} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         <Form.Check type="checkbox" label="Check me out" />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// }


// export default BasicExample;
// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file

// function DateRangePicker() {
//   const [toggle, setToggle] = useState(false);
//   const [selection, setSelection] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection',
//   });

//   const handleSelect = (ranges) => {
//     setSelection(ranges.selection);
//   };

//   const calculateDays = () => {
//     const { startDate, endDate } = selection;
//     const diffInMilliseconds = Math.abs(endDate - startDate);
//     const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
//     return diffInDays;
//   };

//   return (
//     <div>
//       {toggle && (
//         <>
//           <DateRange ranges={[selection]} onChange={handleSelect} />
//           <p>Selected Start Date: {selection.startDate.toLocaleDateString()}</p>
//           <p>Selected End Date: {selection.endDate.toLocaleDateString()}</p>
//           <p>Number of Days: {calculateDays()}</p>
//         </>
//       )}
//       <Button onClick={() => setToggle(!toggle)}>Select Date Range</Button>
//     </div>
//   );
// }

// export default DateRangePicker;

// import { formatISO } from 'date-fns';

// // Assuming startDate, endDate, and location are defined somewhere in your code
// export default function roushBootstrap(){

//   return(
//     <h1>ksdj</h1>
//   )
// }

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Placeholder from 'react-bootstrap/Placeholder';

// function CardExample() {
//   const date = new Date("2024-01-16T18:30:00.000Z");
// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

// const formattedDate = date.toLocaleString('en-US', options);
// console.log("2024-01-16T18:30:00.000Z",'jjj',formattedDate);

//   return (
//     <div className="d-flex justify-content-around">

//       <Card style={{ width: '18rem' }}>
//         <Card.Img variant="top" src="https://myrental-manikanta.s3.ap-south-1.amazonaws.com/e5cd408a-4d5c-42ac-acab-f0444f5148c2-3d-illustration-hands-giving-receiving-money_258743-583.jpg" />
//         <Card.Body>
//           <Card.Title>Card Title</Card.Title>
//           <Card.Img
//                             variant="top"
//                             src="https://myrental-manikanta.s3.ap-south-1.amazonaws.com/e5cd408a-4d5c-42ac-acab-f0444f5148c2-3d-illustration-hands-giving-receiving-money_258743-583.jpg"
//                             style={{
//                             objectFit: 'cover',
//                             height: '200px', // Set a fixed height for uniformity
//                             transition: 'transform 0.3s',
//                             }}/>
//           <Card.Text>
//             Some quick example text to build on the card title and make up the
//             bulk of the card's content.
//           </Card.Text>
          
//           <Button variant="primary">Go somewhere</Button>
//         </Card.Body>
//       </Card>

     
//     </div>
//   );
// }

// export default CardExample;


// {tog ?
//   <Modal show={true} onHide={select}>
//       <Modal.Header closeButton>
//       <Modal.Title>Add Your Product</Modal.Title>
//       </Modal.Header> 
//       <Modal.Body>

//        <Card.Img variant="top" src={ele.product?.productImage[0]?.url}
//           style={{objectFit: 'cover', height: '120px',transition: 'transform 0.3s',}}/>
//       <Card.Text>{ele.product.productName}<br/></Card.Text>
//       <Card.Text>{ele.product.productPrice}<br/></Card.Text>
//       <Card.Text>{ele.product.category}<br/></Card.Text>
//       <Modal.Footer>
//           <Button variant="secondary"  onClick={select}> Close</Button>
//       </Modal.Footer>
//       </Modal.Body>
//   </Modal>
//       :'' }
//   <Button onClick={select}>view my PRoduct</Button>
//   {toogle ? 
//   <Modal show={true} onHide={aadharSelect}>
//       <Modal.Header closeButton>
//       <Modal.Title>Add Your Product</Modal.Title>
//       </Modal.Header> 

//       <Modal.Body>
//        <Card.Img variant="top" src={ele.aadhar[0]?.url}
//           style={{objectFit: 'cover', height: '120px',transition: 'transform 0.3s',
//       }}/>
//       <Modal.Footer>
//           <Button variant="secondary"  onClick={aadharSelect}> Close </Button>
//       </Modal.Footer>
//       </Modal.Body>
//   </Modal> : ''}
//   <Button onClick={aadharSelect}>view Aadhar</Button>

// // import DateTimeField from ('react-bootstrap-datetimepicker');
// import React, { useState } from 'react';
// import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
// //import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
// //import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// function MyComponent() {
//   const [value, onChange] = useState([new Date(), new Date()]);

//   return (
//     <div className="container mt-4">
//       <h1>My Date-Time Range Picker</h1>
//       <DateTimeRangePicker
//         onChange={onChange}
//         value={value}
//         className="form-control" // Apply Bootstrap form control class
//       />
//     </div>
//   );
// }

// export default MyComponent;

// import Table from 'react-bootstrap/Table';
// import { Pagination } from 'react-bootstrap';
// import { useState } from 'react';

// function BasicExample() {


 

// let active = 2;
// let items = [];
// for (let number = 1; number <= 5; number++) {
//   items.push(
//     <Pagination.Item key={number} active={number === active}>
//       {number}
//     </Pagination.Item>,
//   );
// }

// const paginationBasic = (
//   <div>
//     <Pagination>{items}</Pagination>
//     <br />

//     <Pagination size="lg">{items}</Pagination>
//     <br />

//     <Pagination size="sm">{items}</Pagination>
//   </div>
// );

//   // const allProduct=[1,2,3,4,5,3,3,3,3,3,3,3]
//   // const productsPerPage=2
//   // const [currentPage, setCurrentPage] = useState(() => {
//   //   const savedPage = localStorage.getItem("currentPage");
//   //   return savedPage ? parseInt(savedPage) : 1;
//   // });

//   // const handlePaginationClick = (pageNo) => {
//   //   //console.log('I am',name)
//   //       setCurrentPage(pageNo)
//   //     };

//   //     const totalPages = Math.ceil(allProduct.length / productsPerPage);

//   return (
    
//   //   <nav aria-label="Page navigation example">
//   //   <ul class="pagination">
//   //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
//   //     <li class="page-item"><a class="page-link" href="#">1</a></li>
//   //     <li class="page-item"><a class="page-link" href="#">2</a></li>
//   //     <li class="page-item"><a class="page-link" href="#">3</a></li>
//   //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
//   //   </ul>
//   // </nav>
//   // <Pagination style={{ marginLeft:'40%' }}>
//   //       <Pagination.First name='first' onClick={(e) => setCurrentPage(1)} />
//   //       <Pagination.Prev  name='sub' onClick={(e) => setCurrentPage(currentPage -1)} />

//   //       {Array.from({ length: totalPages }).map((_, index) => (
//   //         <Pagination.Item
//   //           key={index + 1}
//   //           active={index + 1 === currentPage}
//   //           name='item'
//   //           onClick={() => handlePaginationClick(index + 1)}
//   //         >
//   //           {index +1}
//   //         </Pagination.Item>
//   //       ))}
//   //       <Pagination.Next name='add' onClick={(e) => setCurrentPage(currentPage +1)} />
//   //       <Pagination.Last name='last' onClick={(e) => setCurrentPage(totalPages)} />
//   //     </Pagination>
//   );
// }

// export default BasicExample;

// Filename - App.js
 
// import React from 'react';

// import {
//   MDBFooter,
//   MDBContainer,
//   MDBCol,
//   MDBRow,
//   MDBIcon,
//   MDBBtn
// } from 'mdb-react-ui-kit';

// export default function App(){
//   return (
//   <div  >
// <footer>
// <div className="footer">

//   <div className="row">
//     <div className="a">
//     <a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a>
//     <a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a>
//     <a href="https://www.youtube.com/"><i className="fa fa-youtube"></i></a>
//     <a href="https://twitter.com/?lang=en"><i className="fa fa-twitter"></i></a> 
//     </div>
//   </div>

//   <div className="row">
//   <ul>
//   <li><a href="#">Contact us</a></li>
//   <li><a href="#">Our Services</a></li>
//   <li><a href="#">Privacy Policy</a></li>
//   <li><a href="#">Terms & Conditions</a></li>
//   <li><a href="#">Career</a></li>
//   </ul>
//   </div>

//   <div className="row">
//     <div className="a">
//       INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: ManiKantaReddy 
//     </div>
//   </div>

// </div>
// </footer>
// </div>
//   )
// }
// export default function App() {
//   return (
//     <MDBFooter className='bg-dark text-center text-white'>
//       <MDBContainer className='p-4 pb-0'>
//         <section className='mb-4'>
//           <MDBBtn
//             floating
//             className='m-1'
//             style={{ backgroundColor: 'white',border: '0',color:'blue'  }}
//             href='#!'
//             role='button'
            
//           >
//             <MDBIcon fab icon='facebook-f' />
//           </MDBBtn>
          

//           <MDBBtn
//             floating
//             className='m-1'
//             style={{ backgroundColor: 'white',border: '0',color:'black'  }}
//             href='#!'
//             role='button'
//           >
//             <MDBIcon fab icon='twitter' />
//           </MDBBtn>

//           <MDBBtn
//             floating
//             className='m-1'
//             style={{ backgroundColor: 'white',border: '0',color:'black'  }}
//             href='#!'
//             role='button'
//           >
//             <MDBIcon fab icon='google' />
//           </MDBBtn>
//           <MDBBtn
//             floating
//             className='m-1'
//             style={{ backgroundColor: 'white',border: '0',color:'black'  }}
//             href='#!'
//             role='button'
//           >
//             <MDBIcon fab icon='instagram' />
//           </MDBBtn>

//           <MDBBtn
//             floating
//             className='m-1'
//             style={{ backgroundColor: 'white',border: '0',color:'black'  }}
//             href='#!'
//             role='button'
//           >
//             <MDBIcon fab icon='linkedin-in' />
//           </MDBBtn>

//           <MDBBtn
//             floating
//             className='m-1'
//             style={{ backgroundColor: 'white',border: '0',color:'black'  }}
//             href='#!'
//             role='button'
//           >
//             <MDBIcon fab icon='github' />
//           </MDBBtn>
//         </section>
//       </MDBContainer>
//       <div className="row">
// <ul>
// <li><a href="#">Contact us</a></li>
// <li><a href="#">Our Services</a></li>
// <li><a href="#">Privacy Policy</a></li>
// <li><a href="#">Terms & Conditions</a></li>
// <li><a href="#">Career</a></li>
// </ul>
// </div>
//       <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
//         © 2020 Copyright:
//         <a className='text-white' href='https://mdbootstrap.com/'>
//           MDBootstrap.com
//         </a>
//       </div>
      
//     </MDBFooter>
//   );
// }
import uProfile from './uProfile'
import ProfileStatistics from './uProfile'
export default function ex (){
  return (
    <div>
      <h1>prof</h1>
      <ProfileStatistics/>
    </div>
  )
}