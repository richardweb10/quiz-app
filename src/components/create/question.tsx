import React, { useState, useEffect } from "react";
import stylesThis from '../../pages/create/styles.module.scss';
import TextField from '@mui/material/TextField';
import {  FaTrashAlt } from 'react-icons/fa';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Options from './option'; 

export default function FieldsQuestion(props: any) {

    const getOptions = (id:any,) =>{
       return  props.options.filter((elem:any) => elem.question==id);
    }


    return (
        <>
            {props.fields.map((val: any, id: any) => (
                <div className={stylesThis.boxQuestion}>
                <div key={id} className={stylesThis.boxInputs}>
                   
                    <div className={stylesThis.bInput}>
                        <TextField
                            id="outlined-multiline-static"
                            label={"Pregunta "+(id+1)}
                            fullWidth sx={{ margin: 0 }}
                            name="value"
                            value={val.value}
                            inputProps={{ maxLength: 500 }}
                            onChange={(e:any)=>props.handleChangeQuestion(e, val.id)}
                        />
                    </div>
                    <div 
                    style={{cursor: "pointer"}}
                    className={stylesThis.iconEquals} 
                    onClick={() =>  props.removeQuestion(val.id) }><FaTrashAlt size={25} /></div>

                </div>

                <div style={{margin:'20px', textAlign: 'center'}}>
                    <Options
                        fields={getOptions(val.id)}
                        correct={val.correct}
                        removeOption={props.removeOption}
                        handleChangeOption={props.handleChangeOption}
                    />

                    <Button 
                    onClick={() =>props.addOptions(val.id)}
                    sx={{margin: '0 auto'}}
                    variant="outlined">
                        <div style={{display: "flex"}}><AddIcon /> Agregar Opción</div>
                    </Button>

                </div>

                
                </div>
            ))}
        </>

    )

}