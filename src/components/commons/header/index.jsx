// import "./header.css";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Logo } from "../logo";
// import {SearchBar} from "../header/search/searchBar";
import { DeviceSize } from "../responsive";
import "./styles.css";
import { MenuTop } from "./top";



const Container = styled.div`
//   width: 98vw;
  height: 180px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  background-color: white;
//   padding: 0 1.5em;
`;

const LeftSection = styled.div `
    display: flex;
    padding: 0 0 0 0px;
`;

const MiddleSection = styled.div `
    display: flex;
    flex: 2;
    flex-flow: column;
    height: 100%;
    justify-content: center;
    padding:0 0 0 2rem;

`;  

const RightSection = styled.div `
    display: inline-flex;
    flex-direction: row;
    padding: 0 1em 0 0;
    flex-flow: wrap;
`;

export function Head(props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return <Container>
        <LeftSection>
            <Logo />
        </LeftSection>
       
        <MiddleSection>
        {!isMobile}
        {/* {!isMobile && <SearchBar />} */}
        </MiddleSection>
        <RightSection>
        {!isMobile && <MenuTop />}
        {/* <div class="top_nav">
           <ul>
              <li class="">
              <a href="#">
              <i class="icon-cart"></i><span>Favoritos</span>
              </a>
              </li>
              <li class="">
              <a href="">
                <i class="icon-heart-o"></i>Mis artículos                                             </a>
                </li>
                <li class="">
              <a href="#">
                <i class="icon-heart-o"></i>Carrito                                           </a>
                </li>
                <li class="">
              <a href="#">
                <i class="icon-heart-o"></i>Notificaciones                                             </a>
                </li>
                <li class="nav-item m-r-0"><a href="javascript:void(0)" class="btn btn-md btn-custom btn-sell-now m-r-0" data-toggle="modal" data-target="#loginModal">Profile</a></li>
                 </ul>
                            </div> */}
                            
      </RightSection>
    </Container>

}



// export function Head() {
//   return (
//     <div className="App">
//       <Logo />
//       <SearchBar />
//     </div>
//   );
// }


