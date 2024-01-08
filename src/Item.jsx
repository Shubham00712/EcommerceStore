import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addToCart, removeFromCart } from './features/slices/cartSlice';
import backArrow from './assets/back.png'
import './item.css';

function Item() {
    const navigate=useNavigate();
    const item = useLocation().state;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    const flag = cart.cartItems.filter((obj) => obj.id === item.id)
    const [btntext, setbtntext] = useState(flag.length > 0 ? 'Remove' : 'Add to Cart')
    const [cnt, setcnt] = useState(flag.length > 0 ? flag[0].quantity : 1)

    const addItem = (i, c) => {
        if (btntext === 'Remove') {
            let items = cart.cartItems.filter((obj) => obj.id !== i.id)
            let removeditem = cart.cartItems.filter((obj) => obj.id === i.id)
            dispatch(removeFromCart({ items, removeditem }))
        }
        else {
            i.quantity = c
            dispatch(addToCart(i))
        }
        setbtntext(btntext === 'Add to Cart' ? 'Remove' : 'Add to Cart')
    }

    const handleChange = (e) => {
        if (e.target.value === '') setcnt(1)
        let inpVal = e.target.value.replace(/[^0-9]/g, '')
        console.log(inpVal)
        if (parseInt(inpVal) >= 200)
            inpVal = 200
        setcnt(inpVal)
    }
    // console.log(cnt.length)

    return (
        <div className='single-item-main'>
            <div className='back-item' onClick={()=>navigate(-1)}><img src={backArrow} alt='back-arrow'/>Back</div>
            <div className="single-item-img">
                <img src={item.image} alt='item-image' />
            </div>
            <div className="single-item-details">
                <div className="single-item-title">{item.title}</div>
                <div className="single-item-descript">{item.description}</div>
                <div className='qty-main'>
                    <button onClick={() => setcnt(cnt - 1)} disabled={cnt <= 1 || btntext === 'Remove'}>-</button>
                    <input className='item-qty' type='text' disabled={btntext === 'Remove'} value={cnt} onChange={(e) => handleChange(e)} />
                    <button onClick={() => setcnt(cnt === '' ? 1 : parseInt(cnt) + 1)} disabled={btntext === 'Remove' || cnt >= 200}>+</button>
                </div>
                <div className='max-qty'>Max Quantity: <b>200*</b></div>
                <div className="single-item-price">${(cnt * item.price).toFixed(2)}</div>
                <div className="atc">
                    <button className={btntext === 'Remove' || flag.length > 0 ? 'remove-btn' : 'additem-btn'} onClick={() => addItem(item, cnt)} disabled={cnt < 1}>{flag.length < 1 ? btntext : 'Remove'}</button>
                </div>
            </div>
        </div>
    )
}

export default Item;