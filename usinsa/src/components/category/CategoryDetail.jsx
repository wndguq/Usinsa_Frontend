import React, { useEffect, useState, useLayoutEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../fragments/Sidebar";
import BottomBar from "../fragments/BottomBar";
import { useSelector } from "react-redux";
import {BACKEND_SERVER_URL, FILE_REPOSITORY_URL} from './../../global_variables'

function CategoryDetail(){

    let { id } = useParams();

    const [productList, setProductList] = useState();
    const [brandInput, setBrandInput] = useState();
    const [categoryInput, setCategoryInput] = useState({
        category: '',
        subCategory: ''
    })
    const [condition, setCondition] = useState({
        price1: 0,
        price2: 99999999,
        brand: 0
    });
    const {category, subCategory} = categoryInput;
    const { isValidLogin } = useSelector(state => state.isValidLogin);

    useLayoutEffect(() => {
        // 해당 카테고리 상품 불러오기
        axios.get(BACKEND_SERVER_URL + "api/v1/product/category/" + id, {
            params: {
                page: 0,
                sort: 'id,desc'
            }
        })
        .then(res => {
            setProductList(res.data.data);
        })

        axios.get(BACKEND_SERVER_URL + "api/v1/category/subCategory/" + id)
        .then(res => {
            setCategoryInput({
                ['subCategory']: res.data.data.title,
                ['category']: res.data.data.categoryTitle
            })
        })

        axios.get(BACKEND_SERVER_URL + "api/v1/brand/subCategory/" + id)
        .then(res => {
            setBrandInput(res.data.data);
        })

        // 변수 초기화
        setCondition({
            price1: 0,
            price2: 99999999,
            brand: 0
        })
    }, [id])

    const handleInput = (name, value) =>{
        setCondition({
            ...condition,
            [name]: value
        })

        axios.get(BACKEND_SERVER_URL + "api/v1/product/category/" + id, {
            params: {
                page: 0,
                brandId: value,
                sort: 'id,desc'
            }
        })
        .then(res => {
            setProductList(res.data.data);
        })
    }

    const paging = (value) =>{
        axios.get(BACKEND_SERVER_URL + "api/v1/product/category/" + id, {
            params: {
                page: value,
                brandId: condition.brand,
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
                result.push(<div key={i} className="border-r"><p className="paging-btn" onClick={() => paging(i)} > {i+1} </p></div>);
            }
            return result;
        }else{
            return <div className="border-r"><p className="paging-btn" onClick={() => paging(0)} > {1} </p></div>;
        }
    };



    return(
        <div className='main-page-container'>
            <div className='path-title border-b pl-5'>
                유신사 스토어 {' > '} {category} {' > '} {subCategory}
            </div>
            <div className="display-f-container flex-align-start border-b pt-2 background-hover-cursor">
                <div className="pl-3 pt-2 pr-3 brand-p">
                    브랜드
                </div>
                <div >
                    {!isValidLogin &&
                        <div className='brand-item-container pl-2 pt-2 pb-2' >
                            <p className="color-red pl-2 pr-4">
                                ♥ 좋아요 
                            </p>
                            <p>
                                로그인 하시면 관심 브랜드 상품을 모아 보실 수 있습니다.
                            </p>
                        </div>
                    }
                    <div className='brand-item-container pl-2 pt-2 pb-1 '>
                        <div className= {"pl-2 pr-2 pb-3 hover-cursor " +  (condition.brand == 0 ? 'selected' : '')}>
                            <p name="brand" onClick={() => handleInput('brand', 0)}>
                                전체
                            </p>
                        </div>
                        {brandInput &&
                            brandInput.map( brand => {
                                return(
                                    <div key={brand.brandId} className= {"pl-2 pr-2 pb-2 hover-cursor " + (condition.brand == brand.brandId ? 'selected' : '')}>
                                        <p name="brand" onClick={() => handleInput('brand', brand.brandId)}>
                                            {brand.brandTitle} ({brand.productTotal})
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="pb-4 border-b">
                {(productList && productList.content.length != 0) &&
                    <div className="product-root-container">
                        <div className='product-condition-var flex-align-center mr-0 border-b'>
                            <div className='display-f flex-align-center width-50perc' >
                                <p className="condition-txt border-r font-bold "> 최신상품 순 </p> 
                                <p className="condition-txt border-r"> 낮은가격 순 </p> 
                                <p className="condition-txt border-r"> 높은가격 순 </p> 
                                <p className="condition-txt"> 좋아요 순 </p> 
                            </div>
                            <div className='display-f flex-align-center flex-justify-end width-50perc'>
                                {productList.totalPages > 0 &&
                                    <div className='display-f flex-align-center'>
                                        <div className="border-l border-r"><p className="paging-btn" onClick={() => paging(0)} > {'<<'} </p></div>
                                        {rendering(productList.number, productList.totalPages)}
                                        <div><p className="paging-btn" onClick={() => paging(productList.totalPages)} > {'>>'} </p></div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='product-container'>
                            {productList.content.map(product => {
                                return(
                                            <div className='product-item py-2' key={product.id}>
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
                {(productList == undefined || productList.content.length ==0) &&
                    <h1 className="pt-4 pl-4">등록된 상품이 없습니다.</h1>
                }
            </div>
            <BottomBar/>
        </div>
    )
}

export default CategoryDetail