import  { Puff } from "react-loader-spinner";
import styles from "./Loader.module.scss";

const ReactLoader = () => (
    <div className={styles.Loader}>
        <Puff type="Grid" color="#4682B4" height={100} width={100} />
    </div>
);

export default ReactLoader;