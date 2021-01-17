
import {SET_PRODUCT_CATALOG_ALL, CATEGORIES, SET_PRODUCT_CATALOG_SEARCH, SET_PRODUCT_CATALOG_CATEGORY, PRODUCT_INFO, RATE_PROMEDIO, VER_REVIEW, GET_ALL_USER_ORDER, VER_REVIEW_USER, GET_REVIEW, USER_INFO, USER_PHOTO, GET_NUM_PRODUCTS} from '../actions'


const initialState = {
    productsCatalog : [],
    productInfo : {},
    category:'', 
    activeUser: {},
    categories:[],
    ratePromedio: null,
    verReview: [],
    getAllUserOrder: [],
    verReviewUser: [],
    getReview: {}, 
    opencart: false,  
    numProducts: null    
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCT_CATALOG_SEARCH:
            return {
                ...state,
                category:'',
                productsCatalog: action.payload
            }
        case SET_PRODUCT_CATALOG_ALL:
            return {
                ...state,
                category:'',
                productsCatalog: action.payload
            }

        case SET_PRODUCT_CATALOG_CATEGORY:
            return {
                ...state,
                productsCatalog: action.payload,
                category:action.cat
            }
        case PRODUCT_INFO:
            return {
                ...state,
                category:'',
                productInfo: action.payload
            }
        case USER_INFO:
            return{
                ...state,
                activeUser:action.payload
            }
        case USER_PHOTO:{
            return{
                ...state,
                activeUser:action.payload
            }
        }
        case CATEGORIES:{
            return{
                ...state,
                categories:action.payload
            }
        }

        case RATE_PROMEDIO:
            let contador = 0;
            action.payload.map(review => {contador = contador + review.rate *1})
            contador = contador / action.payload.length;
            return {
                ...state,
                ratePromedio: contador
            }
        case VER_REVIEW:
            return {
                ...state,
                verReview: action.payload
            }
        case GET_ALL_USER_ORDER:
            return{
                ...state,
                getAllUserOrder: action.payload

            }
        case VER_REVIEW_USER:
            return{
                ...state,
                verReviewUser: action.payload

            }
        case GET_REVIEW:
            return{
                ...state,
                getReview: action.payload
            }
        case 'OPENCART':
             return{
                ...state,
                opencart: action.boolean
            }
         
        case GET_NUM_PRODUCTS:
            return{
                ...state,
                numProducts: action.payload
            }
        
     
        default:
            return state
    }
}


export default rootReducer;