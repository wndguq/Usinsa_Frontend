import { Link } from 'react-router-dom'
import { useState, useEffect , useLayoutEffect } from 'react';
import axios from "axios";
import ProductCategory from './ProductCategory';
import BrandCategory from './BrandCategory';
import {BACKEND_SERVER_URL} from './../../global_variables';

function Sidebar(){
    const [sideHandler, setSideHandler] = useState(true);
    const [category, setCategoryData] = useState({
        state: 0,
        categoryData: ''
    });

    useLayoutEffect(() => {
        axios.get(BACKEND_SERVER_URL + "api/v1/category")
        .then(res => {
            setCategoryData({
                state: 0,
                categoryData: res.data.data
            });
        })
    }, [])

    const toProduct = () => {
        document.getElementById("product").className = "tab-btn btn-active";
        document.getElementById("brand").className = "tab-btn";
        try{
            axios.get(BACKEND_SERVER_URL + "api/v1/category")
            .then(res => {
                setCategoryData({
                    state: 0,
                    categoryData: res.data.data
                });
            })
        }catch(error){
            console.log('api error.')
        }
    }

    const toBrand = () => {
        document.getElementById("product").className = "tab-btn";
        document.getElementById("brand").className = "tab-btn btn-active";
        try{
            axios.get(BACKEND_SERVER_URL + "api/v1/brand")
            .then(res => {
                setCategoryData({
                    state: 1,
                    categoryData: res.data.data
                });
            })
        }catch(error){
            console.log('api error.')
        }
    }

    const sidebarHandler = () => {
        const sidemenu = document.getElementById('left-menu');
        const side_handler = document.getElementById('side-handler');
        if(sideHandler){
            sidemenu.classList.add('display-n');
            side_handler.style.left= 0;
        }else{
            sidemenu.classList.remove('display-n');
            side_handler.style.left= '270px';
        }

        setSideHandler(!sideHandler);
    }

    return(
        <>
        <button id="side-handler" className="left_menu_btn" onClick={sidebarHandler}>
            ↔
        </button>

        <div id="left-menu" className="left_menu">
            <ul className="snb mb-4">
                <li id="product" className="tab-btn btn-active" onClick={toProduct} > 품목 </li>
                <li id="brand" className="tab-btn" onClick={toBrand}> 브랜드 </li>
            </ul>
            {category.state === 0 ? <ProductCategory data={category.categoryData}/> : <BrandCategory data={category.categoryData}/>}

        </div>
        </>
    )
}

export default Sidebar