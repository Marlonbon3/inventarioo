import React from 'react';
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';

const DeleteModal = ({ show, onHide, onDelete, item }) => {
    const handleDelete = async () => {
        await onDelete(item.id);
        onHide(); // Cierra el modal después de eliminar
    };

    return (
        <ModalBs
            show={show}
            onHide={onHide}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalBs.Header closeButton className='bg-dark'>
                <ModalBs.Title id="contained-modal-title-vcenter">
                    Confirmar Eliminación
                </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className='bg-dark'>
                <p>¿Estás seguro de que deseas eliminar el producto <strong>{item.name}</strong>?</p>
            </ModalBs.Body>
            <ModalBs.Footer className='bg-dark'>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
            </ModalBs.Footer>
        </ModalBs>
    );
};

export default DeleteModal;
