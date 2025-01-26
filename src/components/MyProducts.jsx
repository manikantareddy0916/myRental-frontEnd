import { useState, useEffect} from "react"
import { startAllProducts, startDelete, startEdit, startMakeAvailable, startMyAllProducts, startMyProducts } from "../actions/myProducts"
import { useDispatch } from "react-redux"
import _, { fill } from 'lodash'
import { useSelector } from "react-redux"
import { useContext } from "react"
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom"
// { startAllAddress } from "../actions/addressAction"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Modal, Form,Dropdown ,Button,DropdownButton,Pagination} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./Footer"
export default function MyProducts(){

     const dispatchRdx = useDispatch()

    const [editProId, setEditProId] = useState('')
    const editProduct = useSelector((state)=>{
        return state.allProducts.allProducts.find((ele)=>{
            return ele._id == editProId
        })
    })
   // console.log('FINDINGPRODUCT22',editProduct)

   const [show, setShow] = useState(false);

    const [toogle,setToogle]= useState(false)
    const navigator= useNavigate()
    const [productName, setProductName] = useState('')
    const [catValue, setCatValue] = useState( '')
    const [radius, setRadius] = useState('')
    const [productPrice, setProductPrice] = useState( '')
    const [mobileNumber, setMobileNumber] = useState( '')
    const [productSpecifications, setProductSpecification] = useState( '')
    const [files,setFiles] = useState( [])
    const [clientErrors, setClientErrors] = useState({})
    const errors = {}
   
    const [pageNo, setPageNo] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage) : 1;
      });;

    const notify = () => toast("Product Added Sucessfully");

    //getting user id
     const {state} = useContext(UserContext)
    // console.log('ss',state.user._id)

    //console.log('cat',catValue)
    const products = useSelector((state)=>{
        return state.allProducts.allProducts
    })
    //console.log('my pro pro', products)
    const category = useSelector((state)=>{
        return state.category.category
    })
    //console.log('cat',category)

    // const userProducts = products.map((ele)=>{
    //     if(ele.productOwner == state.user._id){
    //         if(ele.productImage[0].url != undefined){
    //             return ele._id
    //         }
            
    //     }
    // })
    const fil = products.filter((ele)=>{
        return ele.productOwner == state.user._id
    })
   
    const userAddress = useSelector((state)=>{
        return state.address.address[0]
      })
      console.log('add',userAddress)
    //toogle for Button
    const handleClick=(e)=>{
        
        if(userAddress){
            setToogle(!toogle)
        }else{
            navigator('/Address')
        }
    }
    //uploading multi images
    function handleFiles(e) {
        const upload = e.target.files
        // console.log('up',upload)
        setFiles([...upload])
    }
    //adding lot long to the product 
    const address = useSelector((state)=>{
        return state.address.address[0]
    })
    //RunValidations
    const runValidation = () => {
        //productName
        if(productName.trim().length === 0){
            errors.productName = '* productName is required '
        }else if(productName.trim().length >=15 || productName.trim().length <=2 ){
            errors.productName = '*productName min=2 and max=15 length required'
        }
        //productPrice
        if(productPrice.length === 0){
            console.log('price',productPrice.length > 0)
            errors.productPrice = '*productPrice is required '
        }
        //mobileNumber
        if(mobileNumber.trim().length !== 10){
            errors.mobileNumber = '*mobileNumber is required '
        }
        //productSpecifications
        if(productSpecifications.trim().length === 0){
            errors.productSpecifications = '*productSpecifications is required '
        }else if(productSpecifications.trim().length <= 10){
            errors.productSpecifications= '* ProductSpecifications minlength is 10 required'
        }
        //images
        if(files.length === 0){
            errors.image = "* Upload atleast one Image"
        }
        //category
        if(catValue.length === 0){
            errors.catValue ='* Select Category'
        }
        //radius
        if(radius.length == 0){
            errors.radius = "* Radius is required"
        }
    }
    
    function reset(){
        setProductName(''),
        setCatValue(''),
        setProductSpecification(''),
        setProductPrice(''),
        setMobileNumber('')
        setRadius('')
        setFiles([])
   }

   
    const handleSubmit= async (e)=>{
        
        e.preventDefault()
        runValidation()
       
        if(Object.keys(errors).length ===0){
            //console.log('4')
            const formData = new FormData()
            formData.append('productName', productName)
            formData.append('category', catValue)
            formData.append('radius', radius)
            formData.append('productSpecifications', productSpecifications)
            formData.append('productPrice', productPrice)
            formData.append('mobileNumber', mobileNumber)
            
            files.forEach((obj) => {
                formData.append('productImage', obj)
            })
           
            if( state.user._id ===  address?.addressOwner){
                formData.append('lat',address?.latitude)
                formData.append('long',address?.longititude)
            }
        
            if(!editProduct){
                //console.log('!!',formData)
                dispatchRdx(startMyProducts({formData,setClientErrors,reset,setToogle,notify}))
                
            }else{
                // console.log('!!STARTEDIT',formData)
                // console.log('EDITPROID',editProId)
                // console.log('FORMDATA',formData)
                dispatchRdx(startEdit({editProId,formData,setClientErrors,reset,setToogle}))
                
            }
           
        }else{
           // console.log('error',errors)
            setClientErrors(errors)
        }
        
    }
    //delete Id 
    const handleDelete=(id)=>{
        const ok = window.confirm('Are you sure for Delete')
        
        if(ok){
            dispatchRdx(startDelete({id}))
        }
    }
    //edit pro
    const handleEdit=(id)=>{
        console.log('ele._id11',id)
        setEditProId(id)
        setToogle(true)
        
        //dispatchRdx(startEdit({id}))
    }
   
    //dropdown
    const handleCategorySelect = (selectedCategory) => {
        setCatValue(selectedCategory);
        //console.log('jj',selectedCategory)
      };

   //Edit data
//    useEffect(() => {
//     // Set the initial state values based on editProduct when it's available
//     if (editProduct) {
//       setProductName(editProduct.productName);
//       console.log('USEEFFECT',editProduct.productName)
//       setCatValue(editProduct.category);
//       setRadius(editProduct.radius);
//       setProductPrice(editProduct.productPrice);
//       setMobileNumber(editProduct.mobileNumber);
//       setProductSpecification(editProduct.productSpecifications);
//       setFiles(editProduct.productImage);
//     }
//     }, [editProduct])
      //console.log('eee',clientErrors.catValue)
    //   dispatchRdx(startMyAllProducts())
    //   dispatchRdx(startAllProducts())
    const productsPerPage = 8;
    const indexOfLastProduct = pageNo * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = fil.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );

      const totalPages = Math.ceil(fil.length / productsPerPage);

      const handlePrevClick = () => {
        if (pageNo > 1) {
          setPageNo(pageNo - 1);
        }
      };
    
      const handleNextClick = () => {
        console.log('jj',pageNo,totalPages)
        if (pageNo < totalPages) { 
          setPageNo(pageNo + 1);
        }
      };

      const handleAvailable =(id)=>{
        console.log('nto',id)
       
        const ok = window.confirm('Are You sure to Adding the Product Again')
        if(ok){
            console.log('notasdkf',id)
            dispatchRdx(startMakeAvailable(id))
        }
      }

      useEffect(() => {
        localStorage.setItem("currentPage", pageNo);
        return () => {
            localStorage.removeItem('currentPage');
          };
      }, [pageNo]);
    return(
        <div className="p-3">
            
        <h1 style={{fontFamily: 'cursive'}}>My Products</h1>
        
        { toogle ? 
        (
        <Modal show={toogle} onHide={handleClick}>
            <Modal.Header closeButton>
            <Modal.Title>Add Your Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
                <DropdownButton
                    title={catValue || 'Select Category'}
                    onSelect={handleCategorySelect}
                    >
                    {category.map((ele) => (
                    <Dropdown.Item key={ele._id} eventKey={ele.name}> 
                        {ele.name}
                    </Dropdown.Item>
                    ))}
                </DropdownButton>
                {clientErrors.catValue && <span style={{color: 'red'}}>{clientErrors.catValue}</span>}

                <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Control  type="file"  name='productImage'  onChange={handleFiles}
                    placeholder="upload your Product Images" multiple />
                </Form.Group>
                {clientErrors.image && <span style={{color: 'red'}}>{clientErrors.image}</span>}   
                     
                <Form.Control size="small"
                type="text" value={radius} onChange={(e)=>{setRadius(e.target.value)}}
                    name='radius' placeholder="Radius of your Object Starts at 1-K.M"  />
                    {clientErrors.radius && <span style={{color: 'red'}}>{clientErrors.radius}</span>}<br/>

                <Form.Control size="small"
                type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}}
                    name='name' placeholder="Enter your Product Name"  />
                    {clientErrors.productName && <span style={{color: 'red'}}>{clientErrors.productName}</span>}<br/>

                <Form.Control size="small"
                type="text" value={productSpecifications} onChange={(e)=>{setProductSpecification(e.target.value)}}
                    name='specifications' placeholder="Enter your Product Specifications"  />
                    {clientErrors.productSpecifications && <span style={{color: 'red'}}>{clientErrors.productSpecifications}</span>}<br/>
                    
                <Form.Control size="small"
                type="text" value={productPrice} onChange={(e)=>{setProductPrice(e.target.value)}}
                    name='price' placeholder="Enter your Product $=Price"  />
                    {clientErrors.productPrice && <span style={{color: 'red'}}>{clientErrors.productPrice}</span>}<br/>

                <Form.Control size="small"
                type="text" value={mobileNumber} onChange={(e)=>{setMobileNumber(e.target.value)}}
                    name='mobilenumber' placeholder="Enter your MobileNumber"  />
                    {clientErrors.mobileNumber && <span style={{color: 'red'}}>{clientErrors.mobileNumber}</span>}<br/>
                
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClick} > Close </Button>
                <Button 
                variant="primary" type="submit" value='Submit' onClick={handleSubmit} > Add Product </Button>
            </Modal.Footer>
            </form>
            </Modal.Body>

    </Modal>
   
        )
        :
        ''
        }
        <Button  onClick={()=>{navigator('/RentalProducts')}}>View all Rental Products</Button>
      
      <ul>
      {toogle ? 
        (<Button variant="primary" className="m-2" onClick={handleClick} >Adding Product...</Button>)
        : 
        (<Button style={{backgroundColor:'blue'}} className="m-2" variant="primary" onClick={handleClick} > Add Product</Button>)
        // (<button onClick={handleClick}>add product</button>)
        }
      </ul>
        
        {/* <h1>viewing all products that are added by me</h1> */}

        
        
        {fil.length == 0 ?
        <h1>ADD YOUR PRODUCTS</h1>
        :
        <div className="mt-1">
            <Row xs={1} md={4} className="g-4">
        {currentProducts.map((ele) => (
          <Col key={ele._id} style={{ marginBottom: '20px' }} >
            <Card className="h-100 hover-shadow image-hover-effect shadow border border-0"  >
              <Card.Img variant="top" 
                src={`${ele.productImage[0].url}`} 
                style={{ objectFit: 'cover', height: '200px', 
                    transition: 'transform 0.3s',opacity : (ele.stock == 'available' ? '1' : '0.5') }}
                />
              <Card.Body>
                <Card.Title>{ele.productName}</Card.Title>
                <Card.Text>
                {ele.productSpecifications}<br/>
                </Card.Text>
                <Card.Text>
                   'price' {ele.productPrice}
                </Card.Text>
              </Card.Body>
              {/* <a href="#"><button
                    onClick={()=>{handleEdit(ele._id)}}>Edit</button></a> */}
                {ele.stock == 'notAvailable' ? 
                <Button className= 'border border-0' style={{backgroundColor:'green'}} onClick={()=>{handleAvailable(ele._id)}}> Make Available</Button> :
                <Button  onClick={()=>{handleDelete(ele._id)}} >Delete</Button>}
            </Card>
            </Col>
            ))}
            </Row>
        </div>
        }
        
        <Pagination>
            <Pagination.First onClick={(e)=>setPageNo(1)}/>
            <Pagination.Prev onClick={handlePrevClick} disabled={pageNo === 1} />
            <Pagination.Item disabled>{pageNo}</Pagination.Item>
            <Pagination.Next onClick={handleNextClick} disabled={pageNo === totalPages} />
            <Pagination.Last onClick={(e)=>setPageNo(totalPages)}/>
        </Pagination>
        
        <ToastContainer />
        {fill.length == 0 ?
         <Footer/>
         :
         <div className="footer">
            <Footer/>
        </div>
         }
        </div>
    )
}
