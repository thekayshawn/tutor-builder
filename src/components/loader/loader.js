import styles from "./loader.module.scss";
import LoaderImg from "../../assets/gifs/loader.gif";

const Loader = ({ isInline = false, className = "" }) => (
  <div
    className={`${className} ${
      isInline ? styles["loader-inline"] : styles.loader
    }`}
  >
    <img src={LoaderImg} alt="Loading..." width="90px" height="65px" />
  </div>
);

export default Loader;
