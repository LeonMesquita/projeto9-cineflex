import SelectMovie from "./select-movie/SelectMovie";
import SelectTime from "./select-time/SelectTime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectSeats from "./seats/SelectSeats";
import SuccessScreen from "./success-screen/SuccessScreen";
import React from 'react'
export default function AppInit(){
    return(
       <div className="main-container">
           <BrowserRouter>
                <div className="top-bar"><h1>CINEFLEX</h1></div>
                <Routes>
                    <Route path="/" element={<SelectMovie />}/>
                    <Route path="/sessions/:idMovie" element={<SelectTime />}/>
                    <Route path="/assentos/:idSessao" element={<SelectSeats />}/>
                    <Route path="/success/:idSessao" element={<SuccessScreen/>}/>
                </Routes>
           </BrowserRouter>
       </div>
    );
}

//                    
