import React, { useState } from "react";
import styled from "styled-components";
import { Accessibility } from "./accessibility";
import { MenuToggle } from "./menuToggle";

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 99;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 2rem;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 181px;
  left: 0px;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0.3em 2em;
  color: #222;
  font-weight: 500;
  font-size: 40px;
  display: flex;
  margin-bottom: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

const Marginer = styled.div`
  height: 2em;
`;

const Container = styled.div`
  padding: 10em;
`;

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
          <LinkItem>
            <Link href="#">Sobre RetroBytes</Link>
          </LinkItem>
          <LinkItem>
            <Link href="#">Como funciona</Link>
          </LinkItem>
          <LinkItem>
            <Link href="#">Explorar</Link>
          </LinkItem>
          <LinkItem>
            <Link href="#">Contacto</Link>
          </LinkItem>
          <Marginer />
          <Container>
          <Accessibility />
          </Container>
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}