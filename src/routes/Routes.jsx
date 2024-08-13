import React from 'react';
import {Routes, Route} from 'react-router-dom'
import ShowProducts from '../pages/ShowProducts';
import Home from '../pages/Home'
import CreateProduct from '../pages/CreateProduct'
import StockChart from '../components/graficas/Graph';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreateProduct />} />
                <Route path='/show' element={<ShowProducts />} />
                <Route path='/graphic' element = {<StockChart/>} />
                
            </Routes>
        </>
    );
}

export default AppRoutes;
