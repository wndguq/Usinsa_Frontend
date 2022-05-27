import React, {useLayoutEffect} from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Cart from "./Cart";
import Likes from "./Likes";
import MypageMain from "./MypageMain";
import RecentlyViewed from "./RecentlyViewed";
import MypageSideBar from "./MypageSideBar";
import NotFound from "../NotFound";
import UserInfoBar from "./UserInfoBar";

import { useSelector } from "react-redux";

function Mypage(){

    const { isValidLogin } = useSelector(state => state.isValidLogin);

    return(
        <div className="mypage-container" >
            {!isValidLogin ? <Navigate replace to="/login/login" /> : ''}
            <UserInfoBar/>
            <div className='main-container' >
                <MypageSideBar/>
                <Routes>
                    <Route path="/likes" element={<Likes/>}></Route>
                    <Route path="/cart" element={<Cart/>}> </Route> 
                    <Route path="/recentlyViewed" element={<RecentlyViewed/>}> </Route> 
                    <Route path="/" element={<MypageMain/>}></Route>                 
                    <Route path="/*" element={<NotFound/>}></Route> 
                </Routes>          
            </div>
        </div>
    )
}

export default Mypage