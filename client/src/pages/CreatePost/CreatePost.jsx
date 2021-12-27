import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import './CreatePost.css'
import { useNavigate } from 'react-router-dom';

function CreatePost() {

    let navigate = useNavigate();

    const initialValues = {
        title: '',
        postText: '',
        username: ''
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Debes poner un título'),
        postText: Yup.string().required('Es necesario colocar un texto'),
        username: Yup.string().min(3).max(15).required('Campo vacío')
    })

    const onSubmit = (data) => {
        Axios.post('http://localhost:3001/posts', data).then((response) => {
            navigate('/')
        })
    }

    return (
        <div className='create-post-page'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='form-container'>
                    <label>Título</label>
                    <Field
                        autoComplete='off'
                        id='inputCreatePost'
                        name='title'
                        placeholder='Título'
                    />
                    <ErrorMessage name='title' component='span' />
                    <label>Publicación</label>
                    <Field
                        autoComplete='off'
                        id='inputCreatePost'
                        name='postText'
                        placeholder='Publicación'
                    />
                    <ErrorMessage name='postText' component='span' />
                    <label>Nombre de usuario</label>
                    <Field
                        autoComplete='off'
                        id='inputCreatePost'
                        name='username'
                        placeholder='John...'
                    />
                    <ErrorMessage name='username' component='span' />
                    <button type='submit'> Crear publicación </button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
