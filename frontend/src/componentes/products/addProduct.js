import { useState, useContext } from "react";

export const AddProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [place, setPlace] = useState("");
  const [manufactDate, setManufactDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const requestBody = {
      productName,
      price,
      place,
      manufactDate,
      category,
      description,
    };

  };
  return (
    <>
        <div className="center">
        <h1>Agrega un nuevo Producto</h1>
          <form onSubmit={handleCreateProduct}>
            <div class="txt_field">
                <input
                  id="product-name"
                  name="product-name"
                  required="required"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              <span></span>
              <label htmlFor="product-name">Nombre del Producto</label>
            </div>
            <div class="txt_field">
                <input
                  id="price"
                  name="price"
                  type="text"
                  required="required"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span></span>
                <label htmlFor="price">Precio</label>
            </div>
            <div class="txt_field">
                <input
                  id="place"
                  name="place"
                  required="required"
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
                <span></span>
                <label htmlFor="place">Ciudad</label>
            </div>
            <div class="txt_field">
                <input
                  id="manufact-date"
                  name="manufact-date"
                  required="required"
                  type="text"
                  value={manufactDate}
                  onChange={(e) => setManufactDate(e.target.value)}
                />
                <span></span>
                <label htmlFor="manufactDate">Año de Compra</label>
            </div>
            <div class="txt_field">
                <input
                  id="category"
                  name="category"
                  required="required"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <span></span>
                <label htmlFor="category">Categoría</label>
              </div>
              <div class="txt_field">
                <input
                  id="description"
                  name="description"
                  required="required"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  />
                <span></span>
                <label htmlFor="description">Descripción</label>
              </div>
  
            <button type="submit" value="Registro">
              Añadir producto
            </button>
          </form>
        </div>
     
      
    </>
  );
};