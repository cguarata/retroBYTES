import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
// import {Logo} from "./../logo";
import { Accessibility } from "./accessibility";
import { DeviceSize } from "../../responsive";
import { NavLinks } from "./navLinks";
import { MobileNavLinks } from "./mobileNavLinks";
import {SearchBar} from "../search/searchBar";
import "normalize.css/normalize.css";

const NavBarContainer = styled.div`
//   width: 100vw;
  height: 80px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  background-color: white;
//   padding: 0 1.5em;
`;

const LeftSection = styled.div `
    display: flex;
    padding: 0 0 0 25px;
`;

const MiddleSection = styled.div `
    display: flex;
    flex: 2;
    flex-flow: column;
    height: 100%;
    justify-content: center;
    // padding:0 -10px 0 0;

`;  

const RightSection = styled.div `
    display: inline-flex;
    flex-direction: row;
    padding: 0 40px 0 0;
    flex-flow: wrap;
`;

export function Navbar(props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return <NavBarContainer>
        <LeftSection>
       
        </LeftSection>
       
        <MiddleSection>
        {!isMobile && <NavLinks />}
        {isMobile && <SearchBar />}
        </MiddleSection>
        <RightSection>
        {!isMobile && <Accessibility />}
        {isMobile && <MobileNavLinks />}
      </RightSection>
    </NavBarContainer>

}