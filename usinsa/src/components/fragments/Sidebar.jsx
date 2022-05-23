import { Link } from 'react-router-dom'
import { useState, useEffect , useLayoutEffect } from 'react';
import axios from "axios";
import ProductCategory from './ProductCategory';
import BrandCategory from './BrandCategory';

function Sidebar(){
    const [state, setState] = useState(0);
    const [sideHandler, setSideHandler] = useState(true);
    const [categoryData, setCategoryData] = useState()

    useLayoutEffect(() => {
        axios.get("http://localhost/usinsa/api/v1/category")
        .then(res => {
            setCategoryData(res.data.data);
        })
    }, [])

    const toProduct = () => {
        document.getElementById("product").className = "tab-btn btn-active";
        document.getElementById("brand").className = "tab-btn";
        try{
            axios.get("http://localhost/usinsa/api/v1/category")
            .then(res => {
                setCategoryData(res.data.data);
                setState(0);
            })
        }catch(error){
            console.log('api error.')
        }
    }

    const toBrand = () => {
        document.getElementById("product").className = "tab-btn";
        document.getElementById("brand").className = "tab-btn btn-active";
        try{
            axios.get("http://localhost/usinsa/api/v1/brand")
            .then(res => {
                setCategoryData(res.data.data);
                setState(1);
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
            {state === 0 ? <ProductCategory data={categoryData}/> : <BrandCategory data={categoryData}/>}

        </div>
        </>
    )
}

export default Sidebar