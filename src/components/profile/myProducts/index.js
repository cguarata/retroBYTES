import { Box } from "@mui/system";
import Typography from "@material-ui/core/Typography";

function MyProducts() {
  return (
    <>
      <Typography
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        Mis productos
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        minWidth="60vh"
        sx={{
          "& > :not(style)": { m: 3, width: "80ch" },
        }}
      >
      </Box>
    </>
  );
}

export default MyProducts;

// import PhotosSlider from "../PhotosSlider";

// const EditEntryForm = ({ id, place, description, photos, setRefetchEntry }) => {
//   const [newPlace, setNewPlace] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [token] = useUserTokenContext();
//   const history = useHistory();

//   const editEntry = async (e) => {
//     e.preventDefault();

//     const newEntry = {
//       place: newPlace || place,
//       description: newDescription || description,
//     };

//     const res = await fetch(
//       `${process.env.REACT_APP_BACKEND_URL}/entries/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newEntry),
//       }
//     );

//     if (res.ok) {
//       history.go();
//     } else {
//       const error = await res.json();
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
//       <form className="edit_entry_form form" onSubmit={editEntry}>
//         <div className="input_container">
//           <label htmlFor="edit_entry_form_place">Place</label>
//           <input
//             id="edit_entry_form_place"
//             name="edit_entry_form_place"
//             value={newPlace}
//             onChange={(e) => {
//               setNewPlace(e.target.value);
//             }}
//             placeholder={place}
//           />
//         </div>
//         <div className="input_container">
//           <label htmlFor="edit_entry_form_description">Description</label>
//           <input
//             id="edit_entry_form_description"
//             name="edit_entry_form_description"
//             value={newDescription}
//             onChange={(e) => {
//               setNewDescription(e.target.value);
//             }}
//             placeholder={description}
//           />
//         </div>

//         {photos && (
//           <PhotosSlider
//             entryId={id}
//             entryPhotos={photos}
//             entryPlace={place}
//             token={token}
//             setRefetchEntry={setRefetchEntry}
//             isEditable
//           />
//         )}

//         <input type="submit" value="Editar entrada" />
//       </form>
//     </>
//   );
// };

// export default EditEntryForm;
