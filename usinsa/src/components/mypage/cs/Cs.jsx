import React from "react";
import { Routes, Route } from 'react-router-dom'
import NotFound from "../../NotFound";
import Counsel from "./Counsel";
import CounselDtail from "./CounselDtail";
import CounselWrite from "./CounselWrite";

function Cs(){

    return(
        <>
            <Routes>
                <Route path="/counsel" element={<Counsel/>}></Route>
                <Route path="/Counsel/write" element={<CounselWrite/>}> </Route>      
                <Route path="/counsel/detail/:id" element={<CounselDtail/>}></Route>                    
                <Route path="/*" element={<NotFound/>}></Route> 
            </Routes>
        </>
    )
}

export default Cs