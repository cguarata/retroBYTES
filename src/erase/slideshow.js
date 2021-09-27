import React,{useRef, useEffect} from 'react'
import img1 from "https://unsplash.com/photos/woVoM7dKGTk"
import img2 from "https://unsplash.com/photos/woVoM7dKGTk"
import img3 from "https://unsplash.com/photos/woVoM7dKGTk"
import img4 from "https://unsplash.com/photos/woVoM7dKGTk"
import { ReactComponent as FlechaIzquierda } from 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Antu_arrow-right.svg'
import { ReactComponent as FlechaDerecha } from 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Antu_arrow-right.svg'


export const Slideshow = () => {

const slideshow=useRef(null)

const next =()=>{
    if(slideshow.current.children.length > 0){
        const primerElemento = slideshow.current.children[0];
        const slideSize = slideshow.current.children[0].offsetWidth;
        slideshow.current.style.transition = `300ms ease-out all`;
        slideshow.current.style.transform = `translateX(-${slideSize}px)`
        
        const transicion=()=>{
        slideshow.current.style.transition='none'
        slideshow.current.style.transform=`translateX(0)`
        slideshow.current.appendChild(primerElemento)
        slideshow.current.removeEventListener('transitionend', transicion)
        }
        slideshow.current.addEventListener('transitionend', transicion)
    }
}

const preview =()=>{
    if(slideshow.current.children.length > 0){
        const index = slideshow.current.children.length - 1;
        const ultimoElemento = slideshow.current.children[index];
        slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild)
     
        slideshow.current.style.transition='none'
        const slideSize = slideshow.current.children[0].offsetWidth;
        slideshow.current.style.transform = `translateX(-${slideSize}px)`
        
        setTimeout(()=>{
            slideshow.current.style.transition = `300ms ease-out all`;
            slideshow.current.style.transform = `translateX(0)`
    
        }, 30)
        
        
    }
}
useEffect(() => {
    setInterval(()=>{
        next();
    }, 5000)}, [])


    return (
        <>
        <p className="slideshow-title">Productos Destacados</p>
        <div className="slideshow-container">
            <div className="slideshow-wrap" ref={slideshow}>
                <div className="slide">
                     <a href="www.google.com">
                        <img src={img1} alt=""/>
                    </a>
                    <h2 className="slide-title">Titulo del Producto</h2>
                </div>
                <div className="slide">
                    <a href="www.google.com">
                        <img src={img2} alt=""/>
                    </a>
                    <h2 className="slide-title">Titulo del Producto</h2>
                </div>
                <div className="slide">
                    <a href="www.google.com">
                        <img src={img3} alt=""/>
                    </a>
                    <h2 className="slide-title">Titulo del Producto</h2>
                </div>
                <div className="slide">
                    <a href="www.google.com">
                        <img src={img4} alt=""/>
                    </a>
                    <h2 className="slide-title">Titulo del Producto</h2>
                </div>
            </div>
            <div className="controls">
                <button className="control-izq" onClick={preview}><FlechaIzquierda></FlechaIzquierda></button>
                <button className="control-der" onClick={next}><FlechaDerecha></FlechaDerecha></button>
            </div>
        </div>
        </>
    )
}


export default Slideshow