const initialState ={
    allProducts : [], serverErrors : [], query:[]
}

export default function myProductsRdx (state = initialState, action) {
    switch( action.type){
        case 'QUERY':{
            return { ...state, query: action.payload}
        }
        case "STOCK_NOT_AVAILABLE":{
            return { ...state, allProducts : state.allProducts.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }else{
                    return{...ele}
                }
            })}
        }
        case 'STOCK_AVAILABLE' : {
            return {...state, allProducts: state.allProducts.map((ele)=>{
                if(ele._id === action.payload._id){
                    return{...ele, ...action.payload}
                }else{
                    return{...ele}
                }
            })}
        }
        case "ADD_PRODUCTS" : {
            console.log('proRDX',action.payload)
            //get , Array
            return {...state, allProducts : [ ...state.allProducts, action.payload] }
        }
        case "ADD_ALL_PRODUCTS" : {
            return {...state, allProducts : action.payload }
        }
        case 'EDIT_PRODUCT' :{
            return {...state, allProducts : state.allProducts.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })}
        }
        case 'PRODUCT_DELETE' : {
            return {...state, allProducts : state.allProducts.filter(ele => ele._id != action.payload)}
        }
        case 'SERVER_ERRORS' : {
            return {...state, serverErrors : [...state.serverErrors, action.payload]}
        }
        // case 'LOGOUT_MYPRODUCTS' : {
        //     return {...state, allProducts:[] }
        // }
        default :{
            return {
                ...state
            }
        }
    }
}