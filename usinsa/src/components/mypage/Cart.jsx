import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { setLogin } from "../../redux/isValidLogin";
import apiErrorHandler from "../../static/js/apiErrorHandler";
import customCookies from "../../static/js/customCookies";
import BottomBar from "../fragments/BottomBar";
import {BACKEND_SERVER_URL} from './../../global_variables'

function Cart(){

    const [cartInput, setCartInput] = useState();
    const { isValidLogin } = useSelector(state => state.isValidLogin);

    console.log(isValidLogin);
    useLayoutEffect(() => {
        if(isValidLogin){
            // axios.get 한번해서 이름, 레벨을 얻어온 후 재랜더링
            axios.get(BACKEND_SERVER_URL + "api/v1/cart", {
                headers: {
                    "X-AUTH-TOKEN": customCookies.getAccessToken(),
                    "REFRESH-TOKEN": customCookies.getRefreshToken()
                }}).then(res => {
                    console.log(res);
                    setCartInput(res.data.data);
                })
                .catch(error => {
                    const result = apiErrorHandler(error.response.status, error.response.data);
                    if(result =="logOut"){
                        customCookies.logOut();
                        dispatch(setLogin(false));         
                    }
            })
        }else{
            alert("로그인이 필요한 서비스입니다.");
            return (<Navigate replace to="/login/login" />)
        }
    }, [])

    return(
        <div className="main-page-container">
            <p className="ml-3 product-title" > 장바구니 </p>
            <table className="n-table mt-3 ml-2">
                <colgroup>
                    <col style={{width: "*"}}></col>
                    <col style={{width: "20%"}}></col>
                    <col style={{width: "20%"}}></col>
                    <col style={{width: "20%"}}></col>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">상품정보</th>
                        <th scope="col">상품금액</th>
                        <th scope="col">수량</th>
                        <th scope="col">주문금액</th>                       
                    </tr>
                </thead>
                <tbody>
                    {/* 장바구니 목록 불러오기 */}
                </tbody>
            </table>
            <p className="n-table-none"><span> 장바구니에 담긴 상품이 없습니다.</span></p>
            <BottomBar/>
        </div>
    )
}

export default Cart