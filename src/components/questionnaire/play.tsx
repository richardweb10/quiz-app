import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import ModalResponse from '../layout/modal/modalResponse';
import { connect } from 'react-redux'
import * as questionnariesAction from '../../actions/questionnaries'
import { bindActionCreators } from 'redux'
import { handlerIsLogin } from '../../utils';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

function PlayQuestionnaire(props: any) {

    const [dataQuest, setDataQuest] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [modalConfirm, setModalConfirm] = React.useState(false);
    const [nameQuest, setNameQuest] = React.useState('');
    const [idQuest, setIdQuest] = React.useState('');
    const [questions, setQuestions] = useState<Array<any>>([]);
    const [options, setOptions] = useState<Array<any>>([])
    const [name, setName] = useState('');
    const [resultQuest, setResultQuest] = useState(false);

    useEffect(() => {
        if(props.idQuest){
            props.actions.getQuestById({ idQuest: props.idQuest });
        }
    },[])

    useEffect(() => {
        if (props.dataById) {
            setName(props.dataById.name);
            setQuestions(props.dataById.listQuestions);
            setOptions(props.dataById.listOptions);
        }
    }, [props.dataById])

    useEffect(() => {
        if(props.idQuest == ''){
            initState();
        }
    },[props.idQuest])

    const initState = () => {
        setName('');
        setQuestions([]);
        setOptions([]);
    }

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

    const modalConfirmShow = () => {
        setModalConfirm(true)
    }

    const changeOption = (event: React.ChangeEvent<HTMLInputElement>, id:any) => {
        let questionField = [...questions];
        const index = questionField.map(elem => elem.id).indexOf(id);
        questionField[index]['correctChange'] = (event.target as HTMLInputElement).value;
        setQuestions(questionField);
    }

    const validData = (data:any) =>{
        let valid = true;
        for( const d of data){
            if(!d.hasOwnProperty('correctChange')){   
               valid = false;
               break;
            }
         }
         return valid;
    }

    const onResult = (data:any) =>{
        let ok = 0;
        for( const d of data){
            if(d.correctChange == d.correct){   
               ok++;
            }
         }
         return ok;
    }

    const onSave = () => {
        if(validData(questions)){
            const ok = onResult(questions);
            setTitleError('Resultados');
            setMessageError('Acertaste en '+ ok + ' respuestas :D');
            setOpenModal(true);
            setResultQuest(true);
        }else{
            setTitleError('Validación');
            setMessageError('Debes responder todas las preguntas para poder enviar el cuestionario.');
            setOpenModal(true);
        }
    }

    const getOptions = (id:any,) =>{
        return  options.filter((elem:any) => elem.question==id);
     }


    return (
        <>
            <h3 style={{ textAlign: 'center' }}>{"Cuestionario: "+name}</h3>

            <List >
              {questions.map((valq:any,id:any) =>(
                  <>
                  <ListItem>
                  
                  
                  <FormControl>
                  <Typography sx={{fontWeight: 600}} >{ (id+1)+". "+valq.value}</Typography>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={valq.correctChange}
                        onChange={(e)=>changeOption(e,valq.id)}
                    >
                        {getOptions(valq.id).map((val:any, id:any)=>(
                            <FormControlLabel sx={{color: resultQuest?(valq.correct == val.id? 'green':'red'):'#000'}} key={id} value={val.id} control={<Radio />} label={val.value} />
                        ))}
                    </RadioGroup>
                    </FormControl>
                  
                </ListItem>
                <Divider  component="li" />
                </>
              ))
                
              }
            </List>

                <Button
                    onClick={onSave}
                    sx={{ marginTop: '20px' }}
                    variant="contained">
                    Enviar
                </Button>


            <ModalResponse
                title={titleError}
                message={messageError}
                open={openModal}
                closeModal={closeModal}
            />

                <ModalConfirm
                open={modalConfirm}
                onClose={modalConfirmClose}
                onAction={onSave}
                content={'¿Seguro de enviar el cuestionario?'} />


        </>
    )
}

const mapStateToProps = (state: any) => ({
    isLoading: state.quest.isLoading,
    data: state.quest.dataQuest,
    error: state.quest.errorQuest,
    isLoadingById: state.quest.isLoadingById,
    dataById: state.quest.dataById,
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(questionnariesAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayQuestionnaire);