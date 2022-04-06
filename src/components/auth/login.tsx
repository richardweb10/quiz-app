import React, { useState, useEffect, useRef} from 'react';
import styles from '../styles/box.module.scss'
import stylesHome from '../../pages/home/style.module.scss';
import Button from '@mui/material/Button';
import ModalResponse from '../layout/modal/modalResponse';
import { connect } from 'react-redux'
import * as authAction from '../../actions/auth'
import { bindActionCreators } from 'redux'
import {handlerIsLogin} from '../../utils';


function Login(props: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [openModal, setOpenModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        if (props.dataLogin !== undefined) {
            handlerIsLogin(props.dataLogin);
        }
    }, [props.dataLogin])

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
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    
    }

      const onLogin = (e: any) => {
        e.preventDefault();
        if ( email !== '' && password !== '') {
            const data = {
                username: email,
                password: password,
            }
            props.actions.login(data);
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
            <h3 style={{textAlign: 'center'}}>Iniciar con el correo electrónico</h3>

            <div className={styles.boxInput}>

            <input
                    className={styles.field}
                    type="text"
                    name="email"
                    id="emailLogin"
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
                    id="passLogin"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e: any) => { onChangeText(e) }}
                />

            </div>

            <Button 
                onClick={onLogin}
                sx={{marginTop: '20px'}}
                variant="contained">
                    Iniciar sesión
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
    dataLogin: state.auth.dataLogin,
    error: state.auth.error,
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(authAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);