import React, { useEffect, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import {BACKEND_SERVER_URL, FILE_REPOSITORY_URL} from './../../global_variables'
import BottomBar from "../fragments/BottomBar";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import customCookies from "../../static/js/customCookies";
import apiErrorHandler from "../../static/js/apiErrorHandler";
import { setLogin } from "../../redux/isValidLogin";

function Product(){

    let { id } = useParams();

    const [product, setProduct] = useState();
    const [cart, setCart] = useState([]);
    const [reviews, setReviews] = useState();
    const [point, setPoint] = useState(0);

    const { isValidLogin } = useSelector(state => state.isValidLogin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // 상품정보
        axios.get(BACKEND_SERVER_URL + "api/v1/product/" + id)
        .then(res => {
            setProduct(res.data.data);
        })

        axios.get(BACKEND_SERVER_URL + "api/v1/review/" + id, {
            params: {
                page: 0,
                sort: "createdAt,desc"
            }
        })
        .then(res => {
            setReviews(res.data.data);
        })

        axios.get(BACKEND_SERVER_URL + "api/v1/review/point/" + id)
        .then(res => {
            setPoint(res.data.data);
        })

        if(isValidLogin){
            axios.post(BACKEND_SERVER_URL + "api/v1/viewed/" + id, {}, {
                headers: {
                    "X-AUTH-TOKEN": customCookies.getAccessToken(),
                    "REFRESH-TOKEN": customCookies.getRefreshToken()
                }
            })
            .then(res => {})
            .catch(error => {
                const result = apiErrorHandler(error.response.status, error.response.data);
                if(result =="logOut"){
                    customCookies.logOut();
                    dispatch(setLogin(false));
                }
            })
        }

    }, [id])

    let totalPrice = () => {
        let result = 0;
        cart.map( ({id, total, size}) => {
            result += total * product.product.price;
        });
        return result;
    };

    const changeTitleImage = (src) => {
        document.getElementById("titleImage").src = FILE_REPOSITORY_URL + src;
    }

    const selected = () => {
        const select = document.getElementById("optionSelect");
        const selectValue = select.options[select.selectedIndex].value;

        if(select.selectedIndex == 0 || existsCart(selectValue)) return ;

        let sizeTxt = "";
        product.productSizeList.map( (sizeInfo) => {  
            if(sizeInfo.sizeId == selectValue){
                sizeTxt = sizeInfo.size;
            }
        });

        let addCart = {
            id: selectValue,
            total: 1,
            size: sizeTxt
        }

        setCart([...cart, addCart]);
    }

    const existsCart = (sizeId) => {
        let exists = false;
        cart.map( ({id, total, size}) => {
            if(id == sizeId) exists = true;
        });

        return exists;
    }

    const plusCartTotal = (sizeId) => {
        let newCart = [];
        cart.map( ({id, total, size}) => {
            if(id == sizeId) newCart.push({id: id, total: Number(total) + 1, size: size});
            else newCart.push({id: id, total: total, size: size});
        });

        setCart(newCart);
    }

    const minusCartTotal = (sizeId) => {
        let newCart = [];
        cart.map( ({id, total, size}) => {
            if(id == sizeId) newCart.push({id: id, total: Number(total) + 1, size: size});
            else newCart.push({id: id, total: total, size: size});
        });

        setCart(newCart);
    }

    const deleteCartItem = (sizeId) => {
        let newCart = [];
        cart.map( ({id, total, size}) => {
            if(id == sizeId) ;
            else newCart.push({id: id, total: total, size: size});
        });

        setCart(newCart);
    }

    const nowBuyAction = () => {
        navigate('/order');
    }

    const addCartItem = () => {
        if(!isValidLogin){
            alert("로그인이 필요한 서비스입니다.");
            return ;
        }

        let axiosConfig = {
            headers: {
                "X-AUTH-TOKEN": customCookies.getAccessToken(),
                "REFRESH-TOKEN": customCookies.getRefreshToken()
            }
        }      

        cart.map( (cartItem) => {
            axios.post(BACKEND_SERVER_URL + "api/v1/cart" ,{
                "productId": id,
                "productSizeId": cartItem.id,
                "total": cartItem.total
            }, axiosConfig)
            .then(res => {
                alert("장바구니에 담기 성공");
            })
            .catch(error => {
                const result = apiErrorHandler(error.response.status, error.response.data);
                if(result =="logOut"){
                    customCookies.logOut();
                    dispatch(setLogin(false));                        
                    alert("로그인이 필요한 서비스입니다.");
                }
            })
        })

//        navigate('/order');
    }

    const addReview = () => {
        if(!isValidLogin){
            alert("로그인이 필요한 서비스입니다.");
            return ;
        }

        const body = document.getElementById("reviewBody");
        if(body.value == undefined){
            alert("내용을 입력해주세요.");
            return ;
        }

        let axiosConfig = {
            headers: {
                "X-AUTH-TOKEN": customCookies.getAccessToken(),
                "REFRESH-TOKEN": customCookies.getRefreshToken()
            }
        }      


        axios.post(BACKEND_SERVER_URL + "api/v1/review" ,{
            "productId": id,
            "body": body.value,
            "point": 10
        }, axiosConfig)
        .then(res => {
            console.log(res);
            if(res.data.code != undefined && res.data.code == 11010){
                alert("이미 작성한 댓글이 있습니다.");                
            } else {
                alert("댓글이 달렸습니다.");
            }
        })
        .catch(error => {
            console.log(error);
            const result = apiErrorHandler(error.response.status, error.response.data);
            if(result =="logOut"){
                customCookies.logOut();
                dispatch(setLogin(false));                        
                alert("다시 로그인해주세요.");
            }
        })


//        navigate('/order');
    }

    return(
        <div className="main-page-container">
            {product &&
                <>
                    <p className="main-title item-p border-b pl-5"> 유신사 스토어 {' > '} 브랜드숍 {' > '} {product.product.brand.title} </p>

                        <div className="bg-black my-inner-topbar ">
                            <span className="brand-logo-text">
                                {product.product.brand.enTitle}
                            </span>
                        </div>
                        <div className='main-page-container pl-3'>
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

                            <div className="display-f pb-3 border-b" >

                                {/* 상품정보 왼쪽 */}
                                <div className="width-500">
                                    <div>
                                        <img id="titleImage" className="product-title-img border" src={FILE_REPOSITORY_URL + product.product.titleImage}></img>
                                    </div>
                                    <div className="display-f flex-align-start mt-2 ml-1 pb-3 border-b">

                                        <img className="product-sub-img border ml-1 mt-1" src={FILE_REPOSITORY_URL + product.product.titleImage} onMouseEnter={() => changeTitleImage( product.product.titleImage)}></img>
                                        {product.subImageList.map( (subImage, index) => {
                                            return(
                                                <img key={index} className="product-sub-img border ml-1 mt-1" src={FILE_REPOSITORY_URL + subImage} onMouseEnter={() => changeTitleImage(subImage)}></img>
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
                                                {product.productSizeList.map( (sizeInfo, index) => {
                                                    return(
                                                        <tr key={index}>
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
                                        <span className="address-p ml-1" style={{marginTop: "-4px"}}> 상품 정보 </span>
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

                                    <div className="display-f flex-align-start flex-align-center mt-3">
                                        <span className="title-p"> Delivery Info </span>
                                        <span className="address-p ml-1" style={{marginTop: "-4px"}}> 배송 정보 </span>
                                    </div>
                                    <ul className="product-info-ul pb-3 border-b">
                                        <li className="display-f flex-align-start"> <p className="product_article_tit"> 배송 방법 </p><p className="ml-2" style={{fontSize: "15px"}}> 국내 배송/입점사 배송/CJ대한통운</p></li>
                                        <li className="display-f flex-align-start"> <p className="product_article_tit"> 평균 배송 </p><p className="ml-2" style={{fontSize: "15px"}}> 3일</p></li>
                                        <li className="display-f "> <p className="color-red mt-1" > 유신사 스토어는 전 상품 무료배송입니다.</p></li>
                                    </ul>

                                    <div className="mt-3 option-box-gray">
                                        <div className="option-select-box">
                                            <select id="optionSelect" className="option-select" onChange={selected}> 
                                                <option value={"0"}> 옵션을 선택해주세요. </option>
                                                {product.productSizeList.map( (sizeInfo, index) => {
                                                    return(
                                                        <option key={index} value={sizeInfo.sizeId} >
                                                            {sizeInfo.size}, 남은 수량 {sizeInfo.total}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </div>

                                        <div id="cartList">
                                            {cart &&
                                                cart.map( (cartItem) => {
                                                    return(
                                                        <div key={cartItem.id} className="display-f-container side-button flex-align-center">
                                                            <p className="option-size-txt"> {cartItem.size} </p> 
                                                            <p className="product-total-btn hover-cursor" onClick={() => minusCartTotal(cartItem.id)} > - </p>
                                                            <p className="product-total-txt"> {cartItem.total} </p>
                                                            <p className="product-total-btn font-bold hover-cursor" onClick={() => plusCartTotal(cartItem.id)}> + </p>
                                                            <p className="ml-4 price-txt"> {product.product.price * cartItem.total}원 </p>
                                                            <p className="ml-3 hover-cursor" onClick={() => deleteCartItem(cartItem.id)}>x</p>
                                                        </div> 
                                                    )                                                   
                                                })
                                            }
                                        </div>

                                        <div className="total-price-box border-b" style={{height: "50px"}}>
                                            <p className="side-menu-text ml-3">총 상품 금액</p> <p className="side-menu-text float-r mr-3"> {totalPrice()}원</p>
                                        </div>
                                    </div>

                                    <div className="display-f-container mt-2" style={{height: "50px"}}>
                                        <button className="buy-now-btn" onClick={nowBuyAction}> 바로구매 </button>
                                        <button className="cart-btn ml-3" onClick={addCartItem}> 장바구니 </button>
                                        <button className="cart-btn ml-3" onClick={nowBuyAction}> ♡ </button>
                                    </div>

                                </div>

                            </div>

                            <div className="display-f pb-3 border-b"> 
                                <div className="inner-width side-menu">
                                    <div className="product-title mt-2">
                                        Product Info                                    
                                    </div>
                                    <img src={FILE_REPOSITORY_URL + product.image} className="side-menu mt-3"></img>
                                </div>
                            </div>

                            {reviews &&
                                <div className="border-b pb-5 "> 
                                    <div className="product-info-txt font-bold mt-4 ml-2">
                                        구매후기 (0)
                                    </div>
                                    <div className="ml-3 mt-2">
                                        <div className="review-box review-top display-f flex-align-center">
                                            <select className="ml-3">
                                                <option value="desc"> 최신 순 </option>
                                                <option value="asc"> 오래된 순 </option>
                                            </select>
                                        </div>

                                        <div className="review-box display-f flex-align-center border-b">
                                            <textarea id="reviewBody" style={{width: "900px" , height: "60px"}} className="my-3"></textarea>
                                            <button className="ml-4 review-btn" onClick={addReview} >댓글달기</button>
                                        </div>

                                        <div className="review-box ">
                                            {reviews.content.map( (review) => {
                                                return(
                                                    <div className="display-f flex-align-start pt-2 border-b pb-3" key={review.id}>
                                                        <img className="review-user-img" src={FILE_REPOSITORY_URL + "userImage.PNG"}></img>
                                                        <div className="pl-2" style={{width: "927px"}}>
                                                            <p className="main-title pl-0">{review.nickname}</p>
                                                            <p className="brand-title">신고</p>    
                                                            <p className="brand-title mt-1">별점: {review.point}</p>    
                                                            <div className="main-title mt-2 pl-0"> {review.body}</div>
                                                        </div>
                                                        <pre className="float-r" style={{width: "70px"}}>1시간전</pre>
                                                    </div>
                                                )
                                            })}
                                            {reviews.content.length == 0 &&
                                                <div className="mt-2">
                                                    댓글이 없습니다.
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            {reviews == undefined &&
                                <div className="border-b"> 
                                    <div className="product-title mt-4 ml-2">
                                        후기 정보 불러오는 중
                                    </div>
                                </div>
                            }
                        </div>
                </>
            }

            {(product == undefined) &&
                <div className="display-f flex-center brand-entitle">
                    상품정보를 불러오는 중입니다.
                </div>
            }

            <BottomBar/>

        </div>
    )
}

export default Product