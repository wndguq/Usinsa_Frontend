import React from "react";
import { Link } from 'react-router-dom'
import BottomBar from "../fragments/BottomBar";

function MypageMain(){
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

            <p className="ml-3 product-title pt-4" > 좋아요 </p>
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
                    {/* 좋아요 목록 불러오기 */}
                </tbody>
            </table>
            <p className="n-table-none"><span> 좋아요를 누를 상품이 없습니다.</span></p>

            <p className="ml-3 product-title pt-4" > 최근 본 상품 </p>
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
                    {/* 좋아요 목록 불러오기 */}
                </tbody>
            </table>
            <p className="n-table-none"><span> 최근 본 상품이 없습니다.</span></p>

            <BottomBar/>
        </div>
    )
}

export default MypageMain