import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'
function ProductCategory( {data} ){

    const [state, setState] = useState(0);

    const toggleAction = ( index ) => {
        return () =>{
            setState(index);
        }
    }

    if(data){
        return(
            <div>                
                {data.map((category, index) => {
                    return(
                    <div className='side-menu' key={category.id}>
                        <div className='side-button' onClick={toggleAction(index)}>
                            <p className='side-menu-text'>{category.title}</p>
                            <p className='side-menu-text' style={{float : 'right'}}> {state == index ? '-' : '+'} </p>
                        </div>
                        <div name="subCategoryContainer" className= {'display-f-container mt-2 ' + (state == index ? '' : 'display-n')}>
                            {category.subCategorys.map(subcate =>{
                                return(
                                    <Link to={'/category/' + subcate.id} key={subcate.id} className="subcategory-item">
                                        {subcate.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div> 
                    )
                })}
            </div>
        )
    }else{
        return(
            <div>
                test product
            </div>
        )        
    }
}

export default ProductCategory;