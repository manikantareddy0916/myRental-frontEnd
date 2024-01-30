import { useState } from "react"
import { startCategory } from "../actions/categoryAction"
import { useDispatch } from "react-redux"
import _ from 'lodash'
import { useSelector } from "react-redux"
import { startDeleteId } from "../actions/categoryAction"
import { Button } from "react-bootstrap"

export default function Category(){

    const dispatchRdx = useDispatch()
    //const [category, setCategory]= useState([])
    const [name, setName] = useState('')
    //const [deleteId, setDeleteId] = useState('')
    const [clientErrors, setClientErrors] = useState({})
    const errors={}

    const category = useSelector((state)=>{
        return state.category.category
    })
    // console.log('final',category.length)
    // console.log('final-2',category)

    const categoryData = category.filter((ele)=>{
        return ele.name.toLowerCase() == name.toLowerCase()
    })
    console.log('dataaaa',categoryData)
    // console.log('data',_.isEmpty(categoryData))

    const runValidation = () =>{
        if(name.trim().length ==0 ){
            errors.name = 'Not empty'
        }
        else if(!_.isEmpty(categoryData) ){
            errors.name = 'Category Already Exist'
        }
    }
    const handleClick=(id)=>{
        console.log('jkjk',id)
        const userInput = window.confirm('Are You Sure')
        if(userInput){
            
            dispatchRdx(startDeleteId({id}))
        }
    }
    const addSubmit =(e)=>{

        e.preventDefault()
         runValidation()

        if(Object.keys(errors).length == 0){
            const formData={
                name,
            }
            console.log('form', formData)
            dispatchRdx(startCategory({formData,setName,setClientErrors}))
        }else{
            setClientErrors(errors)
        }
        
    }
    return (
        <div>

            <h1 style={{fontFamily: 'cursive'}}>C@@ategoreys</h1>
            
            {category.map((ele)=>{
                return (
               
                    <ul key={ele._id}>
                        <li>{ele.name}</li>
                        <Button onClick={()=>{handleClick(ele._id)}}>Delete</Button>
                    </ul>
              
                )
            })}
            <h1 style={{fontFamily: 'cursive'}}> Create a Category</h1>
            <form onSubmit={addSubmit} >
                <input placeholder='Create a category' style={{fontFamily: 'cursive'}} type="text" value={name} onChange={(e)=>{setName(e.target.value)}} /><br/>
                {clientErrors.name && <span style={{fontFamily: 'cursive',color:'red'}}>{clientErrors.name}</span>}<br/>
                
                <Button variant="primary" style={{ fontFamily: 'cursive' }} type="submit">
                    Add
                </Button>
            </form>
           
        </div>
    )
}