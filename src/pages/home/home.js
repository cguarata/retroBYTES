// import './App.css';
// import { Navbar } from "../components/navbar";
// import { Head } from "../components/header";
import Slides from "../../components/commons/main_slider";
import Footer from "../../components/commons/footer";
import ListProducts from "../../components/products/products"

// import Main from "../components/main";
// import { Home } from "@material-ui/icons";
// import { Slideshow } from "./components/commons/slideshow"

function Home() {
  return (

      <>
      <Slides />
      <ListProducts />
      <Footer />
      </>
    
    

  );
}

export default Home;
