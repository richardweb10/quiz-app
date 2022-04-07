import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import ModalResponse from '../layout/modal/modalResponse';
import { connect } from 'react-redux'
import * as questionnariesAction from '../../actions/questionnaries'
import { bindActionCreators } from 'redux'
import { get } from '../../utils/SesionStorage';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ModalConfirm from '../layout/modal/modalConfirm';
import { Link } from "react-router-dom";

function Questionnaire(props: any) {

    const [dataQuest, setDataQuest] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [modalConfirm, setModalConfirm] = React.useState(false);
    const [nameQuest, setNameQuest] = React.useState('');
    const [idQuest, setIdQuest] = React.useState('');
    const [id_user, setId_user] = useState('');

    useEffect(() => {
        const id: any = get('@id_user');
        setId_user(id)
        props.actions.getQuest({})
    }, [])

    useEffect(() => {
        if (props.data) {
            setDataQuest(props.data);
        }
    }, [props.data])

    useEffect(() => {
        if (props.dataDel) {
            setModalConfirm(false)
            props.actions.clearDelQuest({})
            props.actions.getQuest({})
        }

    }, [props.dataDel])

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



    const closeModal = () => {
        setOpenModal(false);
    }

    const modalConfirmClose = () => {
        setModalConfirm(false)
    }

    const modalConfirmShow = (name: any, id: any) => {
        setModalConfirm(true)
        setNameQuest(name);
        setIdQuest(id);
    }

    const onDelete = () => {
        props.actions.deleteQuest({ idQuest })
    }


    return (
        <>
            <h3 style={{ textAlign: 'center' }}>Cuestionarios</h3>

            <List >
                {dataQuest.map((val: any, id: any) => (
                    <>
                        <ListItem
                            secondaryAction={
                                <List >
                                    <IconButton edge="end" aria-label="Jugar">
                                        <Link to={"/play/" + val._id}><PlayCircleIcon color="primary" /></Link>
                                    </IconButton>
                                    {val.user == id_user ?
                                        <>
                                            <IconButton edge="end" aria-label="Editar">
                                                <Link to={"/update/" + val._id}><EditIcon color="secondary" /></Link>
                                            </IconButton>
                                            <IconButton onClick={() => modalConfirmShow(val.name, val._id)} edge="end" aria-label="Eliminar">
                                                <DeleteIcon color="action" />
                                            </IconButton>
                                        </> : null}

                                </List>

                            }
                        >

                            <ListItemText
                                primary={val.name}
                            />
                        </ListItem>
                        <Divider component="li" />
                    </>
                ))

                }
            </List>


            <ModalResponse
                title={titleError}
                message={messageError}
                open={openModal}
                closeModal={closeModal}
            />

            <ModalConfirm
                open={modalConfirm}
                onClose={modalConfirmClose}
                onAction={onDelete}
                content={'¿Seguro de eliminar el cuestionario "' + nameQuest + '"?'} />


        </>
    )
}

const mapStateToProps = (state: any) => ({
    isLoading: state.quest.isLoading,
    data: state.quest.dataQuest,
    error: state.quest.errorQuest,
    isLoadingDel: state.quest.isLoadingDel,
    dataDel: state.quest.dataDel
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(questionnariesAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);