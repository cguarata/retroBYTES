import React from 'react'
import Products from '../componentes/products/Products'
import { Slideshow } from '../componentes/slideshow/slideshow'
import { toast } from "react-toastify";

const Home = () => {
const ProductsList = async () => {
    const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products`,
        {
            method: "Post",
            headers:{
                //Authorization: token,//
            },
        }
        )
        if (res.ok) {
            ProductsList(true);
        } else {
            const error = await res.json();
            toast.error(error.menssage);
        }
    };
    
        return (
            <main className="home-container">
                <Slideshow></Slideshow>
                <Products></Products>
            </main>
        )
    };
    
export default Home