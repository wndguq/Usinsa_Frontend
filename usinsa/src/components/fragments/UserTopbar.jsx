import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from 'react-router-dom'
import customCookies from "../../static/js/customCookies";

import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./../../redux/isValidLogin";

function UserTopbar () {
    const [inputValue, setInputValue] = useState({
        nickname: '',
        level: ''
    })

    const dispatch = useDispatch();
    const { isValidLogin } = useSelector(state => state.isValidLogin);

    useLayoutEffect(() => {
        if(isValidLogin){
            // axios.get 한번해서 이름, 레벨을 얻어온 후 재랜더링
        }
    }, [])

    const logout = () => {
        customCookies.logOut();
        dispatch(setLogin(false));
    }

    if(!isValidLogin){
        return (
            <div className="navbar navbar-expand my-topbar shadow">
                <Link to="/login/login">
                    <button className="btn-login">
                        로그인
                    </button>
                </Link>

                <ul className="navbar-nav ml-2">
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/">
                            마이페이지
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/recentlyViews">
                            최근 본 상품
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/likes">
                            좋아요
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/cart">
                            장바구니
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/deliveryTracking">
                            주문배송조회
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/cs/">
                            고객센터
                        </Link>
                    </li>                
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/login/join">
                            회원가입 EVENT. 신규 가입 후 바로 사용 가능한 99% 할인 쿠폰
                        </Link>
                    </li>                                
                </ul>

            </div>
        )
    }else{
        return(
            <div className="navbar navbar-expand my-topbar shadow">

                <ul className="navbar-nav ml-2">

                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/">
                            레벨, 닉네임
                        </Link>
                    </li>
                    
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/">
                            마이페이지
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/recentlyViews">
                            최근 본 상품
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/likes">
                            좋아요
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/cart">
                            장바구니
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/mypage/deliveryTracking">
                            주문배송조회
                        </Link>
                    </li>
                    <li className="user-top-item">
                        <Link className="top-user-link" to="/cs/">
                            고객센터
                        </Link>
                    </li>                                    
                    <li className="user-top-item">
                        <button className="top-user-link" onClick={logout}>
                            로그아웃
                        </button>
                    </li>                                    
                </ul>

            </div>            
        )
    }
}

export default UserTopbar