import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../services/axios.config';
import Table from '../components/Table/Table';

const ShowProducts = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get('/')
            .then(response => {
                if (response.status === 200) {
                    setItems(response.data);
                } else {
                    throw new Error(`[${response.status}] Error en la solicitud`);
                }
            })
            .catch(err => {
                setError(err.message);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const editItem = (id, data) => {
        console.log('Editando producto');

        axiosInstance.put(`/${id}`, data)
            .then(response => {
                if (response.status === 200) {
                    const updatedItems = items.map(item => 
                        item.id === response.data.id ? response.data : item
                    );
                    setItems(updatedItems);
                } else {
                    throw new Error(`[${response.status}] Error en la solicitud`);
                }
            })
            .catch(err => {
                setError(err.message);
                console.log(err);
            });
    };

    const deleteItem = (id) => {
        console.log('Eliminando producto');

        axiosInstance.delete(`/${id}`)
            .then(response => {
                if (response.status === 200) {
                    const filteredItems = items.filter(item => item.id !== id);
                    setItems(filteredItems);
                } else {
                    throw new Error(`[${response.status}] Error en la solicitud`);
                }
            })
            .catch(err => {
                setError(err.message);
                console.log(err);
            });
    };

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Productos en sistema</h1>
            <div className='container mt-3'>
                {error && <div className='alert alert-danger'>{error}</div>}
                {items.length > 0 ? 
                    <Table items={items} editItem={editItem} deleteItem={deleteItem} />
                    : <h2 style={{ textAlign: 'center' }}>No hay productos en el sistema</h2>
                }
            </div>
        </div>
    );
}

export default ShowProducts;
