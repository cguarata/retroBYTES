import React from 'react'
import Products from '../componentes/products/Products'
import { Slideshow } from '../componentes/slideshow/slideshow'


const Home = () => {
    return (
        <main className="home-container">
            <Slideshow></Slideshow>
            <Products></Products>
        </main>
    )
}

const ProductsList = async () => {
    const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/entries`,
        {
            method: "Post",
            headers:{
                //Authorization: token,//
            },
        }
    )
};


export default Home