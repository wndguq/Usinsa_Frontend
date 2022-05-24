import React, { useEffect, useState, useLayoutEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../fragments/Sidebar";
// import BottomBar from "../fragments/BottomBar";

function Product(){

    let { id } = useParams();

    const [product, setProduct] = useState();

    useEffect(() => {
        axios.get("http://localhost/usinsa/api/v1/product/" + id)
        .then(res => {
            console.log(res.data.data);
            setProduct(res.data.data);
        })
    }, [id])

    const changeTitleImage = (src) => {
        document.getElementById("titleImage").src = "http://localhost:9000/usinsa/" + src;
    }

    return(
        <>
            {product &&
                <div className="main-page-container">
                    <p className="main-title item-p border-b"> 유신사 스토어 {' > '} 브랜드숍 {' > '} {product.product.brand.title} </p>
                    <div className="border-l">
                        <div className="bg-black my-inner-topbar ">
                            <span className="brand-logo-text">
                                {product.product.brand.enTitle}
                            </span>
                        </div>
                        <div className='main-page-container'>
                            <div className="display-f flex-align-start" >
                                <span className="item-p text-color-gray">
                                    {product.product.categoryTitle} {' > '} {product.product.subCategoryTitle}
                                </span>
                            </div>
                            <div className="display-f flex-align-start" >
                                <span className="product-title">
                                    {product.product.title}
                                </span>
                            </div>

                            {/* 상품정보 왼쪽 */}
                            <div className="display-f inner-min-width pb-3 border-b" >
                                <div className="width-500">
                                    <div>
                                        <img id="titleImage" className="product-title-img" src={"http://localhost:9000/usinsa/" + product.product.titleImage}></img>
                                    </div>
                                    <div className="display-f flex-align-start mt-2 ml-1 pb-3 border-b">

                                        <img className="product-sub-img ml-1 mt-1" src={"http://localhost:9000/usinsa/" + product.product.titleImage} onMouseEnter={() => changeTitleImage( product.product.titleImage)}></img>
                                        {product.subImageList.map( (subImage, index) => {
                                            return(
                                                <img key={index} className="product-sub-img ml-1 mt-1" src={"http://localhost:9000/usinsa/" + subImage} onMouseEnter={() => changeTitleImage(subImage)}></img>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <div className="display-f flex-align-start flex-align-center mt-1">
                                            <span className="title-p"> Size Info </span>
                                            <span className="address-p ml-1"> 사이즈 정보 </span>
                                        </div>

                                        <table className="size-info-table">
                                            <thead>
                                                <tr>
                                                    <th>cm</th>
                                                    <th>총장</th>
                                                    <th>어깨너비</th>
                                                    <th>가슴단면</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.productSizeList.map(sizeInfo => {
                                                    return(
                                                        <tr key={sizeInfo.id}>
                                                            <th>{sizeInfo.size}</th>
                                                            <td>{sizeInfo.size1}</td>
                                                            <td>{sizeInfo.size2}</td>
                                                            <td>{sizeInfo.size3}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <ul className="size-info-txt mt-2">
                                            <li>위 사이즈 표는 무신사스토어 측정방식을 기준으로 작성되었습니다.</li>
                                            <li>보유하신 옷의 실측값을 입력하시면 정확한 비교가 가능합니다.</li>
                                            <li>상품 상세 정보의 사이즈 표는 업체 기준 측정입니다.</li>
                                        </ul>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                                
                                {/* 오른쪽 */}
                                <div className="width-500 ml-5">
                                    <div className="product-info pb-1"> 한정판매</div>
                                    <div className="brand-title pb-2 border-b"> 유신사 스토어를 포함한 제한된 판매처에서만 구매 가능한 상품입니다.</div>

                                    <div className="display-f flex-align-start flex-align-center mt-3">
                                        <span className="title-p"> Product Info </span>
                                        <span className="address-p ml-1"> 상품 정보 </span>
                                    </div>

                                    <ul className="product-info-ul pb-3 border-b">
                                        <li className="display-f flex-align-start"> <p className="product_article_tit"> 브랜드 </p><p className="ml-2"> {product.product.brand.title}</p></li>
                                        <li className="display-f flex-align-start"> <p className="product_article_tit"> 성별 </p><p className="ml-2"> {product.product.gender}</p></li>
                                        <li className="display-f flex-align-start"> <p className="product_article_tit"> 가격 </p><p className="ml-2"> {product.product.price}원</p></li>
                                        <li className="display-f flex-align-start"> <p className="product_article_tit"> 좋아요 </p><p className="ml-2" style={{color: "red"}}> ♥ 652</p></li>                                        
                                    </ul>

                                    <div className="border-b pb-3 product-info-txt">
                                        18 ~ 29세, 남성에게 인기많은 상품
                                    </div>
                                </div>

                            </div>

                            <div className="display-f inner-min-width pb-3 border-b"> 
                                <div className="inner-width side-menu">
                                    <div className="product-title mt-2">
                                        Product Info                                    
                                    </div>
                                    <img src={"http://localhost:9000/usinsa/" + product.image} className="inner-min-width side-menu mt-3"></img>
                                </div>
                            </div>

                            <div className="display-f inner-min-width pb-3 border-b"> 
                                <div className="product-title mt-4 ml-2">
                                    구매후기
                                    <div className="product-title mt-4 ml-2">
                                    후기 없음
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {(product == undefined) &&
                <div className="display-f flex-center brand-entitle">
                    상품정보를 불러오는 중입니다.
                </div>
            }
        </>
    )
}

export default Product