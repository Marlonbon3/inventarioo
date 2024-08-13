import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './formulario.css';
import { axiosInstance } from '../../services/axios.config';

const FormCreateProduct = () => {
    const initialValues = {
        nombre: '',
        cantidad: '',
        precio: ''
    };

    const formSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(4, 'Nombre demasiado corto')
            .max(20, 'Nombre demasiado largo')
            .required('El campo es obligatorio'),
        cantidad: Yup.number()
            .required('El campo es obligatorio')
            .positive('Debe ser un número positivo')
            .integer('Debe ser un número entero'),
        precio: Yup.number()
            .required('El campo es obligatorio')
            .positive('Debe ser un número positivo')
            .min(0, 'El precio no puede ser negativo')
    });

    return (
        <div className='container'>
            <Formik
                initialValues={initialValues}
                validationSchema={formSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axiosInstance.post('/', values)
                        .then(response => {
                            if (response.status === 201) {
                                console.log(response);
                                setSubmitting(false);
                            } else {
                                throw new Error(`[${response.status}] error en la solicitud`);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            setSubmitting(false);
                        });
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <FormBs.Group className='mb-3'>
                            <FormBs.Label htmlFor='nombre'>Nombre del producto</FormBs.Label>
                            <Field
                                id='nombre'
                                type='text'
                                placeholder='Nombre del producto'
                                name='nombre'
                                className='form-control field-input'
                            />
                            <ErrorMessage name='nombre' component='div' className='text-danger' />
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <FormBs.Label htmlFor='cantidad'>Cantidad</FormBs.Label>
                            <Field
                                id='cantidad'
                                type='number'
                                placeholder='Cantidad'
                                name='cantidad'
                                className='form-control field-input'
                            />
                            <ErrorMessage name='cantidad' component='div' className='text-danger' />
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <FormBs.Label htmlFor='precio'>Precio</FormBs.Label>
                            <Field
                                id='precio'
                                type='number'
                                placeholder='Precio'
                                name='precio'
                                className='form-control field-input'
                            />
                            <ErrorMessage name='precio' component='div' className='text-danger' />
                        </FormBs.Group>

                        <Button className='btn btn-primary' type="submit" disabled={isSubmitting}>
                            Cargar producto
                        </Button>
                        {isSubmitting && <p>Enviando producto...</p>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateProduct;
