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

export default Home