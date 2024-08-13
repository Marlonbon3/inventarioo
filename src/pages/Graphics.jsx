import React from 'react';
import StockChart from '../components/Charts/StockChart';

const Graphics = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Gráficas de Productos en Stock</h1>
            <StockChart />
        </div>
    );
}

export default Graphics;
