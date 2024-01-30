import {BrowserRouter, Routes, Route} from 'react-router-dom'
import userReducer from './reducers/userReducer'
import { useReducer, createContext, useEffect } from 'react'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Navbar1 from './components/Navbar1'
import Profile from './components/Profile'
import axios from './configure/axios'
import Address from './components/Address'
import MyProducts from './components/MyProducts'
import RentalProducts from './components/RentalProducts'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Category from './components/Category'
import AdmProfile from './components/AdmProfile'
import { startAllProducts } from './actions/myProducts'
import { startAllCategorys } from './actions/categoryAction'
import { startAllAddress, startGetAddress } from './actions/addressAction'
import RentalForm from './components/RentalForm'
import RoughBoot from './components/roughBootstrap'
import Requests from './components/Requests'
import { startGetAllRentalProducts, startGetMyRequests} from './actions/rentalFormAction'
import IdProof from './components/IdProof'
import Payment from './components/payment'
import Success from './components/Success'
import { startUserPaymentList } from './actions/paymentAction'
import Failure from './components/Failure'

export const UserContext = createContext()

export function App() {

  const dispatchRdx = useDispatch()
  const [state,dispatch] = useReducer(userReducer, {user:{} , address : {}})
    console.log('state',state.user)
    //console.log('address',state.address)

    // const add = useSelector((state)=>{
    //   return state.user
    // })

    // console.log('app',add)

    //page Reload
    //dispatchRdx(startGetAllRentalProducts())
  useEffect(()=>{
    if(localStorage.getItem('token')){
      ( async ()=>{
        try{
          const response = await axios.get('/api/account', {
            headers: {
               'Authorization': localStorage.getItem('token')
            }
          })
          const user = response.data
          dispatch({ type : 'USER_LOGIN', payload: user})
        }
        catch(e){
          console.log('e',e)
          //alert(e.message)
        }
      })()
    }
  },[])
  /* useEffect for address 
  useEffect(()=>{
    if(localStorage.getItem('token')){
      ( async ()=>{
        try{
          const response = await axios.get('/api/address/list', {
            headers: {
               'Authorization': localStorage.getItem('token')
            }
          })
          const user = response.data
          console.log('useEffect',user)
          dispatchRdx({ type : 'ADD_ADDRESS', payload: user})
        }
        catch(e){
          alert(e.message)
        }
      })()
    }
  },[]) */

//useEffect for myProducts, category
  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatchRdx(startAllProducts())

      dispatchRdx(startAllCategorys())

      dispatchRdx(startGetAddress())
      dispatchRdx(startAllAddress())

      dispatchRdx(startGetAllRentalProducts())

      dispatchRdx(startGetMyRequests())

      dispatchRdx(startUserPaymentList())
      // ( async ()=>{
      //   try{
      //     const resp = await axios.get('/api/product/listAll',{
      //       headers:{
      //         'Authorization': localStorage.getItem('token')
      //       }
      //     }) 
      //     console.log('ALLproductsUseEff',resp.data)
      //     //dispatchRdx({ type : "ADD_ALL_PRODUCTS", payload: resp.data})
      //   }
      //   catch(e){
      //     alert('err',e)
      //   }
      // })()
    }
  },[])
  
  // useEffect for category
  // useEffect(()=>{
  //   if(localStorage.getItem('token')){
  //     ( async ()=>{
  //       try{
  //         const resp = await axios.get('/api/category/list',{
  //           headers: {
  //             'Authorization':localStorage.getItem('token')
  //           }
  //         })
  //         dispatchRdx({ type:'SET_ALL_CATEGORY', payload: resp.data})
  //       }catch(e){
  //         console.log('err',e)
  //       }
  //     })()
  //   }
  // },[])
  return (
   <BrowserRouter >
    <UserContext.Provider value={{state, dispatch}}>
    <div>
        <nav>
          <Navbar1 /> 
        </nav>
        <Routes>
          <Route path='/r' element={<RoughBoot />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/Profile' element={<Profile />}/>
          <Route path='/Address' element={<Address />}/>
          <Route path='/Address/:aId' element={<Address />}/>
          <Route path='/AdmProfile' element={<AdmProfile />}/>
          <Route path='/Category' element={<Category />}/>
          <Route path='/MyProducts' element={<MyProducts />}/>
          {/* <Route path='/MyProducts/edit/:pId' element={<MyProducts />}/> */}
          <Route path='/RentalProducts' element={<RentalProducts />}/>
          <Route path='/RentalForm/:rId' element={<RentalForm />}/>
          <Route path='/Requests' element={<Requests />}/>
          <Route path='/IdProof/:IId' element={<IdProof/>}/>
          <Route path='/Payment' element={<Payment />}/>
          <Route path='/success' element={<Success />}/>
          <Route path='/cancel' element={<Failure />}/>


        </Routes>
      </div>
    </UserContext.Provider>
   </BrowserRouter>
  )
}

