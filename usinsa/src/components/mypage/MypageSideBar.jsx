import React from "react";
import { Link } from 'react-router-dom'

function MypageSideBar(){

    return(
        <div id="mypage-left-menu" className="left_menu">
            <ul className="snb mb-4 pl-2">
                <Link to={"/mypage/info"}>
                    <li className="mypage-menu-item hover-cursor">정보</li> 
                </Link>
                <Link to={"/mypage/cart"}>
                    <li className="mypage-menu-item hover-cursor">장바구니</li> 
                </Link>
                <Link to={"/mypage/recentlyViewed"}>
                    <li className="mypage-menu-item hover-cursor">최근 본 상품</li> 
                </Link>
                <Link to={"/mypage/cs"}>
                    <li className="mypage-menu-item hover-cursor"> 1:1 문의</li> 
                </Link>
                <Link to={"/mypage/like"}>
                    <li className="mypage-menu-item hover-cursor">좋아요</li> 
                </Link>
            </ul>
        </div>
    )
}

export default MypageSideBar