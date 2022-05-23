import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import NotFound from "../NotFound";
import Join from "./Join";
import SignIn from "./SignIn";

function Login( {match, path} ){

    return(
        <div>
            <Routes>
                <Route path="/login" element={<SignIn/>}></Route>
                <Route path="/join" element={<Join/>}> </Route> 
                <Route path="/*" element={<NotFound/>}></Route> 
            </Routes>          
        </div>
    )
}

export default Login