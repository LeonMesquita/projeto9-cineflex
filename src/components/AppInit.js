import SelectMovie from "./select-movie/SelectMovie";
import SelectTime from "./select-time/SelectTime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function AppInit(){
    //<SelectMovie />
    return(
       <div className="main-container">
           <BrowserRouter>
                <div className="top-bar"><h1>CINEFLEX</h1></div>
                <Routes>
                    <Route path="/" element={<SelectMovie />}/>
                    <Route path="/sessions/:idMovie" element={<SelectTime />}/>
                </Routes>
           </BrowserRouter>
       </div>
    );
}