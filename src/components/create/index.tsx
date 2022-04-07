import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import ModalResponse from '../layout/modal/modalResponse';
import { connect } from 'react-redux'
import * as questionnariesAction from '../../actions/questionnaries'
import { bindActionCreators } from 'redux'
import { handlerIsLogin } from '../../utils';
import TextField from '@mui/material/TextField';
import FieldsQuestion from './question';
import AddIcon from '@mui/icons-material/Add';

function Login(props: any) {

    const [name, setName] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [questions, setQuestions] = useState<Array<any>>([{ id: 0, value: "", correct: 0 }]);
    const [options, setOptions] = useState<Array<any>>(
        [
            { id: 0, question: 0, value: "" },
            { id: 1, question: 0, value: "" },
        ])

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




    const onSave = (e: any) => {
        e.preventDefault();
        if (name !== '' && validData(questions) && validData(options) ) {
            const data = {
                name,
                questions,
                options
            }
            props.actions.create(data);
        } else {
            setTitleError('Validación');
            setMessageError('Debe ingresar todos los campos');
            setOpenModal(true);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    const validData = (data:any) =>{
        let valid = true;
        for( const d of data){
            if(d.value === "" ){   
               valid = false;
               break;
            }
         }
         return valid;
    }


    const addQuestion = (e: any) => {
        var opt: any = options.slice(-1)[0];
        var ques: any = questions.slice(-1)[0];
        setOptions((preOptions: any) => ([...preOptions,
        { id: (opt.id + 1), question: (ques.id +1), value: "" },
        { id: (opt.id + 2), question: (ques.id +1), value: "" }]));
        setQuestions((preQuestions: any) => ([...preQuestions, { id: (ques.id +1), value: "", correct: (opt.id + 1) }]));

    }

    const removeQuestion = (id: any) => {
        let questionField = questions.filter((elem: any) => elem.id != id);
        setQuestions(questionField);
        var filtered = options.filter((elem: any) => elem.question != id);
        setOptions(filtered);
    }

    const changeQuestion = (value:any, key:any, id:any) =>{
        let questionField = [...questions];
        const index = questionField.map(elem => elem.id).indexOf(id);
        questionField[index][key] = value;
        setQuestions(questionField);
    }

    const handleChangeQuestion = (e: any, id: any) => {
        changeQuestion(e.target.value, 'value', id );
    }

    const handleChangeOption = (e: any, id: any, type:any, questionOp:any) => {

        let optionField = [...options];
        const index = optionField.map(elem => elem.id).indexOf(id);

        if(type=='value'){
            optionField[index][type] = e.target.value;
        }else{
            changeQuestion(id, 'correct', questionOp );
        }
        setOptions(optionField);
    }

    

    const addOptions = (id: any) => {
        const op = options.filter((elem: any) => elem.question == id)
        if (op.length < 10) {
            var opt: any = options.slice(-1)[0];
            setOptions((preOptions: any) => ([...preOptions, { id: (opt.id + 1), question: id, value: "" }]));
        } else {
            setTitleError('Validación');
            setMessageError('Esta pregunta ya tiene el máximo de opciones');
            setOpenModal(true);
        }
    }

    const removeOption = (id: any, quest: any) => {

        const op = options.filter((elem: any) => elem.question == quest)
        if (op.length > 2) {
            var filtered = options.filter((elem: any) => elem.id != id);
            setOptions(filtered);
        } else {
            setTitleError('Validación');
            setMessageError('Esta pregunta ya tiene el mínimo de opciones');
            setOpenModal(true);
        }
    }

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>Crea tu Cuestionario</h3>

            <TextField
                fullWidth sx={{ margin: 0 }}
                id="outlined-basic"
                variant="outlined"
                name="value"
                label="Nombre del cuestionario"
                value={name}
                inputProps={{
                    maxLength: 100,
                    autoComplete: 'off'
                }}
                onChange={(e: any) => setName(e.target.value)}
            />

            <FieldsQuestion
                fields={questions}
                options={options}
                addOptions={addOptions}
                removeOption={removeOption}
                removeQuestion={removeQuestion}
                handleChangeQuestion={handleChangeQuestion}
                handleChangeOption={handleChangeOption}
            />

            <div style={{ justifyContent: 'center', display: 'grid' }}>
                <Button
                    onClick={addQuestion}
                    sx={{ marginTop: '20px' }}
                    variant="outlined">
                    <div style={{ display: "flex" }}><AddIcon /> Agregar Pregunta</div>
                </Button>

                <Button
                    onClick={onSave}
                    sx={{ marginTop: '20px' }}
                    variant="contained">
                    Guardar
                </Button>

            </div>



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
    isLoading: state.quest.isLoading,
    data: state.quest.data,
    error: state.quest.error,
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(questionnariesAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);