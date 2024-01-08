import { useDispatch, useSelector } from "react-redux";
import { fetchCategories,fetchItems, isloaded } from "../../features/slices/itemsSlice";
import './categories.css';
import { Link } from "react-router-dom";
import { useState } from "react";

function Categories(){
    const isCategoryLoaded = useSelector((state)=>state.items.isCategoryLoaded)
    const isItemsLoaded = useSelector((state)=>state.items.isItemsLoaded)
    const {categories,items}=useSelector((state)=>state.items)
    // const [selectedBtn,setSelectedBtn]=useState("ALL")
    const selectedBtn = useSelector((state)=>state.items.selectedCategory)
    const dispatch=useDispatch()

    if(!isCategoryLoaded){
        fetchCategories(dispatch)
        fetchItems(dispatch,'')
    }
    return(
        <div className="list-main">
            <div className="categories-main-1">
                {!isCategoryLoaded ? <div className="loading">Loading...</div>:
                        <div className="categories-main"><button className={selectedBtn===''? "category-btn selected":"category-btn"} disabled={selectedBtn===''} onClick={()=>{dispatch(isloaded());fetchItems(dispatch,'')}}>ALL</button>
                        {categories.map((item, idx) => {
                            return <button key={idx} className={selectedBtn===item ? "category-btn selected":"category-btn"} disabled={selectedBtn===item} onClick={()=>{dispatch(isloaded());fetchItems(dispatch,item)}}>{(item.toUpperCase())}</button>
                    })
                }</div>}
            </div>
            <div className="items-main">
                {!isItemsLoaded ? <div className="loading">Loading...</div>:items.map((item,idx) => {
                    return <div key={idx} className="item-card">
                        <div style={{padding:'5px'}}><div className="item-img"
                            style={{
                                backgroundImage:'url('+item.image+')'
                            }}>
                        </div></div>
                        <div className="item-details">
                        <div className="item-title"><Link to={"/item"} state={item}>{item.title}</Link></div>
                        <div className="item-descript">{item.description}</div>
                        <div className="item-price">${item.price}</div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Categories;