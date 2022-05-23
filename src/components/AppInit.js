import SelectMovie from "./select-movie/SelectMovie";
import SelectTime from "./select-time/SelectSession";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectSeats from "./seats/SelectSeats";
import SuccessScreen from "./success-screen/SuccessScreen";
import React from 'react'
import NavBar from "./NavBar";

export default function AppInit(){
    return(
       <div className="main-container">
            
           <BrowserRouter>
           <NavBar />
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
