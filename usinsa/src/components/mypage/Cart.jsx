import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { setLogin } from "../../redux/isValidLogin";
import apiErrorHandler from "../../static/js/apiErrorHandler";
import customCookies from "../../static/js/customCookies";
import BottomBar from "../fragments/BottomBar";
import {BACKEND_SERVER_URL, FILE_REPOSITORY_URL } from './../../global_variables'

function Cart(){

    const [cartInput, setCartInput] = useState();
    const { isValidLogin } = useSelector(state => state.isValidLogin);

    useLayoutEffect(() => {
        if(isValidLogin){
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

    const formAction = (event) =>{
        event.preventDefault();
        alert("상품 구매 미구현");
    }

    return(
        <div className="main-page-container">
            <p className="ml-3 product-title" > 장바구니 </p>
            <form onSubmit={formAction}>
            <table className="n-table mt-3 ml-2 border-b">
                <colgroup>
                    <col style={{width: "3%"}}></col>
                    <col style={{width: "30%"}}></col>
                    <col style={{width: "10%"}}></col>
                    <col style={{width: "10%"}}></col>
                    <col style={{width: "6%"}}></col>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">번호 </th>
                        <th scope="col">상품정보</th>
                        <th scope="col">총 상품금액</th>
                        <th scope="col">수량</th>
                        <th scope="col">삭제</th>                       
                    </tr>
                </thead>
                <tbody>
                    {cartInput &&
                        <>
                        {cartInput.map( (cartItem, index ) => {
                            return(
                                <tr key={index}>
                                    <td> {index + 1}  </td>
                                    <td> 
                                        <div className="display-f flex-align-center py-2">
                                            <input type="checkbox" name="checked" value="1"/>
                                            <img className="product-sub-img ml-3" src={FILE_REPOSITORY_URL + cartItem.productImage}/>
                                            <div className="ml-3">
                                                <p className="product-info" > {cartItem.productTitle} </p>
                                                <p className="address-p " style={{textAlign: "left"}}> 옵션: {cartItem.productSize} / 재고 {cartItem.productTotal} </p>
                                                <p className="product-info" > * 적립금 선할인 미적용 상품(적립만 가능)</p>
                                            </div>
                                        </div> 
                                    </td>
                                    <td> {cartItem.productPrice * cartItem.total} </td>
                                    <td> {cartItem.total} </td>
                                    <td> <button>x</button> </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="5">
                                <div className="display-f flex-center my-2">
                                    <input type="submit" name="submit" value=" 선택된 항목 구매하기 "></input>                                    
                                </div>
                            </td>
                        </tr>
                        </>
                    }
                    {(cartInput == undefined || cartInput.length ==0 ) &&
                        <tr>
                            <td className="n-table-none" colSpan={"5"}><span> 장바구니에 담긴 상품이 없습니다.</span></td>
                        </tr>
                    }
                </tbody>
            </table>    
            </form>
            <BottomBar/>
        </div>
    )
}

export default Cart