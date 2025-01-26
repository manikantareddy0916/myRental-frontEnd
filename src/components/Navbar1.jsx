import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';
//import { useSelector } from 'react-redux';
import _ from 'lodash'
import { useDispatch } from 'react-redux';

   

export default function  Navbar1() {
    const {state, dispatch} = useContext(UserContext)
  const dispatchRdx = useDispatch()

  // const data = useSelector((state)=>{
  //   //return state.user
  // })
  // console.log('jjnav',data)

  const handleClick =() => {
    
    localStorage.removeItem('token')
    dispatch ({type: 'LOGOUT_USER'} )
    dispatchRdx({type: 'LOGOUT_ADDR_RDX'})//removing from rdx
    //dispatchRdx({type: 'LOGOUT_MYPRODUCTS'})
    // console.log('1i')
    //localStorage.removeItem('token') 
  }

  return (
    <div  className='mb-5 pb-1'>
      <Navbar bg="dark" data-bs-theme="dark" className='fixed-top '>
        <Container fluid='md'>
            <Row>
              
                <Col><Navbar.Brand 
                    style={{fontFamily:"Teko",
                        fontSize:26}}> MyRental </Navbar.Brand></Col>

               
                <Col ><Nav.Link as={Link} to='/'
                            style={{color:'white',fontSize:22, }}> Home </Nav.Link></Col>  
                {/* <Col ><Nav.Link as={Link} to='/RentalProducts'
                            style={{color:'white',fontSize:22}}> RentalProducts </Nav.Link></Col>   */}
                
                 

                { (localStorage.getItem('token'))  ? 
                  ( 
                      (state.user.role === 'admin') ? 
                  (<>

                    <Col ><Nav.Link as={Link} to='/MyProducts' 
                        style={{color:'white',fontSize:22}}> MyProducts </Nav.Link></Col>  
                    <Col ><Nav.Link as={Link} to='/Payment' 
                        style={{color:'white',fontSize:22}}> Pay </Nav.Link></Col>  
                    <Col ><Nav.Link as={Link} to='/Requests'
                        style={{color:'white',fontSize:22}}> Requests </Nav.Link></Col>  
                    <Col ><Nav.Link as={Link} to='/Category'
                      style={{color:'white',fontSize:22}}> Category </Nav.Link></Col>
                    <Col><Nav.Link as={Link} to='/AdmProfile'
                      style={{color:'white',fontSize:22}}> Profile </Nav.Link></Col>
                    <Col><Nav.Link as={Link} to='/'
                      style={{color:'white',fontSize:22}} onClick={handleClick}> Logout </Nav.Link> </Col>
                      
                  </>)
                  :
                  (<>
                
                  <Col ><Nav.Link as={Link} to='/MyProducts' 
                        style={{color:'white',fontSize:22}}> MyProducts </Nav.Link></Col>
                    <Col ><Nav.Link as={Link} to='/Payment'
                        style={{color:'white',fontSize:22}}> Pay </Nav.Link></Col>
                    <Col ><Nav.Link as={Link} to='/Requests'
                        style={{color:'white',fontSize:22}}> Requests </Nav.Link></Col>
                    <Col><Nav.Link as={Link} to='/Profile'
                        style={{color:'white',fontSize:22}}> Profile </Nav.Link></Col>
                    <Col><Nav.Link as={Link} to='/'
                        style={{color:'white',fontSize:22}} onClick={handleClick}> Logout </Nav.Link> </Col>
                    
                  </>)
                  ) 

                  :

                  (<>
                      <Col><Nav.Link as={Link} to='/Login'
                          style={{color:'white',fontSize:22}}> Login </Nav.Link></Col>
                      <Col><Nav.Link as={Link} to='/Register'
                          style={{color:'white',fontSize:22,}}> Register </Nav.Link></Col>

                  </>)
                  }
                
                

                  
                      {/* <Nav.Link as={Link} to='/MyProducts'
                      style={{fontSize:22}}> MyProducts </Nav.Link> */}

                      {/* <Nav.Link as={Link} to='/Address'
                      style={{fontSize:22}}> Address </Nav.Link> */}


               
                

            
            </Row>
        </Container>
    </Navbar>
    </div>
  );
}

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// function AutoLayoutExample() {
//   return (
//     <Container>
//       <Row>
//         <Col>1 of 2</Col>
//         <Col>2 of 2</Col>
//       </Row>
//       <Row>
//         <Col>1 of 3</Col>
//         <Col>2 of 3</Col>
//         <Col>3 of 3</Col>
//       </Row>
//     </Container>
//   );
// }

// export default AutoLayoutExample;