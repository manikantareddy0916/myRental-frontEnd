import {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
//import userReducer from '../reduxReducer/userReducer'
import addressRdxReducer from '../reduxReducer/addressRdxReducer'
import myProductsRdx from '../reduxReducer/myProductsRdx'
import categoryRdx from '../reduxReducer/categoryRdxReducer'
import reqForm from '../reduxReducer/reqFormRdxReducer'
import { paymentsReducer } from '../reduxReducer/paymentRdxReducer'

export function configureStore(){
    const store= createStore(combineReducers({
        // user : userReducer,
        address : addressRdxReducer,
        allProducts : myProductsRdx,
        category : categoryRdx,
        reqForm : reqForm,
        payments : paymentsReducer

    }),applyMiddleware(thunk))
    return store
}