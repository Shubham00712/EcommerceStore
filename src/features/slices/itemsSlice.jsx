import { createSlice } from "@reduxjs/toolkit";

export const fetchCategories=(dispatch)=>{
    const categoriesurl='https://fakestoreapi.com/products/categories'
    fetch(categoriesurl)
    .then((response)=>response.json())
    .then(obj=>{
        // console.log(obj)
        dispatch(addCategories(obj))
    })
    .catch((error)=>console.log(error))
}

export const fetchItems=(dispatch,item)=>{
    let itemsurl=''
    if(item==='')
        itemsurl='https://fakestoreapi.com/products'
    else
        itemsurl='https://fakestoreapi.com/products/category/'+item
    console.log(itemsurl)
    fetch(itemsurl)
    .then((response)=>response.json())
    .then(obj=>{
        dispatch(addItems({obj,item}))
    })
    .catch((error)=>console.log(error))
}

export const itemsSlice = createSlice({
    name:'items',
    initialState:{
        isCategoryLoaded:false,
        isItemsLoaded:false,
        categories:[],
        items:[],
        selectedCategory:''
    },
    reducers:{
        addCategories(state,action){
            state.isCategoryLoaded=true
            state.categories=action.payload
            // console.log('state',state.categories)
        },
        addItems(state,action){
            state.isItemsLoaded=true
            state.items=action.payload.obj
            state.selectedCategory=action.payload.item
        },
        isloaded(state,action){
            // state.isCategoryLoaded=false
            state.isItemsLoaded=false
        }
    }
})

export const { addCategories,addItems,isloaded } = itemsSlice.actions
export default itemsSlice.reducer