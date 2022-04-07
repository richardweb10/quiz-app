import React, { useState, useEffect } from "react";
import stylesThis from '../../pages/create/styles.module.scss';
import TextField from '@mui/material/TextField';
import {  FaTrashAlt } from 'react-icons/fa';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';

export default function FieldsOption(props: any) {


    const handleChange = (event: SelectChangeEvent) => {
        console.log("jirme")
      };

    return (
        <>
            {props.fields.map((val: any, id: any) => (
                <div key={id} className={stylesThis.boxInputs}>
                   
                    <div className={stylesThis.boxLeft}>
                        <TextField
                            id="outlined-multiline-static"
                            label={"Opción "+(id+1)}
                            fullWidth sx={{ margin: 0 }}
                            name="value"
                            value={val.value}
                            inputProps={{ maxLength: 500 }}
                            onChange={(e:any)=>props.handleChangeOption(e, val.id,'value')}
                        />
                    </div>
                    <div className={stylesThis.boxRight}>
                     {id==0?<div style={{marginTop: '-10px', fontSize: '14px', fontWeight: 600 }}>Correcta</div>:null  } 
                    <Radio
                        checked={props.correct === val.id}
                        onChange={(e:any)=>props.handleChangeOption(e, val.id,'correct',val.question)}
                        value={val.id}
                        name={"radio-buttons"+val.question}
                        inputProps={{ 'aria-label': "Opción "+(id+1) }}
                    />
                    </div>
                    <div 
                    style={{cursor: "pointer"}}
                    className={stylesThis.iconEquals} 
                    onClick={() =>  props.removeOption(val.id, val.question) }><FaTrashAlt size={25} /></div>


                </div>
            ))}
        </>

    )

}