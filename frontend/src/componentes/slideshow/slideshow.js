import React,{useRef, useEffect} from 'react'
import img1 from "../../img/1.jpg"
import img2 from "../../img/2.jpg"
import img3 from "../../img/3.jpg"
import img4 from "../../img/4.jpg"
import { ReactComponent as FlechaIzquierda } from '../../img/izq.svg'
import { ReactComponent as FlechaDerecha } from '../../img/der.svg'


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

