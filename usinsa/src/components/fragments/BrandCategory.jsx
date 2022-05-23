import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'
function BrandCategory( {data} ){
    const [brandList, setBrandList] = useState(data);

    const findBrandByTitle = () =>{
        try{
            axios.get("http://localhost/usinsa/api/v1/brand/title", {
                params: {
                    title: 'ad'
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
                        <div className='brand-container py-2' key={brand.id}>
                            <Link to={'/brand/' + brand.id}>
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