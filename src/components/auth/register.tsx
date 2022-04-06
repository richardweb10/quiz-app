import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/box.module.scss'
import stylesHome from '../../pages/home/style.module.scss';
import ModalResponse from '../layout/modal/modalResponse';
import { connect } from 'react-redux'
import * as authAction from '../../actions/auth'
import { bindActionCreators } from 'redux'
import {handlerIsLogin} from '../../utils';
import Button from '@mui/material/Button';


function Register(props: any) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [validEmail, setValidEmail] = useState(true);

   

    useEffect(() => {
        if (props.data !== undefined) {
            setTitleError('Registro');
            setMessageError('Te registraste con exito!".');
            setOpenModal(true);
            handlerIsLogin(props.data);
        }
    }, [props.data])

    useEffect(() => {
        if (props.error) {
            if (props.error.status === 400) {
                setTitleError('Error en la operación');
                setMessageError(props.error.message);
            } else if (props.error.status === 401) {
                setTitleError('Ocurrió un error');
                setMessageError('Revisa los datos que has ingresado y vuelve a intentarlo');
            } else {
                setTitleError('Ocurrió un error');
                setMessageError('Por favor comunícate con soporte');
            }
            setOpenModal(true);
        }


    }, [props.error])


    const onChangeText = (e: any) => {
        switch (e.target.name) {
            case 'name':                
                setName(e.target.value);        
                break;
            case 'email':
                setValidEmail(/^[a-z0-9._%+-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value))
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    
    }


      const onRegister = (e: any) => {
        e.preventDefault();
        if ((name.trim() !== null && name.trim() !== '' && name.trim().length > 3) &&
        (email !== null && email !== '' && /^[a-z0-9._%+-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) &&
        (password !== null && password !== '')) {

            const data = {
                name: name.trim(),
                email: email,
                password: password,
            }
            props.actions.register(data);
        } else {
            setTitleError('Validación');
            setMessageError('Debe ingresar todos los campos');
            setOpenModal(true);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }


    return (
        <>
            <h3>Registrate con el correo electrónico</h3>

            <div className={styles.boxInput}>
                <input
                    className={styles.field}
                    type="text"
                    name="name"
                    placeholder="Nombres completos"
                    value={name}
                    onChange={(e: any) => { onChangeText(e) }}
                />
            </div>

            <div className={[styles.boxInput, !validEmail? styles.fieldBad:''].join(' ')}>
                <input
                    className={styles.field}
                    type="text"
                    name="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e: any) => { onChangeText(e) }}
                />
            </div>

            <div className={styles.boxInput}>
                <input
                    className={styles.field}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e: any) => { onChangeText(e) }}
                />

            </div>

            
            <br />

            <Button 
                onClick={onRegister}
                sx={{marginTop: '20px'}}
                variant="contained">
                    Enviar
            </Button>

            
            <ModalResponse
            title={titleError}
            message={messageError}
            open={openModal}
            closeModal={closeModal}
            />

        </>
    )
}

const mapStateToProps = (state: any) => ({
    isLoading: state.auth.isLoading,
    data: state.auth.data,
    error: state.auth.error,
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(authAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);