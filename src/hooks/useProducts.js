import { useState, useEffect } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`);

      if (res.ok) {
        const body = await res.json();
        setProducts(body.data);
      }
    };

    fetchProducts();
  }, []);

  return [products, setProducts];
};

export default useProducts;
