import React, {useLayoutEffect} from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Cart from "./Cart";
import Likes from "./Likes";
import MypageMain from "./MypageMain";
import RecentlyViewed from "./RecentlyViewed";
import MypageSideBar from "./MypageSideBar";
import NotFound from "../NotFound";
import UserInfoBar from "./UserInfoBar";
import Cs from "./cs/Cs";
import { useSelector } from "react-redux";

function Mypage(){

    const { isValidLogin } = useSelector(state => state.isValidLogin);

    if(!isValidLogin){
        alert("로그인이 필요한 서비스입니다.");
        return (<Navigate replace to="/login/login" />)
    } 

    return(
        <div className="mypage-container" >
            <UserInfoBar/>
            <div className='main-container' >
                <MypageSideBar/>
                <Routes>
                    <Route path="/likes" element={<Likes/>}></Route>
                    <Route path="/cart" element={<Cart/>}> </Route> 
                    <Route path="/recentlyViewed" element={<RecentlyViewed/>}> </Route> 
                    <Route path="/cs/*" element={<Cs/>}></Route>                                     
                    <Route path="/" element={<MypageMain/>}></Route>                 
                    <Route path="/*" element={<NotFound/>}></Route> 
                </Routes>          
            </div>
        </div>
    )
}

export default Mypage