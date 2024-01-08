import { useState } from 'react';
import cartLogo from '../../assets/cart.png';
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQty } from '../../features/slices/cartSlice';

function Navbar(){
    const [isCartOpened,cartToggle] = useState(false)
    const cart = useSelector((state)=>state.cart)
    const isCartEmpty=(cart.count<=0)
    const dispatch=useDispatch()
    console.log(cart)

    const handleCart = (e) =>{
        if(isCartOpened && !e.target.closest('.cart-main')){
        cartToggle(false)
        cart.cartItems.map((item)=>item.quantity===0 ? removeItem(item):'')}
    }

    const removeItem = (i) => {
        let items=cart.cartItems.filter((obj)=>obj.id!==i.id)
        let removeditem=cart.cartItems.filter((obj)=>obj.id===i.id)
        dispatch(removeFromCart({items,removeditem}))
    }
    const updateQuantity = (i,qty) => {
        dispatch(updateQty({i,qty}))
    }
    const handleValueChange = (i,e) =>{
        let inpVal=e.target.value.replace(/[^0-9]/g,'')
        // console.log(inpVal)
        if(inpVal==='')inpVal=0
        else if(parseInt(inpVal)>=200)inpVal=200
        dispatch(updateQty({i,inpVal}))
    }
    return(
        <div>
        {isCartOpened && 
        <div className='overlay-cart' onClick={(e)=>handleCart(e)}>
        <div className='cart-main'>
        {cart.cartItems.length>0 ? cart.cartItems.map((item,idx)=>{
        return <div className='cart-item-main' key={idx}>
            <div className="cart-item-img">
                <img src={item.image} alt='item-image'/>
            </div>
            <div className="cart-item-details">
            <div className="cart-item-title">{item.title}</div>
            <div className="cart-item-descript">{item.description}</div>
            <div className='item-qty-main'>
                <button className='decrease' onClick={()=>updateQuantity(item,item.quantity-1)} disabled={item.quantity<=1}>-</button>
                <input className='cart-item-qty' type='text' value={item.quantity} min={1} onChange={(e)=>handleValueChange(item,e)}/>
                <button className='increase' onClick={()=>updateQuantity(item,item.quantity+1)} disabled={item.quantity>=200}>+</button>
            </div>
            <div className='max-qty'>Max Quantity: <b>200*</b></div>
            <div className="cart-item-price">${(item.quantity*item.price).toFixed(2)}</div>
            <div className="remove ">
                <button onClick={()=>removeItem(item)}>Remove</button>
            </div>
            </div>
        </div>
            }):<div className='no-items'>No Items present in the cart!😞</div>}   
        </div>
        </div>}

        <div className="main-nav">
            <div className="nav-left"><h3>STORE</h3></div>
            <div className="nav-right" onClick={()=>cartToggle(isCartOpened===true? false:true)}>
                <div className='cart-logo'>
                    <img src={cartLogo} alt='cart-logo'/>
                    {isCartEmpty ? '':<span className={cart.count>20 ? 'cart-count-medium':'cart-count-small'}>{cart.count>20 ? '*':cart.count}</span>}
                </div>
                <span>Your cart</span>
            </div>
        </div>
        </div>
    )
}

export default Navbar;