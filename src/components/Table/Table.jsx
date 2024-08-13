import React from 'react';
import TableBs from 'react-bootstrap/Table';
import ItemTable from '../ItemTable/ItemTable';

const Table = ({items, editItem, deleteItem}) => {
    console.log(items);
    return (
        <TableBs striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th style={{textAlign:'center'}}>Modificar</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                    <ItemTable item={item}  key={i}  editItem={editItem} deleteItem={deleteItem}/>
                ))}
            </tbody>
        </TableBs>
    );
}

export default Table;
