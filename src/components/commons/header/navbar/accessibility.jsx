import styled from "styled-components";


import './style.css'

const AccessibilityContainer = styled.div`
  display: flex;
  margin-left:0px;

`;

const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 2em;
  color: #fff;
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  border: 2px solid #00c9ff;
  border-radius: 20px;
  background-color: #2a9d8f;
  // background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #264653;
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #222;
  font-family: 'Oswald', sans-serif;
  font-size: 1,5rem;
  font-weight: 600;
  border-radius: 20px;
  background-color: transparent;
  border: 2px solid #00c9ff;
  transition: all 240ms ease-in-out;
  cursor: pointer;
  &:visited {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
  }
  &:active {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
  }
  &:hover {
    color: #fff;
    background-color: #264653;
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;


export function Accessibility(props) {
  return (
    <AccessibilityContainer>
      <RegisterButton
       onClick={(e) => {
        e.preventDefault();
        window.location.href='/register';}}


      >Registro</RegisterButton>
      <LoginButton
      onClick={(e) => {
        e.preventDefault();
        window.location.href='/login';
        }}
      >
          Ingresar</LoginButton>
    </AccessibilityContainer>
  );
}
