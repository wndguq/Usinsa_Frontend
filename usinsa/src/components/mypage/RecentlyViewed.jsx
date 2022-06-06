import React from "react";
import { Link } from 'react-router-dom'
import { useState, useLayoutEffect } from 'react'
import axios from "axios";
import {BACKEND_SERVER_URL, FILE_REPOSITORY_URL} from './../../global_variables'
import customCookies from './../../static/js/customCookies'
import BottomBar from "../fragments/BottomBar";

function RecentlyViewed(){

    const [productList, setProductList] = useState();

    useLayoutEffect(() => {
        axios.get(BACKEND_SERVER_URL + "api/v1/viewed", {
            headers: {
                "X-AUTH-TOKEN": customCookies.getAccessToken(),
                "REFRESH-TOKEN": customCookies.getRefreshToken()
            }})
        .then(res => {
            console.log(res.data.data);
            setProductList(res.data.data);
        })

    }, [])

    return(
        <div className="main-page-container">
            <p className="ml-3 product-title" > 최근 본 상품 </p>

            <div className='product-container border-b mt-2 mb-3'>
                {productList &&
                    productList.map((product, index) => {
                        return(
                            <div className='product-item py-2' key={product.id}>
                                <Link to={'/product/' + product.productId}>
                                    <img className='product-img' src={FILE_REPOSITORY_URL + product.image}></img>
                                </Link>
                                <div className='product-info-container'>
                                    <p className='product-info' style={{fontSize: "13px"}}> {product.brandTitle}</p>
                                    <Link to={'/product/' + product.productId}>
                                        <p className='product-info'> {product.productTitle}</p>
                                    </Link>
                                    <p className='product-info mt-2'> {product.price} 원</p>
                                </div>
                            </div>
                        )
                    }
                )}
                { (productList == undefined || productList.length == 0 ) &&
                    <h1>최근 본 상품이 없습니다.</h1>
                }

            </div>
            <BottomBar/>
        </div>
    )
}

export default RecentlyViewed