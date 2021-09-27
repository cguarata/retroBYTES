import React from "react";
import styled from "styled-components";
import MainLogoImg from "../../../assets/images/retrobytes.svg";
import { Link } from 'react-router-dom';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 100px;
  height: 150px;
  margin: 2rem 0 2rem 3rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h2`
  font-family: "KatahdinRound-Bold";
  font-size: 1.8rem;
  text-transform: uppercase;
  margin: 0;
  margin-left: 1rem;
  color: #222;
  font-weight: 500;
`;

export function Logo(props) {
  return (
    <LogoWrapper>
      <LogoImg>
      <Link to="/">
        <img src={MainLogoImg} alt="Retrobytes logo" />
</Link>
      </LogoImg>
      <LogoText>Don´t you forget about me </LogoText>
    </LogoWrapper>
  );
}
