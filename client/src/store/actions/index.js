import authAxios from '../../axios'
export const SET_PRODUCT_CATALOG_SEARCH = "SET_PRODUCT_CATALOG_SEARCH";
export const SET_PRODUCT_CATALOG_ALL = "SET_PRODUCT_CATALOG_ALL";
export const SET_PRODUCT_CATALOG_CATEGORY = "SET_PRODUCT_CATALOG_CATEGORY";
export const PRODUCT_INFO = "PRODUCT_INFO";
export const USER_INFO = "USER_INFO"
export const USER_PHOTO = "USER_PHOTO"
export const CATEGORIES = "CATEGORIES"
export const RATE_PROMEDIO = 'RATE_PROMEDIO';
export const  VER_REVIEW = 'VER_REVIEW';
export const GET_ALL_USER_ORDER = 'GET_ALL_USER_ORDER';
export const VER_REVIEW_USER = 'VER_REVIEW_USER';
export const GET_REVIEW = 'GET_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW'
export const GET_NUM_PRODUCTS = 'GET_NUM_PRODUCTS';

export const setProductCatalogSearch = (search) => {
    return function (dispatch){
      return  authAxios.get('products/search/'+ search)
      .then((payload) => {
       dispatch({
           type: SET_PRODUCT_CATALOG_SEARCH,
           payload: payload.data
       })       
      })
      .catch((err)=> console.log(err))
    }
}

export const setProductCatalogAll = () => {
  return function (dispatch){
    return  authAxios.get('products')
    .then((payload) => {
     dispatch({
         type: SET_PRODUCT_CATALOG_ALL,
         payload: payload.data
     })
    })
    .catch((err)=> console.log(err) ) 
  }
}

export const setProductCatalogCategory = (cat) => {
  return function (dispatch){
    return  authAxios.get('products/category/'+cat)
    .then((payload) => {
     dispatch({
         type: SET_PRODUCT_CATALOG_CATEGORY,
         payload: payload.data,
         cat:cat,
     })
    })
    .catch((err)=> console.log(err) )  
  }
}

export const setProductInfo = (id) => {
  return function (dispatch){
    return  authAxios.get('products/'+id)
    .then((payload) => {
     dispatch({
         type: PRODUCT_INFO,
         payload: payload.data
     })
     
    })
    .catch((err)=> console.log(err) )
  }
}

export const setActiveUser = (id) => {
  return (dispatch) => {
    return authAxios.get(`users/me/${id}`)
    .then(payload => {
      dispatch({
          type: USER_INFO,
          payload: payload.data
      })
    })
    .catch((err)=> console.log(err) )
  }
}

export const updateUserPhoto = (id, form) => {  
  return (dispatch) => {
    return authAxios.post(`users/me/${id}`, form)
    .then(payload => {
      dispatch({
        type: USER_PHOTO,
        payload: payload.data
      })
    })
    .catch((e)=> console.log('error', e))
  }
}


export const ratePromedio = (productId) => {
  return function (dispatch){
    return authAxios.get('review/' + productId)
    .then((payload) => {
      dispatch ({
        type: RATE_PROMEDIO,
        payload: payload.data
      })
    })
    .catch((err)=> console.log(err) )
  }
}

export const verReview = (productId) => {
  return function(dispatch){
    return authAxios.get('/review/' + productId)
    .then((payload) => {
      dispatch({
        type: VER_REVIEW,
        payload: payload.data
      })
    })
    .catch((err)=> console.log(err) )
  }
}

export const verReviewUser = (userId) => {
  return function(dispatch){
    return authAxios.get('/review/user/' + userId)
    .then((payload) => {
      dispatch({
        type: VER_REVIEW_USER,
        payload: payload.data
      })
    })
    .catch((err)=> console.log(err) )
  }
}
    
export const getAllUserOrder=(userId) =>{
  return function(dispatch){
    return authAxios.get('orders/users/' + userId)
    .then(payload => {
      dispatch({
        type: GET_ALL_USER_ORDER,
        payload: payload.data
      })
    })
    .catch((err)=> console.log(err) )
  }
}

export const getReview=(reviewId) =>{
  return function(dispatch){
    return authAxios.get('review/search/'+ reviewId)
    .then(payload=>{
      dispatch({
        type: GET_REVIEW,
        payload: payload.data
      })
    })
    .catch((err)=> console.log(err) )
  }
}


export const deleteReview = (reviewId) => {
  return function (dispatch){
    return authAxios.delete('review/' + reviewId)
    .then(payload => {
      dispatch({
        type: DELETE_REVIEW,
        payload: payload.data
      })
    })
    .catch((err)=> console.log(err) )
  }
}

export const updateCategories = () =>{
  return (dispatch)=>{
  return authAxios.get('products/category')
  .then(payload => {
    dispatch({
      type: CATEGORIES,
      payload: payload.data
    })
  })
  .catch((err)=> console.log(err) )
  }
}

export const getNumProducts = (userId) =>{
  return (dispatch)=>{
    return authAxios.get('orders/users/' + userId + '/created') 
    .then(payload => {
      payload.data[0] && dispatch({
        type: GET_NUM_PRODUCTS,
        payload: payload.data[0].products.length
      })
    })
  }
}

export const openCart = (boolean) =>{
  return (dispatch)=>{
    dispatch({
      type: 'OPENCART',
      boolean: boolean
    })
  }
}

