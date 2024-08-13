import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import FormBs from 'react-bootstrap/Form';

const ProductModal = (props) => {
    const { item, onHide, onSubmit } = props;

    const initialCredentials = {
        nombre: item.name || '',
        cantidad: item.stock || '',
        precio: item.price || ''
    };

    const formSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(4, 'Nombre demasiado corto')
            .max(20, 'Nombre demasiado largo')
            .required('El campo es obligatorio'),
        cantidad: Yup.number()
            .required('El campo es obligatorio')
            .positive('La cantidad debe ser un número positivo'),
        precio: Yup.number()
            .required('El campo es obligatorio')
            .positive('El precio debe ser un número positivo')
    });

    return (
        <ModalBs
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalBs.Header closeButton className='bg-dark'>
                <ModalBs.Title id="contained-modal-title-vcenter">
                    Editar Producto
                </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className='bg-dark'>
                <Formik 
                    initialValues={initialCredentials}
                    validationSchema={formSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        // same shape as initial values
                        console.log(values);
                        await onSubmit(item.id, values);
                        setSubmitting(false);
                        onHide();
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='nombre'>Nombre del producto</label>
                                <Field id='nombre' type='text' placeholder='Buzo' name='nombre' className='form-control field-input' />
                                <ErrorMessage name='nombre' component='div' className='text-danger' />
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='cantidad'>Cantidad</label>
                                <Field id='cantidad' type='number' placeholder='5' name='cantidad' className='form-control field-input' />
                                <ErrorMessage name='cantidad' component='div' className='text-danger' />
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='precio'>Precio</label>
                                <Field id='precio' type='number' placeholder='8000' name='precio' className='form-control field-input' />
                                <ErrorMessage name='precio' component='div' className='text-danger' />
                            </FormBs.Group>

                            <Button className='btn btn-primary' type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando producto...' : 'Actualizar producto'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </ModalBs.Body>
            <ModalBs.Footer className='bg-dark'>
                <Button onClick={onHide}>Cerrar</Button>
            </ModalBs.Footer>
        </ModalBs>
    );
}

export default ProductModal;
