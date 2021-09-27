import React from "react";
import { render } from "react-dom";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
// import "./ps";
import "./slider-animations.css"
import "./styles.css";

const content = [
  {
    title: "Una explosión de pasado",
    description:
      "Encuentra tesoros del pasado reciente y descubre un universo infinito de recuerdos",
    button: "Más información",
    image: "../assets/hero/banner-1.jpg",
    user: "Jaly Mejias",
    userProfile: "../assets/profiles/profile2.png",
    url: "#"
  },
  {
    title: "Adiós a los lugares recónditos",
    description:
      "Ya no tendrás que recorrer garajes polvorientos y mercadillos desvencijados para encontrar ese pequeño tesoro retrotech",
    button: "Más información",
    image: "../assets/hero/banner-2.jpg",
    user: "Carlos Guarata",
    userProfile: "../assets/profiles/profile1.png",
    url: "#"
  },
  {
    title: "Artículos con historia",
    description:
      "Donde los nostálgicos de la tecnología conectan y crean comunidad",
    button: "Descúbrenos",
    image: "../assets/hero/banner-3.jpg",
    user: "Yanet Sanabria",
    userProfile: "../assets/profiles/profile3.png"
  },
  {
    title: "¿Que estás esperando?",
    description: "Forma parte de la retrocomunidad",
    button: "Regístrate",
    image: "../assets/hero/banner-4.jpg",
    user: "Hack a Boss",
    userProfile: "../assets/profiles/profile4.png"
  }
];

const Slides = () => (
  <div>
   
    <Slider className="slider-wrapper" autoplay={3000}>
      
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <a href={item.url} >

            <button>{item.button}
            </button>
            </a>
          </div>
          <section>
            <img src={item.userProfile} alt={item.user} />
            <span>
               <strong>{item.user}</strong>
            </span>
          </section>
        </div>
      ))}
    </Slider>
  </div>
);

export default Slides;
render(<Slides />, document.getElementById("root"));
