import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import {BACKEND_SERVER_URL} from './../../global_variables';

function BrandCategory( {data} ){
    const [brandList, setBrandList] = useState(data);

    console.log(data);
    const findBrandByTitle = (titleInput) =>{
        try{
            axios.get(BACKEND_SERVER_URL + "api/v1/brand/title", {
                params: {
                    title: titleInput
                }
            })
            .then(res => {                
                setBrandList(res.data.data);
            })
        }catch(error){
            console.log('api error.')
        }
    }


    if(data){
        return(
            <div>
                <div>
                </div>
                {brandList.map((brand, index) => {
                    return(
                        <div className='brand-container py-2' key={brand.brandId}>
                            <Link to={'/brand/' + brand.brandId}>
                                <div className='brand-entitle'>{brand.enTitle}</div>
                                <div className='brand-title'>{brand.title}</div>
                            </Link>
                            <div style={{fontSize: '22px' , marginRight : "5px"}} onClick={findBrandByTitle}>♡</div>
                        </div>
                    )
                })}
            </div>
        )
    }else{
        return(
            <div>
                test Brand
            </div>
        )        
    }
}

export default BrandCategory