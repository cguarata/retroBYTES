// import { useState } from "react";
// import { useParams } from "react-router";

// const ProductPage = () => {
//     const { id } = useParams();
//     const [refetchProduct, setRefetchProduct] = useState(false);
//     const [products] = useProduct(id, refetchProduct, setRefetchProduct);
//     const [isEditable, setIsEditable] = useState(false);
  
//     return (
  //     <div className="products_page page">
  //       {Object.values(products).length > 0 &&
  //         (!isEditable ? (
  //           <Products
  //             id={product.id}
  //             name={product.place}
  //             date={product.date}
  //             description={product.description}
  //             photos={product.photos}
  //             ownerId={product.user_id}
  //             userName={product.user_name}
  //             userAvatar={product.user_avatar}
  //             userEmail={product.user_email}
  //             setIsEditable={setIsEditable}
  //           />
  //         ) : (
  //           <>
  //             <EditEntryForm
  //               id={product.id}
  //               place={entry.place}
  //               description={entry.description}
  //               photos={entry.photos}
  //               setRefetchEntry={setRefetchProduct}
  //             />
  //             <FontAwesomeIcon
  //               className="go_back"
  //               icon={faArrowAltCircleLeft}
  //               onClick={() => setIsEditable(false)}
  //             />
  //           </>
  //         ))}
  //     </div>
  //   );
//   // };
  
//   export default ProductPage;
  