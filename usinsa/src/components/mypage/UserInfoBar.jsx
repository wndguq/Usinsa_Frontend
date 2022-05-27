import React from "react";
import { Navigate } from 'react-router-dom'
import { useState, useLayoutEffect } from 'react'
import axios from "axios";
import {BACKEND_SERVER_URL, FILE_REPOSITORY_URL} from './../../global_variables'
import customCookies from "./../../static/js/customCookies"
import apiErrorHandler from "../../static/js/apiErrorHandler";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./../../redux/isValidLogin";

function UserInfoBar(){

    const [userInfo, setUserInfo] = useState();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        axios.get(BACKEND_SERVER_URL + "api/v1/users",{
            headers: {
                "X-AUTH-TOKEN": customCookies.getAccessToken(),
                "REFRESH-TOKEN": customCookies.getRefreshToken()
            }
        }).then(res => {
            setUserInfo(res.data.data);
        }).catch(error => {
            const result = apiErrorHandler(error.response.status, error.response.data);
            if(result =="logOut"){
                customCookies.logOut();
                dispatch(setLogin(false));
            }
        })
    }, [])

    return(
        <div className="my-topbar bg-black user-info-bar">

            {/* 왼쪽 정보  img, 닉네임, 레벨, 등급, 등등  */}
            <div className="display-f flex-align-start width-50perc">
                
                {userInfo &&
                    <>
                        <img className="mypage-user-image" src={FILE_REPOSITORY_URL + "userImage.PNG"} />
                        <div className="pl-5">
                            <div style={{height: "68px"}}><p className="user-info-nickname float-l">{userInfo.nickname}</p><span className="address-p float-l mt-4 ml-2"> 회원정보수정</span></div>
                            <div style={{height: "40px"}}><p className="user-info-level float-l">LV.0</p><span className="address-p float-l mt-3 ml-2"> 가입일: {new Date(userInfo.createdAt).getFullYear()}.{new Date(userInfo.createdAt).getMonth()}.{new Date(userInfo.createdAt).getDay()} </span></div>
                            <p className="mt-2">이*협님 다음 등급인 브론즈까지 3,511점 남았습니다. 등급혜택> </p>
                        </div>
                    </>
                }
                {(userInfo == undefined) &&
                    <div className="pl-5">
                        <h2> 정보를 불러오는데 실패했습니다.</h2>
                    </div>
                }
            </div>

            {/* 오른쪽 정보  img, 닉네임, 레벨, 등급, 등등  */}
            <div className="display-f flex-justify-end width-50perc">
                <div className="top-title" style={{width: "140px"}}>
                    적립금 >
                    <p className="user-info-level">2400</p>
                </div>
                <div className="top-title" style={{width: "140px"}}>
                    포인트 >
                    <p className="user-info-level">2400</p>
                </div>
                <div className="top-title" style={{width: "140px"}}>
                    쿠폰 >
                    <p className="user-info-level">127</p>                    
                </div>
                <div className="top-title" style={{width: "140px"}}>
                    후기 >
                    <p className="user-info-level">0</p>
                </div>
            </div>
        </div>
    )
}

export default UserInfoBar