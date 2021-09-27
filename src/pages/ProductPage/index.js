import React from 'react';
// import '../components/details/App.css';
import { useParams } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';


const Product = () => {
  const {id}=useParams()
  const [product]= useProduct(id)
  console.log({id,product})
  return(
    <div className="app">
      {
        
          <div className="details" key={product._id}>
            <div className="big-img">
              <img src={`${process.env.REACT_APP_BACKEND_URL}/${product.foto}`} alt={`foto de ${product.name}`}/>
            </div>

            <div className="box">
              <div className="row">
                <h2>{product.name}</h2>
                <span>${product.price}</span>
              </div>
              <p>{product.description}</p>
              <button className="cart">Comprar</button>

            </div>
          </div>
      }
    </div>
  );
};

export default Product;