import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        count:0,
        cartItems:[]
    },
    reducers:{
        addToCart(state,action){
            state.count+=parseInt(action.payload.quantity)
            state.cartItems.push({...action.payload})
        },
        removeFromCart(state,action){
            // console.log(action.payload.removeditem)
            state.count-=action.payload.removeditem[0].quantity
            state.cartItems=action.payload.items
        },
        updateQty(state,action){
            let oldqty=0
            let quantity=action.payload.qty===undefined ? action.payload.inpVal:action.payload.qty
            console.log(quantity)
            state.cartItems.map((item)=>{
                console.log(action.payload)
                if(item.id===action.payload.i.id){
                    oldqty=item.quantity
                    item.quantity=parseInt(quantity)
                }
            })
            state.count+=parseInt(quantity-oldqty)
        }
    }
})

export const { addToCart,removeFromCart,updateQty } = cartSlice.actions
export default cartSlice.reducer