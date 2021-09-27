import { useContext } from "react";
import { TokenContext } from "../Components/TokenContext";
import { Link } from "react-router-dom";
import { Avatar } from "../Components/AvatarProfile";
import { FileForm } from "../Components/FileForm";
import { ValorationUser } from "../Components/ValorationUser";
// import { UserProfilePersonal } from "../Components/UserProfilePersonal";
// import { ProductsUser } from "../Components/ProductsUser";
// import { ChatsUser } from "../Components/ChatsUser";
// import { HistoryUser } from "../Components/HistoryUser";
import { useProfile } from "../hooks/remoteHooks";

export const Perfil = ({ props }) => {
  const [token] = useContext(TokenContext);
  const [data] = useProfile(token);
  // const [section, setSection] = useState("Datos personales");
  const urlFileForm = "http://localhost:3000/api/v1/users/upload";
  const fileName = "profileImage";
  if (!data) return <></>;
  return (
    <>
      <div className="center">
        <div className="section-background">
          <AvatarProfile className="avatar-profile" />
          <FileForm url={urlFileForm} fileName={fileName} />
          {data.nickname}
          <ValorationUser idUser={data.id}></ValorationUser>
          <div>
            <Link className="button-all-page" to="/personalData">
              Datos Personales
            </Link>
            {/* <button onClick={setSection("Datos Personales")}>
            Datos Personales
          </button> */}
            <Link className="button-all-page" to={`/myProducts/${data.id}`}>
              Productos en Venta
            </Link>
            {/* <button onClick={setSection("Productos")}>Productos en Venta</button> */}
            <Link className="button-all-page" to="/myChats">
              Chats
            </Link>
            {/* <button onClick={setSection("Chats")}>Chats</button> */}
            <Link className="button-all-page" to="/history">
              Historial de Transacciones
            </Link>
            {/* <button onClick={setSection("Historial")}>
            Historial de Transacciones
          </button> */}
          </div>
        </div>
      </div>
    </>
  );
};