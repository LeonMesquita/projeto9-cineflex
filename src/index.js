import ReactDOM from "react-dom";
import AppInit from "./components/AppInit";
import './reset.css';
import './styles.css';



function AppBody(){
    return(
           <AppInit />
    );
}

const app = AppBody();
ReactDOM.render(app, document.querySelector(".root"));