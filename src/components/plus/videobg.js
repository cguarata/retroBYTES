import VideoBg from "reactjs-videobg";
import ogg from "./videos/Neon.ogg";
import webm from "./videos/Neon.webm";
import mp4 from "./videos/Neon.mp4";
import poster from "./img/poster.jpg";
import "./styles.css";

function VideoBkg() {
    return (
      <div className="mediaV">
        <VideoBg poster={poster}>
          <VideoBg.Source src={ogg} type="video/ogg" />
          <VideoBg.Source src={webm} type="video/webm" />
          <VideoBg.Source src={mp4} type="video/mp4" />
        </VideoBg>
      </div>
    );
  }

  export default VideoBkg;