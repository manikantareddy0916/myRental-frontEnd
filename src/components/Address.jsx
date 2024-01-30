import { useNavigate, useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"
import {useFormik} from 'formik'
import * as Yup from 'yup'

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {startEditAddress, startCreateAddress, startGetAddress } from "../actions/addressAction"
import axios from "../configure/axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import _ from 'lodash'
import {Modal, Form ,Button} from 'react-bootstrap'

export default function Address(){

    const { aId } = useParams()

    const {state} = useContext(UserContext)

    const [toogle,setToogle]= useState(false)
    const dispatchRdx = useDispatch() //redux
   // const  {dispatch} = useContext(UserContext) //reducer
    const navigate = useNavigate()
    const location = useLocation()
    const navData = location.state?.message
   // console.log('jjnav',navData)

    const address = useSelector((state)=>{
        return state.address.address[0]//?._id
    })
    // console.log('Id',_.isEmpty(address))
    // console.log('Id',(address))
    // console.log('IAd',(aId))
    
   
    const addressValidationSchema = Yup.object().shape({
        place: Yup.string().required('Your Place is Required'),
        houseNumber: Yup.string().required('Your houseNumber is Required'),
        street: Yup.string().required('Your Street is Required'),
        pinCode: Yup.string().required('Your Pincode is Required'),
        city: Yup.string().required('Your city is Required'),
        myState: Yup.string().required('Your State is Required'),
        country: Yup.string().required('Your Country is Required')
    })
    const formik = useFormik({
        initialValues:{
            place: address ? address?.place : '',
            houseNumber: address ? address?.houseNumber : '',
            street: address ? address?.street : '',
            pinCode: address ? address?.pinCode : '',
            city: address ? address?.city : '',
            myState: address ? address?.myState : '',
            country: address ? address?.country : '',
            latitude: '',
            longititude: ''
        },
        validationSchema: addressValidationSchema,
        validateOnChange: false,
        onSubmit:(formData, {resetForm})=>{
        //    console.log('kk',formData)
        const redirect = () => {
            //console.log('red',navData)
            navigate(navData)
          }
        const redirect2 = ()=>{
            if(state.user.role == 'admin'){
                navigate('/AdmProfile')
            }else{
                navigate('/Profile')
            }
        }
          //lat long 
          //console.log('api',formik.values.place)
                 axios.get(`https://api.geoapify.com/v1/geocode/search?name=${formik.values.place}&housenumber=${formik.values.houseNumber}&street=${formik.values.street}&postcode=${formik.values.pinCode}&city=${formik.values.city}&state=${formik.values.myState}&country=${formik.values.country}&format=json&apiKey=8f7392be187b4b2f8428c981723564ab`)
                    .then((ress)=>{
                        
                        if(!address){
                            // console.log('!')
                            if(ress.data.results[0] && ress.data.results[1] && ress.data.results[2]){
                                alert('Please check your Address there are multiple Address are founded')
                                
                            }else{
                                formData.latitude = String(ress.data.results[0].lat)
                                formData.longititude = String(ress.data.results[0].lon)
                        
                                dispatchRdx(startCreateAddress({formData,resetForm,redirect}))
                            }

                        }else{
                            // console.log('edit elese')
                            if(ress.data.results[0] && ress.data.results[1] && ress.data.results[2]){
                                alert('Please check your Address there are multiple Address are founded')
                                
                            }else{
                                formData.latitude = String(ress.data.results[0].lat)
                                formData.longititude = String(ress.data.results[0].lon)
                        
                                dispatchRdx(startEditAddress({aId,formData,resetForm,redirect2}))
                            }
                        }
                        //console.log('dj',ress.data)
                        
                    })
                    .catch((e)=>{
                        console.log('check your .then',e)
                    })
          
                    
                    //dispatch({type : 'ADDRESS' , payload : formData}) 
            //dispatch({type:'RED_ADDRESS_ADD', payload: formData})
        }
    })
    // const handleSubmit =(e)=>{
    //     e.preventDefault()

    //     navigate('/MyProducts')
    // }
    useEffect(()=>{
        formik.setFieldValue('place', address ? address.place : '')
        formik.setFieldValue('houseNumber', address ? address.houseNumber : '')
        formik.setFieldValue('street', address ? address.street : '')
        formik.setFieldValue('pinCode', address ? address.pinCode : '')
        formik.setFieldValue('city', address ? address.city : '')
        formik.setFieldValue('myState', address ? address.myState : '')
        formik.setFieldValue('country', address ? address.country : '')
        // formik.setFieldValue('place', address ? address.place : '')
        // formik.setFieldValue('place', address ? address.place : '')
    },[address])

    //toogle for Button
    const handleClick=(e)=>{
        navigate('/')
    }
    useEffect(()=>{
      dispatchRdx(startGetAddress())  
    },[])
    return(
        <div>
            
            <Modal show={true} onHide={handleClick}>
            <Modal.Header closeButton>
            <Modal.Title>Add Your Address</Modal.Title>
            </Modal.Header> 

            <Modal.Body>
            <form onSubmit={formik.handleSubmit} >  
                     
                <Form.Control size="small"
                type="text" value={formik.values.place} onChange={formik.handleChange}
                    name='place' placeholder="Enter your Place"/>
                    {formik.errors.place ? formik.errors.place : ''}<br />

                <Form.Control size="small"
                type="text" value={formik.values.houseNumber} onChange={formik.handleChange}
                    name='houseNumber' placeholder="Enter your houseNumber"  /><br/>
                    {formik.errors.houseNumber ? formik.errors.houseNumber : ''}<br />

                <Form.Control size="small"
                type="text" value={formik.values.street} onChange={formik.handleChange}
                name='street' placeholder="Enter your Street" /><br/>
               {formik.errors.street ? formik.errors.street : ''}<br />
                    
                <Form.Control size="small"
                type="text" value={formik.values.pinCode} onChange={formik.handleChange}
                name='pinCode' placeholder="Enter your Pincode" /><br/>
                {formik.errors.pinCode ? formik.errors.pinCode : ''}<br />

                <Form.Control size="small"
                type="text" value={formik.values.city} onChange={formik.handleChange}
                name='city' placeholder="Enter your City" /><br/>
                {formik.errors.city ? formik.errors.city : ''}<br />

                <Form.Control size="small"
                type="text" value={formik.values.myState} onChange={formik.handleChange}
                name='myState' placeholder="Enter your State" /><br/>
                {formik.errors.myState ? formik.errors.myState : ''}<br />

                <Form.Control size="small"
                type="text" value={formik.values.country} onChange={formik.handleChange}
                name='country' placeholder="Enter your Country" /><br/>
                {formik.errors.country ? formik.errors.country : ''}<br />
                
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClick} > Close </Button>
                <Button 
                variant="primary" type="submit" value='Submit'  onClick={formik.handleSubmit}> Submit </Button>
            </Modal.Footer>
            </form>
            </Modal.Body>

    </Modal>                
        </div>
    )
}
