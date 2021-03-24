// @flow

import React, { useEffect, useState } from 'react';
import { uuidv4 } from "uuidv4";
import '../App.css'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const apipah = require('../apiPath')
const useStyles1 = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '95%',
        textAlign: 'center'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: '100%',
        width: '100%',
    },
    control: {
        padding: theme.spacing(2),
    },
}));


export default function Chartac() {
    const classes1 = useStyles1();

    const [spacing, setSpacing] = React.useState(2);
    const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    };
    const [data, setData] = useState('');
    
    useEffect(() => {

        async function fetchdata() {

            const apidata = await fetch('http://localhost:4000/chartacApi/account')
            const getdataJson = await apidata.json();
            console.log(getdataJson)
            setData(getdataJson);
      
        }

        fetchdata();

    }, []
    )
    //for data input
    const classes = useStyles()
    const [lvlno, setlvlno] = useState('');
    const [lvl1, lvl1name] = useState('');
    const [lvl2, lvl2name] = useState('');
    const [lvl3, lvl3name] = useState('');
    const [lvl4, lvl4name] = useState('');
    const [titleID, setTitleID] = useState('');
    const [title, setTitle] = useState('');

    const forlvlno = (event) => {
        setlvlno(event.target.value);

    };

    const forlvlno1 = (event) => {
        lvl1name(event.target.value)
    }
    const forlvlno2 = (event) => {
        lvl2name(event.target.value)
    }

    const forlvlno3 = (event) => {
        lvl3name(event.target.value)
    }

    const forlvlno4 = (event) => {
        lvl4name(event.target.value)
    }

    const fortitleId = (event) => {
        setTitleID(event.target.value)
    }

    const fortitle = (event) => {
        setTitle(event.target.value)
    }
    return (
        <>
            <div style={{ backgroundColor: '#3f51b5' }}>
                <h1 style={{ textAlign: 'center' }}>Chart Of Account</h1>

                <h1>---This is data of our api</h1>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" spacing={spacing}>

                            <Paper style={{ backgroundColor: '#d5e7ff' }} className={classes.paper} >

                                <FormControl className={classes1.formControl}>

                                    <InputLabel id="demo-simple-select-helper-label">Level No</InputLabel>
                                    <Select
                                        style={{ borderRadius: '10px', color: '#fddb27ff', backgroundColor: '#00b1d2ff' }}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={lvlno}
                                        onChange={forlvlno}
                                    >
                                        <MenuItem value={'Level-One'}>Level One</MenuItem>
                                        <MenuItem value={'Level-Two'}>Level Two</MenuItem>
                                        <MenuItem value={'Level-Three'}>Level Three</MenuItem>
                                        <MenuItem value={'Level-Four'}>Level Four</MenuItem>
                                    </Select>

                                    <FormHelperText style={{ color: 'red' }}>Required</FormHelperText>
                                    <br />


                                    <TextField
                                        id="outlined-textarea"
                                        //style ={{borderRadius:'4px',color:'#fddb27ff',backgroundColor:'#00b1d2ff'}}
                                        label="Level One"
                                        placeholder="Level One"
                                        multiline
                                        variant="outlined"
                                        value={lvl1}
                                        onChange={forlvlno1}
                                    />

                                    <br />
                                    <TextField
                                        id="outlined-textarea"
                                        label="Level Two"
                                        placeholder="Level Two"
                                        multiline
                                        variant="outlined"
                                        value={lvl2}
                                        onChange={forlvlno2}
                                    />
                                    <br />
                                    <TextField
                                        id="outlined-textarea"
                                        label="Level Three"
                                        placeholder="Level Three"
                                        multiline
                                        variant="outlined"
                                        value={lvl3}
                                        onChange={forlvlno3}
                                    />
                                    <br />
                                    <TextField
                                        id="outlined-textarea"
                                        label="Level Four"
                                        placeholder="Level Four"
                                        multiline
                                        variant="outlined"
                                        value={lvl4}
                                        onChange={forlvlno4}
                                    />
                                    <br />
                                    <TextField
                                        id="outlined-textarea"
                                        label="Level Title ID "
                                        placeholder="Level Title ID"
                                        multiline
                                        variant="outlined"
                                        value={titleID}
                                        onChange={fortitleId}
                                    />
                                    <br />
                                    <TextField
                                        id="outlined-textarea"
                                        label="Level Title"
                                        placeholder="Level Title"
                                        multiline
                                        variant="outlined"
                                        value={title}
                                        onChange={fortitle}
                                    />

                                    <Button variant="contained" onClick={
                                        () => {

                                            const obj = 
                                            {   
                                                id:'root',
                                                name: lvl1,
                                                children:[
                                                        {name:lvl1+'1',children:[
                                                            {name:5+lvl1,children:[{
                                                              name:6+lvl1,
                                                            },],},
                                                        ],
                                                    },
                                                            {name:lvl1+'2'},
                                                            {name:lvl1+'3'},
                                                ],
                                            }
                                                //children:[ [id:3,name:lvl1,],id:4,name:lvl1,id:5,name:lvl1,],;
                                            //     level_ThreeName: lvl3,
                                            //     level_FourName: lvl4,
                                            //     level_titleID: titleID,
                                            //     level_title: title,
                                             
                                            axios.post(apipah.APIPATH + 'chartacApi/account/addAccount', obj)
                                                .then(res => console.log(res.data));
                                            setlvlno('')
                                            lvl1name('')
                                            lvl2name('')
                                            lvl3name('')
                                            lvl4name('')
                                            setTitle('')
                                            setTitleID('')
                                        }


                                    } color="primary">
                                        Save
                    </Button>
                                </FormControl>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
 
 
            </div>
        </>

    );
}
;