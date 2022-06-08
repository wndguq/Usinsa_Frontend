import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import NotFound from "../NotFound";
import Join from "./Join";
import SignIn from "./SignIn";
import UserName from "./find/UserName";
import Password from "./find/Password";
import ResetPasswd from "./ResetPasswd";

function Login(){

    return(
        <div className="member-join">
            <Routes>
                    <Route path="/login" element={<SignIn/>}></Route>
                    <Route path="/join" element={<Join/>}> </Route> 
                    <Route path="/find/username" element={<UserName/>}> </Route> 
                    <Route path="/find/password" element={<Password/>}> </Route> 
                    <Route path="/update/password/:code" element={<ResetPasswd/>}> </Route> 
                <Route path="/*" element={<NotFound/>}></Route> 
            </Routes>          
        </div>
    )
}

export default Login