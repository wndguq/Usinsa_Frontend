import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { BACKEND_SERVER_URL, FILE_REPOSITORY_URL } from '../global_variables';

function Ranking(){

    const [productList, setProductList] = useState();
    const [condition, setCondition] = useState("daily");

    useLayoutEffect(() => {
        // 해당 카테고리 상품 불러오기
        axios.get(BACKEND_SERVER_URL + "api/v1/rank/daily", {
            params: {
                page: 0,
                size: 20
            }
        })
        .then(res => {
            console.log(res.data.data);
            setProductList(res.data.data);
        })
    }, [])

    const handleInput = (value) =>{
        setCondition(value)

        axios.get(BACKEND_SERVER_URL + "api/v1/rank/" + value, {
            params: {
                page: 0,
                size: 20
            }
        })
        .then(res => {
            setProductList(res.data.data);
        })
    }

    const paging = (value) =>{
        axios.get(BACKEND_SERVER_URL + "api/v1/rank/" + condition, {
            params: {
                page: value,
                size: 20
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
        <div className='main-page-container pl-3'>
            <div className='main-title'>
                인기 상품 순위
            </div>
            {(productList && productList.content.length != 0) &&
                    <div className="product-root-container">
                        <div className='product-condition-var flex-align-center mr-0 border-b'>
                            <div className='display-f flex-align-center width-50perc' >
                                <p className={"condition-txt border-r " +  (condition == 'daily' ? 'font-bold' : '')} onClick={() => handleInput("daily")}> 일별 랭킹 </p> 
                                <p className={"condition-txt border-r " +  (condition == 'time' ? 'font-bold' : '')} onClick={() => handleInput("time")}> 실시간 랭킹 </p> 
                            </div>
                            <div className='display-f flex-align-center flex-justify-end width-50perc'>
                                <div className='display-f flex-align-center'>
                                    <div className="border-l border-r"><p className="paging-btn" onClick={() => paging(0)} > {'<<'} </p></div>
                                    {rendering(productList.number, productList.totalPages)}
                                    <div><p className="paging-btn" onClick={() => paging(productList.totalPages - 1)} > {'>>'} </p></div>
                                </div>
                            </div>
                        </div>
                        <div className='product-container'>
                            {productList.content.map(product => {
                                return(
                                            <div className='product-item py-2' key={product.ranking}>
                                                <div className='ranking-txt'>{product.ranking}위</div>
                                                <Link to={'/product/' + product.product.id}>
                                                    <img className='product-img' src={FILE_REPOSITORY_URL + product.product.titleImage}></img>
                                                </Link>
                                                <div className='product-info-container'>
                                                    <p className='product-info'> {product.product.brand.title}</p>
                                                    <Link to={'/product/' + product.product.id}>
                                                        <p className='product-info'> {product.product.title}</p>
                                                    </Link>
                                                    <p className='product-info mt-2'> {product.product.price} 원</p>
                                                    <p className='product-info color-red'> ♡  <span className="color-orange">☆☆☆☆☆</span></p>
                                                </div>
                                            </div>
                                )
                            })}
                        </div>
                    </div>
                }
        </div>
    )
}

export default Ranking