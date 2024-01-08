import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sliderData } from "../../assets/sliderdata";
import { nextslide,prevslide,dotslide } from "../../features/slices/sliderSlice";
import nextArrow from '../../assets/right-arrow.png';
import prevArrow from '../../assets/left-arrow.png';
import './slider.css';

function Slider(){

    const slideIndex=useSelector((state)=>state.slider.value);
    const dispatch = useDispatch()

    useEffect(()=>{
        const changeSlide = () =>{
            dispatch(nextslide(slideIndex+1))
        }

        const interval=setInterval(changeSlide,2500);

        return ()=>clearInterval(interval)
    })

    const filteredContent=sliderData.filter((item)=>parseInt(item.id)===slideIndex)
    const bgImage='url("'+filteredContent[0].img+'")'
    return(
        <div className="main-slider">
            <div className="slide-btn" onClick={()=>dispatch(prevslide(slideIndex-1))}>
                <img src={prevArrow} alt="prev" />
            </div>
            <div className="slider-content" 
                style={{
                    backgroundImage:bgImage,
                    backgroundRepeat:"no-repeat",
                    backgroundSize:"contain",
                    backgroundPosition:"center"
                }}>
                <h2>{filteredContent[0].text}</h2>
                <div className="dot-nav">
                    {sliderData.map((item,idx)=>
                        <span
                            key={idx} 
                            style={{backgroundColor:slideIndex===idx ? 'gray':'white'}}
                            onClick={()=>dispatch(dotslide(idx))}
                        ></span>)}
                </div>
            </div>
            <div className="slide-btn" onClick={()=>dispatch(nextslide(slideIndex+1))}>
                <img src={nextArrow} alt="next" />
            </div>
        </div>
    )
}

export default Slider;