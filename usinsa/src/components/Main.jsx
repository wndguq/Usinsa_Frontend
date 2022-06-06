import { Link } from 'react-router-dom'
import { useState, useLayoutEffect } from 'react'
import axios from "axios";
import BottomBar from './fragments/BottomBar';
import {BACKEND_SERVER_URL, FILE_REPOSITORY_URL} from './../global_variables'

function Main(){

    const [productList, setProductList] = useState();
    const [brandList, setBrandList] = useState();
    const [noticeList, setNoticeList] = useState();

    useLayoutEffect(() => {
        axios.get(BACKEND_SERVER_URL + "api/v1/product", {
            params: {
                page: 0,
                sort: "id,desc"
            }
        })
        .then(res => {
            setProductList(res.data.data.content);
        })

        axios.get(BACKEND_SERVER_URL + "api/v1/brand")
        .then(res => {
             setBrandList(res.data.data);
        })
    }, [])

    return(
        <div className='main-page-container pl-3'>
            <div className='main-title'>
                최근 등록 상품
            </div>
            <div className='product-container border-b mt-2'>
                {productList &&
                    productList.map((product, index) => {
                        return(
                            <div className='product-item py-2' key={product.id}>
                                <Link to={'/product/' + product.id}>
                                    <img className='product-img' src={FILE_REPOSITORY_URL + product.titleImage}></img>
                                </Link>
                                <div className='product-info-container'>
                                    <p className='product-info'> {product.brandTitle}</p>
                                    <Link to={'/product/' + product.id}>
                                        <p className='product-info'> {product.title}</p>
                                    </Link>
                                    <p className='product-info mt-2'> {product.price} 원</p>
                                </div>
                            </div>
                        )
                    }
                )}
                {productList == false &&
                    <h1>최근 등록된 상품이 없습니다.</h1>
                }

            </div>

            <div className='main-title pl-0 mt-4'>
                주요 브랜드
            </div>

            <div className='product-container border-b'>
                {brandList &&
                    brandList.map((brand, index) => {
                        return(
                            <div className='product-item py-2' key={brand.brandId}>
                                <Link to={'/brand/' + brand.brandId}>
                                    <img className='brand-img' src={FILE_REPOSITORY_URL + brand.image}></img>
                                </Link>
                            </div>
                        )
                    }
                )}
            </div>

            <div className='main-container pl-0 mt-4 '>
                <div className='main-title pl-0'>
                    공지사항
                </div>

                <ul className='notice-container pb-3'>
                    <Link to={"/notice/list/notice_id"}><li className='notice-item'> [필독] 주소입력 공지사항 </li></Link>
                    <Link to={"/notice/list/notice_id"}><li className='notice-item'> 환불 정책 관련 </li></Link>
                    <Link to={"/notice/list/notice_id"}><li className='notice-item'> 회원 정보 보관 관련 </li></Link>
                    <Link to={"/notice/list/notice_id"}><li className='notice-item'> 회원 탈퇴 관련 </li></Link>
                </ul>
            </div>                
            <BottomBar></BottomBar>
        </div>
    )
}

export default Main