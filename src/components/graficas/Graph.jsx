import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import './graph.css'; // Asegúrate de importar el archivo CSS para los estilos

Chart.register(...registerables); // Registrar todos los componentes necesarios

const StockChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null); // Ref para el canvas

    const fetchStockData = async () => {
        try {
            const response = await axios.get('https://66bbadf96a4ab5edd6391d5d.mockapi.io/productos');
            const products = response.data;

            const productNames = products.map(product => product.nombre);
            const productStocks = products.map(product => product.cantidad);

            setChartData({
                labels: productNames,
                datasets: [
                    {
                        label: 'Productos en Stock',
                        data: productStocks,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            setError('Error fetching stock data');
            console.error('Error fetching stock data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockData();
    }, []);

    useEffect(() => {
        if (chartData && chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            return () => {
                chartInstance.destroy(); // Destruir la instancia previa del gráfico antes de crear una nueva
            };
        }
    }, [chartData]);

    if (loading) {
        return <p className="chart-container">Cargando datos...</p>;
    }

    if (error) {
        return <p className="chart-container">{error}</p>;
    }

    if (!chartData) {
        return <p className="chart-container">No hay datos para mostrar</p>;
    }

    return (
        <div className="chart-container">
            <h2>Productos en Stock</h2>
            <canvas ref={chartRef} /> {/* El canvas donde se renderiza la gráfica */}
        </div>
    );
};

export default StockChart;
