import { useState, useEffect } from "react";

const useProduct = (id) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${id}`
      );

      if (res.ok) {
        const body = await res.json();
        setProduct(body.data);
      }
    };

    fetchProduct();

  }, [id]);

  return [product, setProduct];
};

export default useProduct;
