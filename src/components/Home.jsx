import { useContext, useEffect } from "react"
import { UserContext } from "../App"
import _, { size } from 'lodash'
import { useNavigate , useLocation} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
//import { startGetAllRentalProducts } from "../actions/rentalFormAction"
// import { useDispatch } from 'react-redux'
// import { startCreateAddress } from '../actions/addressAction'
//import { reloadAddress } from '../actions/addressAction'
//import { addAddressa } from '../actions/addressAction'
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./Footer"
import { Button } from "react-bootstrap"
export default function Home(){

    // const  {dispatch} = useContext(UserContext)
    //const {state} = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    //const dispatch = useDispatch()

    // const dispatchRdx = useDispatch()
    // dispatchRdx(startGetAllRentalProducts())
    const msg = location.state?.message
    const notify = () => toast(msg);

    const sentRequest = location.state?.messageSendReq
    const notifySendRequest = () => toast(sentRequest);

    const address = useSelector((state)=>{
        return state.address.address[0]
      })
  
    // console.log('home',address)
    // console.log('home2',(_.isEmpty(address)))
    // console.log('reducerAddress',_.isEmpty(state.user.address))
   
    const addProductButton =(e)=>{
        if( (_.isEmpty(address))){
            const ok = confirm('Please Add your ADDRESS for Adding the Product')
            //console.log('aler',state.user.address)
            if(ok){
                return navigate('/Address', {state : {message: `/MyProducts`}} )
            }
        }else{
            return navigate('/MyProducts')
        }
    }
   
    const handleProductView =(e)=>{
        if((_.isEmpty(address)) ){
            const ok = confirm('Please Add your ADDRESS for Viewing all the Product')
            
            if(ok){
                return navigate('/Address', {state : {message: `/RentalProducts`}})
            }
        }else{
            return navigate('/RentalProducts')
        }
    }
    useEffect(()=>{
     notify()
     notifySendRequest()
    },[])
    
    return(
        <div >
            <>
             <div className="home">
                
             <div  className='container'>
                <div className="row">
                <div className="col-7">
                </div>
                <div className="col-5">
                    <div className=" text-right mt-5 " style={{fontFamily:'serif' }}>
                    <h1 style={{fontSize:45,fontFamily:"cursive"}}>MyRental Application</h1><br/>
                        <p className="indent" style={{fontSize:20}}>  This Application will helps to find new Gadgets on your surroundings and we will use it form some days after paying the amount, Also you can give your own objects for rental  </p>
                       
                    </div>
                     {/* if USER token is true login then show This */}
                    {localStorage.getItem('token') &&
                    (<div className="">
                        
                        <div className=" col">
                        
                        <button className=" btn-change  p-3  m-3 rounded"
                        onClick={addProductButton}>Add product for Rent</button>
                        
                        <button className=" btn-change  p-3  mb-5 rounded"
                        onClick={handleProductView}>View Rental Product</button>
                        </div>      
                    </div>)
                    }
                </div>
                </div>
                </div>
             </div>
             <div className="">
                    <Footer />
            </div>
            </>
           <ToastContainer/>
       
        </div>
        
    )
}  

//45/138, Line Number 5, Balaji Nagar, Ravindra Nagar, Kadapa, Andhra Pradesh 516003