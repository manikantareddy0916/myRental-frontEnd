import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Form ,Button, Card} from 'react-bootstrap'


import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { startForm} from "../actions/rentalFormAction";
import { useContext } from "react";
import { UserContext } from "../App";

export default function RentalForm (){

  

    const { rId } = useParams()
    const dispatchRdx = useDispatch()
    const [toogle,setToogle]= useState(false)
    const navigate = useNavigate()
    const [files, setFiles] = useState([])
    const [days, setDays] = useState(0)
    const [productOwner,setProductOwner] = useState('')
    const [productOwnerEmail,setProductOwnerEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
   
    // const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')
   
    const [selection, setSelection] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    });
    const [clientErrors, setClientErrors] = useState({})
    const errors = {}
    
    const productOwn = useSelector((state)=>{
      return state.allProducts.allProducts
    })
    //const {state} = useContext(UserContext) 
    useEffect(() => {
      const my = productOwn.find((ele) => ele._id === rId);
      
      //console.log('j',state.user.email)
      console.log(my,'my')
      if (my) {
        console.log('ppp',my.productOwner)
        setProductOwner(my.productOwner);
        setProductOwnerEmail();
      }
    }, [productOwn, rId]);
  

    //const proOwnId  =my[0]?.productOwner
    
    // const newDate = new Date()
    // confirm.length('newDate',)
    
    // console.log('dhhhhhhhhhhate',new Date().toLocaleDateString() )
    // console.log('start',selection.startDate.toLocaleDateString() )

    // console.log('jj',new Date())
    // console.log('jj',selection.startDate)
    // console.log('jلبيلj',new Date () > selection.startDate )
    //RunValidations
    const runValidation = () => {
      //images
      if(files.length === 0){
        errors.aadhar = "* Upload atleast one Image"
      }

      //startDate and EndDate
      if (calculateDays() < 1) {
        errors.date = '* Select at least one day';
       }else if(new Date() > selection.startDate){
         errors.date = '* Not less than today'
       }
      
      //mobileNumber
      if(mobileNumber.trim().length !== 10){
          errors.mobileNumber = '*mobileNumber is required '
      }
    
     
  }

    const handleSelect = (ranges) => {
      console.log('ranges.selection',ranges.selection)
      setSelection(ranges.selection);
    };
   
    let nofDays= ''
    const calculateDays = () => {
      const { startDate, endDate } = selection;
      const diffInMilliseconds = Math.abs(endDate - startDate);
      const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
      //setDays(diffInDays)
      //console.log('diff',diffInDays)
      nofDays=diffInDays
      return diffInDays;
    };
    // console.log('dada',dada)

    function reset(){
      setMobileNumber('')
      setFiles([])
 }
 
    //formSubmit
    const formSubmit= async (e)=>{
        
      e.preventDefault()
      runValidation()
     
      if(Object.keys(errors).length ===0){

        
        
        const formData = new FormData()
          formData.append('startDate', selection.startDate.toLocaleDateString());
          formData.append('endDate', selection.endDate.toLocaleDateString());
          formData.append('mobileNumber', mobileNumber)
          formData.append('productOwner', productOwner)
          formData.append('days', nofDays)
          //formData.append('productOwnerEmail',productOwnerEmail )
          
          files.forEach((obj) => {
              formData.append('aadhar', obj)
          })
         
          
          console.log('owner',productOwner)
          //console.log('ownerEmail',productOwnerEmail)
          // console.log('forma',dada)
          // console.log('forma',typeof(dada))

            // console.log('formDate mobileNumber', formData.get('mobileNumber'));
            // Log the entire FormData
                for (const pair of formData.entries()) {
                  console.log(`FormData ${pair[0]}: ${pair[1]}`);
                }
                
              dispatchRdx(startForm({rId,formData,setClientErrors,navigate,reset,setToogle}))
              
         
      }else{
          console.log('error',errors)
          setClientErrors(errors)
      }
      
  }

    const product = useSelector((state)=>{
        return state.allProducts.allProducts
    })

    const rentProduct = product.filter((ele)=>{
        return ele._id === rId
    })
    
    console.log('re',rentProduct)
    //images upload
    function handleFiles(e) {
        const upload = e.target.files
        // console.log('up',upload)
        setFiles([...upload])
    }

    //toogle for Button
    const handleClick=(e)=>{
      setToogle(!toogle)
  }
  const updateDays = (e) => {
    
    setDays(calculateDays());
  };
  // console.log('mobile',mobileNumber)
  // console.log('mobile',days)
    return  (
        <div>
        
         <div className="d-flex justify-content-center align-items-center vh-5">
      {rentProduct.map((ele,i) => (
        <div key={ele._id} className="w-50 h-50">
          <Carousel className="carousel-fade">
            {ele.productImage.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 h-100"
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                />
                <Carousel.Caption>
                  <h3> slide label</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body>
                <Card.Title>{ele.productName}</Card.Title>
                <Card.Text>
                {ele.productSpecifications}<br/>
                </Card.Text>
                <Card.Text>
                   'price' {ele.productPrice}
                </Card.Text>
          </Card.Body>
          {toogle ? (
            <Button variant="primary" onClick={handleClick}>
              Close Request
            </Button>
          ) : (
            ele.stock == 'notAvailable' ? 
            <Button>Sorry Product Not Available</Button>
            : 
            <Button variant="primary" onClick={handleClick}>
              Click to Request
            </Button>
          )}
        </div>
      ))}
    </div>
        
        {toogle ? 
        (
          <>
         <Modal show={true} onHide={handleClick}>
            <Modal.Header closeButton>
            <Modal.Title>Add Your </Modal.Title>
            </Modal.Header> 

            <Modal.Body>
            <form onSubmit={formSubmit} encType="multipart/form-data" className="mb-3" >
{/*                      
                <Form.Control size="small"
                type="" value={} onChange={}
                    name='' placeholder=""/>
                    <div style={{color: 'red'}}>{ ?  : ''}</div><br /> */}

<Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label style={{fontFamily: 'cursive'}}> Add Your ProofId or collageId or aadharId</Form.Label>
                <Form.Control 
                  type="file" name='product' onChange={handleFiles}
                  multiple style={{ fontSize: '0.8rem', padding: '0.4rem', maxWidth: '300px' }} />
              </Form.Group>
              {clientErrors.aadhar && <span style={{color: 'red'}}>{clientErrors.aadhar}</span>}<br/>
              {/* {true && (
                <> */}
                  <DateRange ranges={[selection]} onChange={handleSelect} />
                  <p>Selected Start Date: {selection.startDate.toLocaleDateString()}</p>
                  <p>Selected End Date: {selection.endDate.toLocaleDateString()}</p>
                  <p>Number of Days: {calculateDays()}</p>
                  {clientErrors.date && <span style={{color: 'red'}}>{clientErrors.date}</span>}<br/>
                {/* </>
              )}
               <Button onClick={() => setToggle(!toggle)}>Select Date Range</Button> */}
               {/* <input type="text" value={calculateDays()} onChange={(e) => setDays(calculateDays())}    /> */}

               {/* <span>Days-{calculateDays()}</span>
              <Form.Control style={{ fontSize: '0.8rem', padding: '0.4rem', maxWidth: '300px' }} 
              size="small" type="text" value={days}   onChange={updateDays}
                    name='days'
                     /><br/> */}



              <Form.Control style={{ fontSize: '0.8rem', padding: '0.4rem', maxWidth: '300px' }} 
              size="small" type="text" value={mobileNumber} onChange={(e)=>{setMobileNumber(e.target.value)}}
                    name='mobilenumber' placeholder="Enter your MobileNumber" 
                     />
                    {clientErrors.mobileNumber && <span style={{color: 'red'}}>{clientErrors.mobileNumber}</span>}<br/>
                    
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClick} > Close </Button>
                <Button 
                variant="primary" type="submit" value='Submit'  onClick={formSubmit}> Submit </Button>
            </Modal.Footer>
            </form>
            </Modal.Body>

    </Modal>              
          
        </>) : ''}
        
        </div>
    ) 
}
