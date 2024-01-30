import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { startAllAddress } from "../actions/addressAction";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Card, Col, Row , Button,Dropdown,DropdownButton, Pagination} from 'react-bootstrap';
import { startMyAllProducts, startQuery } from "../actions/myProducts";
import _ from 'lodash'

export default function RentalProducts(){

    const navigator = useNavigate()
    const dispatchRdx = useDispatch()
    // Function to calculate the distance between two sets of coordinates using Haversine formula
    function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
}

// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to check if coordinates are within a specified radius
function isWithinRadius(lat1, lon1, lat2, lon2, radius) {
    const distance = haversineDistance(lat1, lon1, lat2, lon2);
    return distance <= radius;
}

// Example usage
//lat , long
//Home  14.462829235744172, 78.81722012399598
//near house 14.462698816415218, 78.81792931966817
//seven roads 14.47684024555956, 78.82352898404027
//banglore 13.354175180703804, 77.6540339945403


    //const dispatchRdx = useDispatch()
    // useEffect(()=>{
    //     dispatchRdx(startAllAddress())
    // },[])
    
    const [ displayView, setDisplayView] = useState('allProducts')
    const [catData, setCatData] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const sortData =['lowest-highest',"highest-lowest","a-z","z-a"]
    const [sortName, setSortName] = useState(null)
    //const [currentPage, setCurrentPage] = useState(1)
    //const allProduct = useSelector(state => state )
    //console.log('catdata',catData)
    const query = useSelector((state)=>{
        return state.allProducts.query
    })
    console.log('kkkd',query)

    const [pageNo, setPageNo] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage) : 1;
      });;
    const [pageNo2, setPageNo2] = useState(() => {
        const savedPage = localStorage.getItem("currentPage2");
        return savedPage ? parseInt(savedPage) : 1;
      });;
    const [pageNo3, setPageNo3] = useState(() => {
        const savedPage = localStorage.getItem("currentPage3");
        return savedPage ? parseInt(savedPage) : 1;
      });;

    //const totalPages = Math.ceil(allProduct.length / productsPerPage);

    //category 
    const category = useSelector((state)=>{
        return state.category.category
    })
    //console.log('category',category)
    //products
    const products = useSelector((state)=>{
        return state.allProducts.allProducts
    })
    //console.log('products',products)
    //productOwnerID
    const proOwnerId = products.map((ele)=>{
        return ele.productOwner
    })
    //console.log('promap',proOwnerId)
    //AddressOwnerId
    const userAddressId = useSelector((state)=>{
        return state.address.address//[0]?.addressOwner
    })
    // console.log('address2',userAddressId)
    // console.log('userLat',userAddressId[0]?.latitude)
    // console.log('userLong',userAddressId[0]?.longititude)
    

    //PRODUCTS DISPLAYING BASED ON PRODUCT RADIUS
    const proData =[]// withinRadius products data
    const data = products.map((ele)=>{
        const location1 = { latitude :userAddressId[0]?.latitude, longitude : userAddressId[0]?.longititude}//user
        const location2 = { latitude: ele.lat, longitude: ele.long }//product
        const radius = ele.radius // Radius in km

        const withinRadius = isWithinRadius(location1.latitude, location1.longitude, location2.latitude, location2.longitude, radius)
        
        if( withinRadius ){
            proData.push( ele)
            //console.log('within',proData)
        }else{
           // console.log('outside')
        }
    })
    //BASED ON CATEGORY SHOWING ALL PRODUCTS
    const categoryProducts =[]
    products.map((ele)=>{
        if(ele.category === catData){
            return categoryProducts.push(ele)
        }
    })
    //console.log('catepro',categoryProducts)
    //AllAddress
    // const allAddress = useSelector((state)=>{
    //     return state.address.allAddress.map((ele)=>{
    //         return ele.products.map((ele)=>{
    //             return ele.radius
    //         })
    //     })
    // })
    //0r 
    // const allAddress = useSelector((state)=>{
    //     return state.address.allAddress
    // })
    // console.log('address',address[0]?.latitude)
    // console.log('address',address[0]?.longititude)
    // console.log('alladdress',allAddress)
    
    // const userLatProduct = address[0]?.latitude
    // const userLongProduct = address[0]?.longititude 
    // const latUser = address
    // console.log('addresslong',address[0]?.latitude)
    // console.log('addresslong',address[0]?.longititude)
    // console.log('addresslong',address[0]?.products)
    // const location1 = { latitude: 14.462829235744172, longitude: 78.81722012399598}//userAddress,lat,long
    // const location2 = { latitude: 14.47684024555956, longitude: 78.82352898404027 }//productAddress,Lat,long
    // const radius = 1.7; // Radius in kilometers it is km

    // const withinRadius = isWithinRadius(location1.latitude, location1.longitude, location2.latitude, location2.longitude, radius);
    // console.log(withinRadius ? 'Within radius' : 'Outside radius');

      
    const radiusClick = (e)=>{
        setDisplayView('radius')
    }
    const catClick =(e)=>{
        setDisplayView('category')
        setCatData(e)
    }
    //console.log('cat',catData)
    const sortClick=(e)=>{
        setSortValue(e)
        setDisplayView('sort')
        setSortName(e)
    }
    const productsPerPage = 8;

    const indexOfLastProduct = pageNo * productsPerPage;
    const indexOfLastProduct2 = pageNo2 * productsPerPage;
    const indexOfLastProduct3 = pageNo3 * productsPerPage;

    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const indexOfFirstProduct2 = indexOfLastProduct2 - productsPerPage;
    const indexOfFirstProduct3 = indexOfLastProduct3 - productsPerPage;

    //radius
    const proData1 = proData.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
      //
    const categoryProducts2 = categoryProducts.slice(
        indexOfFirstProduct2,
        indexOfLastProduct2
      );
      //
    const products1 = products.slice(
        indexOfFirstProduct3,
        indexOfLastProduct3
      );

      const totalPages = Math.ceil(proData.length / productsPerPage);
      const totalPages2 = Math.ceil(categoryProducts.length / productsPerPage);
      const totalPages3 = Math.ceil(products.length / productsPerPage);

      const handlePrevClick = () => {
        if (pageNo > 1) {
          setPageNo(pageNo - 1);
        }
      };
    
      const handleNextClick = () => {
        //console.log('jk',pageNo,totalPages)
        if (pageNo < totalPages) {
            //console.log('not ok')
          setPageNo(pageNo + 1);
        }
      };

      const handlePrevClick2 = () => {
        if (pageNo2 > 1) {
          setPageNo2(pageNo2 - 1);
        }
      };
      const handleNextClick2 = () => {

        if (pageNo2 < totalPages2) {
            //console.log('not ok')
          setPageNo2(pageNo2 + 1);
        }
      };

      const handlePrevClick3 = () => {
        if (pageNo3 > 1) {
          setPageNo3(pageNo3 - 1);
        }
      };
      const handleNextClick3 = () => {
        //console.log('jk',pageNo,totalPages)

        if (pageNo3 < totalPages3) {
            console.log('not ok')
          setPageNo3(pageNo3 + 1);
        }
      };

      useEffect(() => {
        localStorage.setItem("currentPage", pageNo);
        return () => {
            localStorage.removeItem('currentPage');
          };
      }, [pageNo]);
      useEffect(() => {
        localStorage.setItem("currentPage2", pageNo2);
        return () => {
            localStorage.removeItem('currentPage2');
          };
      }, [pageNo]);
      useEffect(() => {
        localStorage.setItem("currentPage3", pageNo3);
        return () => {
            localStorage.removeItem('currentPage3');
          };
      }, [pageNo]);

      useEffect(()=>{
        if(searchValue){
           // console.log('yes',searchValue)
            dispatchRdx(startQuery({searchValue}))
        }
        if(sortValue){
            console.log('y',sortValue)
            dispatchRdx(startQuery({sortValue}))
        }

      },[searchValue,sortValue])
      
     // console.log('search',searchValue)
    //dispatchRdx(startMyAllProducts())
    return(
        <div className="p-3">
        
        <h1 style={{fontFamily: 'cursive'}}>Rental products</h1>
        <Button className='' color="blue" onClick={()=>{navigator('/MyProducts')}}> Go to Add Products </Button>

        
        <ul>
        <div className="flex d-flex">
            <DropdownButton  className="m-2"  title={catData || 'Select Category'} onSelect={catClick}>
            <Dropdown.Item eventKey={null}>Select Category</Dropdown.Item>
                {category.map((ele) => (
                    <Dropdown.Item key={ele._id} eventKey={ele.name}>
                    {ele.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            <DropdownButton  className="m-2"  title={sortValue || 'Filter'} onSelect={sortClick}>
            <Dropdown.Item eventKey={null}>Select Sort</Dropdown.Item>
                {sortData.map((ele,i) => (
                    <Dropdown.Item key={ele} eventKey={ele}>
                    {ele}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
        
            <Button className="m-2" onClick={radiusClick}>Near Your location</Button><></>

            <Button className="m-2" onClick={(e)=>{setDisplayView('allProducts')}}>All Products</Button>

            <input  style={{ fontFamily: 'cursive' }} className="m-2" placeholder='Search ' onClick={(e)=>{setDisplayView('searchValue')}} onChange={(e)=>{setSearchValue(e.target.value)}} value={searchValue}/>
           

           
         </ul>
        { displayView == 'sort' ?
        
        (_.isEmpty(sortValue)) ? <h2 style={{fontFamily: 'cursive'}}>Select Sort To Find The Products</h2>:
        <>
        <h1 style={{fontFamily: 'cursive'}}>{sortValue}</h1>
            <Row xs={1} md={4} className="g-4">
                        {query.map((ele) => (
                            <Col key={ele._id} style={{ marginBottom: '20px' }}>
                            <Card className="h-100 hover-shadow image-hover-effect" style={{opacity : (ele.stock == 'available' ? '1' : '0.9')}}>
                                <Link to={`/RentalForm/${ele._id}`}>
                                <Card.Img
                                    variant="top"
                                    src={ele.productImage[0].url}
                                    style={{
                                    objectFit: 'cover',opacity : (ele.stock == 'available' ? '1' : '0.5'),
                                    height: '200px', // Set a fixed height for uniformity
                                    transition: 'transform 0.3s',
                                    }}
                                />
                                </Link>
                                <Card.Body>
                                <Card.Title>{ele.productName}</Card.Title>
                                <Card.Text>{ele.productSpecifications}<br/></Card.Text>
                                <Card.Text>{ele.productPrice}</Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
        
                    </Row>
     
        </> 
        :  
        displayView == 'category' ?
         <>
            {(_.isEmpty(categoryProducts2)) ? <h2 style={{fontFamily: 'cursive'}} >No Product Found based on {catData} Category</h2>: 
            <>
            <h1 style={{fontFamily: 'cursive'}}>{catData}</h1>
            <Row xs={1} md={4} className="g-4">
                {categoryProducts2.map((ele) => (
                    <Col key={ele._id} style={{ marginBottom: '20px' }}>
                    <Card className="h-100 hover-shadow image-hover-effect" style={{opacity : (ele.stock == 'available' ? '1' : '0.9')}} >
                        <Link to={`/RentalForm/${ele._id}`}>
                        <Card.Img
                            variant="top"
                            src={ele.productImage[0].url}
                            style={{
                            objectFit: 'cover',
                            height: '200px', // Set a fixed height for uniformity
                            transition: 'transform 0.3s',
                            }}
                        />
                        </Link>
                        <Card.Body>
                        <Card.Title>{ele.productName}</Card.Title>
                        <Card.Text>{ele.productSpecifications}<br/></Card.Text>
                        <Card.Text>{ele.productPrice}</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
            <Pagination>
                <Pagination.First onClick={(e)=>setPageNo2(1)}/>
                <Pagination.Prev onClick={handlePrevClick2} disabled={pageNo2 === 1} />
                <Pagination.Item disabled>{pageNo2}</Pagination.Item>
                <Pagination.Next onClick={handleNextClick2} disabled={pageNo2 === totalPages2} />
                <Pagination.Last onClick={(e)=>setPageNo2(totalPages2)}/>
            </Pagination>
            </>}
         </>
        :
        displayView == 'radius' ? 
        <>
            {(_.isEmpty(proData1)) ? <h2 style={{fontFamily: 'cursive'}}>NO product found Based on Radius</h2> :
            <>
            <h1 style={{fontFamily: 'cursive'}}>Based On Your Radius </h1>
            <Row xs={1} md={4} className="g-4">
                {proData1.map((ele) => (
                    <Col key={ele._id} style={{ marginBottom: '20px' }} className={ele.opacity}>
                    <Card className="h-100 hover-shadow image-hover-effect" style={{opacity : (ele.stock == 'available' ? '1' : '0.9')}}>
                        <Link to={`/RentalForm/${ele._id}`}>
                        <Card.Img 
                            variant="top"
                            src={ele.productImage[0].url}
                            style={{
                            objectFit: 'cover',opacity : (ele.stock == 'available' ? '1' : '0.5'),
                            height: '200px', // Set a fixed height for uniformity
                            transition: 'transform 0.3s',
                            }}
                        />
                        </Link>
                        <Card.Body>
                        <Card.Title>{ele.productName}</Card.Title>
                        <Card.Text>{ele.productSpecifications}<br/></Card.Text>
                        <Card.Text>{ele.productPrice}</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
            <Pagination>
                <Pagination.First onClick={(e)=>setPageNo(1)}/>
                <Pagination.Prev onClick={handlePrevClick} disabled={pageNo === 1} />
                <Pagination.Item disabled>{pageNo}</Pagination.Item>
                <Pagination.Next onClick={handleNextClick} disabled={pageNo === totalPages} />
                <Pagination.Last onClick={(e)=>setPageNo(totalPages)}/>
            </Pagination>
            </>}
        </> 
        :  searchValue ? 
        <>
            {  searchValue &&
            <Row xs={1} md={4} className="g-4">
            {_.isEmpty(query) ? 
            <h1 style={{fontFamily: 'cursive'}}>No product Found</h1>
            :
            query.map((ele) => (
                <Col key={ele._id} style={{ marginBottom: '20px' }} className={ele.opacity}>
                <Card className="h-100 hover-shadow image-hover-effect" style={{opacity : (ele.stock == 'available' ? '1' : '0.9')}}>
                    <Link to={`/RentalForm/${ele._id}`}>
                    <Card.Img 
                        variant="top"
                        src={ele.productImage[0].url}
                        style={{
                        objectFit: 'cover',opacity : (ele.stock == 'available' ? '1' : '0.5'),
                        height: '200px', // Set a fixed height for uniformity
                        transition: 'transform 0.3s',
                        }}
                    />
                    </Link>
                    <Card.Body>
                    <Card.Title>{ele.productName}</Card.Title>
                    <Card.Text>{ele.productSpecifications}<br/></Card.Text>
                    <Card.Text>{ele.productPrice}</Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
        </Row>
        }
        </> 
        :
        <>
        <h1 style={{fontFamily: 'cursive'}}>All Products</h1>
        <Row xs={1} md={4} className="g-4">
                        {products1.map((ele) => (
                            <Col key={ele._id} style={{ marginBottom: '20px' }}>
                            <Card className="h-100 hover-shadow image-hover-effect" style={{opacity : (ele.stock == 'available' ? '1' : '0.9')}}>
                                <Link to={`/RentalForm/${ele._id}`}>
                                <Card.Img
                                    variant="top"
                                    src={ele.productImage[0].url}
                                    style={{
                                    objectFit: 'cover',opacity : (ele.stock == 'available' ? '1' : '0.5'),
                                    height: '200px', // Set a fixed height for uniformity
                                    transition: 'transform 0.3s',
                                    }}
                                />
                                </Link>
                                <Card.Body>
                                <Card.Title>{ele.productName}</Card.Title>
                                <Card.Text>{ele.productSpecifications}<br/></Card.Text>
                                <Card.Text>{ele.productPrice}</Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
        
                    </Row>
            <Pagination>
                <Pagination.First onClick={(e)=>setPageNo3(1)}/>
                <Pagination.Prev onClick={handlePrevClick3} disabled={pageNo3 === 1} />
                <Pagination.Item disabled>{pageNo3}</Pagination.Item>
                <Pagination.Next onClick={handleNextClick3} />
                <Pagination.Last onClick={(e)=>setPageNo3(totalPages3)}/>
            </Pagination>
        </>
        }
        </div>
    )
}