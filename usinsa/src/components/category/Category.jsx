import React from "react";
import { Link, Routes, Route } from 'react-router-dom';
import CategoryDetail from './CategoryDetail';
import NotFound from "../NotFound";

function Category(){
    return(
        <Routes>
            <Route path="/:id" element={<CategoryDetail/>}></Route>
            <Route path="/*" element={<NotFound/>}></Route> 
        </Routes> 
    )
}

export default Category