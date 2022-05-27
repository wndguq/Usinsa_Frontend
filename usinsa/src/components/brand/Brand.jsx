import React, { useEffect, useState, useLayoutEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import {BACKEND_SERVER_URL, FILE_REPOSITORY_URL} from './../../global_variables'
import BottomBar from "../fragments/BottomBar";

function Brand(){

    let { id } = useParams();
    const [brandInput, setBrandInput] = useState();
    const [brandCategory, setBrandCategory] = useState();
    const [brandProduct, setBrandProduct] = useState();
    const [subCategory, setSubCategory] = useState(0);

    useLayoutEffect(() => {
        axios.get(BACKEND_SERVER_URL + "api/v1/brand/" + id)
        .then(res => {
            setBrandInput(res.data.data);
        })

        axios.get(BACKEND_SERVER_URL + "api/v1/category/brand/" + id)
        .then(res => {
            setBrandCategory(res.data.data);
        })

        axios.get(BACKEND_SERVER_URL + "api/v1/product/brand/" + id, {
            params: {
                page: 0,
                sort: 'id,desc'
            }
        })
        .then(res => {
            setBrandProduct(res.data.data);
        })
    }, [id])

    const handleInput = (value) =>{
        setSubCategory(value);

        axios.get(BACKEND_SERVER_URL + "api/v1/product/brand/" + id, {
            params: {
                page: 0,
                subCategoryId: value,
                sort: 'id,desc'
            }
        })
        .then(res => {
            setBrandProduct(res.data.data);
        })
    }

    const paging = (value) =>{
        axios.get(BACKEND_SERVER_URL + "api/v1/product/brand/" + id, {
            params: {
                page: value,
                subCategoryId: subCategory,
                sort: 'id,desc'
            }
        })
        .then(res => {
            setProductList(res.data.data);
        })
    }

    const rendering = (number, totalPage) => {
        if(totalPage != 1){
            let minPage = number - 2 > 0 ? number - 2 : 0;
            let maxPage = minPage + 4 > totalPage ? totalPage : minPage + 4;
            let result = [];
            for(let i=minPage; i < maxPage; i++){
                result.push(<div className="border-r"><p key={i} className="paging-btn" onClick={() => paging(i)} > {i+1} </p></div>);
            }
            return result;
        }else{
            return <div className="border-r"><p className="paging-btn" onClick={() => paging(0)} > {1} </p></div>;
        }
    };

    return(
        <div className="main-page-container">
            {brandInput &&
                <>
                    <p className="main-title item-p border-b pl-5"> 유신사 스토어 {' > '} 브랜드숍 {' > '} {brandInput.title} </p>
                    <div className="border-l">
                        <div className="bg-black my-inner-topbar ">
                            <span className="brand-logo-text">
                                {brandInput.enTitle}
                            </span>
                        </div>

                        <div className="main-page-container">
                            <div className="display-f pb-4 border-b flex-align-start">
                                <div className="pl-3 pt-4 pr-5">
                                    <img className="brand-img" src={FILE_REPOSITORY_URL + brandInput.image}></img>
                                </div>
                                <div className="pl-2 pt-2 pr-4 inner-max-width">
                                    <p className="font-bold pb-2 color-red" style={{textAlign: "left"}}> ♡ 0 명 좋아요</p>
                                    <p className="product-info-txt pb-3 border-b" style={{fontSize: "15px"}}> {brandInput.info} </p>
                                    <div className="display-f flex-align-center border-b" style={{height: "56px"}}>
                                        <p className="address-p pl-2 pr-5">연관 브랜드</p> 
                                        <p className="address-p pl-3"> 유신사 </p> 
                                        <p className="address-p pl-3"> 아디다스 </p> 
                                        <p className="address-p pl-3"> 나이키 </p> 
                                    </div>
                                    <div className="display-f flex-align-center mt-3">
                                        <p className="address-p hashtag-box"> #솔로 </p> 
                                        <p className="address-p hashtag-box"> #유신사 </p> 
                                        <p className="address-p hashtag-box"> #사면 여친생김 </p> 
                                        <p className="address-p hashtag-box"> #사면 남친생김 </p>
                                    </div>
                                </div>
                            </div>

                            <div className="display-f-container flex-align-start pb-2 border-b background-hover-cursor">
                                <div className="pl-3 pt-3 pr-4 brand-p">
                                    카테고리
                                </div>
                                <div className="inner-max-width ">
                                    <div className='brand-item-container pt-3 pl-4 '>
                                        <div className= {"pl-2 pr-2 pb-3 hover-cursor " +  (subCategory == 0 ? 'selected' : '')}>
                                            <p name="brand" onClick={() => handleInput(0)}>
                                                전체
                                            </p>
                                        </div>
                                        {brandCategory &&
                                            brandCategory.map( category => {
                                                return(
                                                    <div key={category.id} className= {"pl-2 pr-2 pb-3 hover-cursor " +  (subCategory == category.id ? 'selected' : '')}>
                                                        <p name="brand" onClick={() => handleInput(category.id)}>
                                                            {category.title} ({category.productCount})
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="pb-4 border-b">
                                {(brandProduct && brandProduct.content.length != 0 ) &&
                                    <div className="product-root-container">
                                        <div className='product-condition-var flex-align-center mr-0 border-b'>
                                            <div className='display-f flex-align-center width-50perc' >
                                                <p className="condition-txt border-r font-bold "> 최신상품 순 </p> 
                                                <p className="condition-txt border-r"> 낮은가격 순 </p> 
                                                <p className="condition-txt border-r"> 높은가격 순 </p> 
                                                <p className="condition-txt"> 좋아요 순 </p> 
                                            </div>
                                            <div className='display-f flex-align-center flex-justify-end width-50perc'>
                                                {brandProduct.totalPages > 0 &&
                                                    <div className='display-f flex-align-center'>
                                                        <div className="border-l border-r"><p className="paging-btn" onClick={() => paging(0)} > {'<<'} </p></div>
                                                        {rendering(brandProduct.number, brandProduct.totalPages)}
                                                        <div><p className="paging-btn" onClick={() => paging(brandProduct.totalPages)} > {'>>'} </p></div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className='product-container mr-0'>
                                            {brandProduct.content.map(product => {
                                                return(
                                                    <div className='product-item my-2 ml-2' key={product.id}>
                                                        <Link to={'/product/' + product.id}>
                                                            <img className='product-img' src={FILE_REPOSITORY_URL + product.titleImage}></img>
                                                        </Link>
                                                        <div className='product-info-container'>
                                                            <p className='product-info'> {product.brand.title}</p>
                                                            <Link to={'/product/' + product.id}>
                                                                <p className='product-info'> {product.title}</p>
                                                            </Link>
                                                            <p className='product-info mt-2'> {product.price} 원</p>
                                                            <p className='product-info color-red'> ♡ {product.likeCount}   <span className="color-orange">☆☆☆☆☆</span></p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>    
                                    </div>
                                }
                                {(brandProduct == undefined || brandProduct.content.length ==0) &&
                                    <div className='product-container'>
                                        <h1 className="pt-4 pl-4">등록된 상품이 없습니다.</h1>
                                    </div>
                                }
                            </div>

                            <BottomBar/>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Brand