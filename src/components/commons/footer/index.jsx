import styled from "styled-components";
import {
  Box,
  Container,
  Row,
  Column,
  Heading,
} from "./FooterStyles";
import MainLogoImgH from "../../../assets/images/retrobytes_h.png";
import CardiffLogo from "../../../assets/brands/Cardiff Electric.svg";
import hooliLogo from "../../../assets/brands/hooli.svg";
import MagnavoxLogo from "../../../assets/brands/Magnavox_Odyssey_Logo 1.svg";
import PiedPiper from "../../../assets/brands/pied piper.svg";
import AtariLogo from "../../../assets/brands/Atari_games_logo 1.svg";
import ByteLogo from "../../../assets/brands/Byte Magazine.svg";
import MrFusionLogo from "../../../assets/brands/MrFusion.svg";
import HackABossLogo from "../../../assets/brands/HackBoss.svg";
// import BackRetro from "../../../assets/brands/Retrobytes_back_footer.svg";

import { Link } from "react-router-dom";

const LogoImg = styled.div`
  width: 200px;
  margin: 0rem 0 2rem 0rem;
  img {
    width: 80%;
    height: 80%;
  }
`;

const styles = {
    rbContainer: {
      height: '100%',
      backgroundImage: `url(${"static/src/img/foot.svg"})`
      
    }
};

const Footer = () => {
  return (
    <Box>
      <Container>
        <LogoImg>
          <Link to="/">
            <img src={MainLogoImgH} alt="Retrobytes logo" />
          </Link>
        </LogoImg>
        <Row>
          <Column>
            <Heading>
              <Link to="/">
                <img src={AtariLogo} width="30%" alt="Atari" />
              </Link>
            </Heading>

            <Link to="/">
              <img src={MagnavoxLogo} width="60%" alt="Odyssey" />
            </Link>
          </Column>
          <Column>
            <Heading>
              <Link to="/">
                <img src={ByteLogo} width="60%" alt="Byte" />
              </Link>
            </Heading>

            <Link to="/">
              <img src={MrFusionLogo} width="60%" alt="Mr.Fusión" />
            </Link>
          </Column>
          <Column>
            <Heading>
              {" "}
              <Link to="/">
                <img src={CardiffLogo} width="70%" alt="Cardiff ELectric" />
              </Link>
            </Heading>
            <Link to="/">
              <img src={PiedPiper} width="50%" alt="Pied Piper" />
            </Link>
          </Column>
          <Column>
            <Heading>
              <Link to="/">
                <img src={hooliLogo} width="60%" alt="Hooli" />
              </Link>
            </Heading>

            <Link
              to={{ pathname: "https://www.hackaboss.com/" }}
              target="_blank"
            >
              <img src={HackABossLogo} width="70%" alt="Hack a Boss" />
            </Link>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
