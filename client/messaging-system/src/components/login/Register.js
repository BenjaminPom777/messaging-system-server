import React, { Fragment,useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister, userLogin } from './../../redux/actions/userActions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { clearMessages } from './../../redux/actions/userActions';
import { Route, Redirect } from "react-router-dom";
import passport from 'passport';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));



export default function Register() {
    const { user: { errorMessage, successMessage ,isLogedIn } } = useSelector(state => state)    

    const classes = useStyles();
    const dispatch = useDispatch();

    const { handleSubmit, errors, setValue, control } = useForm();

    const submitRegister = (data) => {
        dispatch(userRegister(data))
        console.log('register: ', data)
        setValue("userName", "")
        setValue("password", "")
    }

    const clearMessage = () => {
        dispatch(clearMessages())
    }


   


    return (      
        <div>
            {isLogedIn &&<Redirect 
                to="/"
            /> }
            
            <form className={classes.root} >
                <Controller
                    as={<TextField onFocus={() => { clearMessage() }} />}
                    name="userName"
                    control={control}
                    defaultValue=""
                    placeholder="name"
                    rules={{ required: true }}
                />
                <br />

                <Controller
                    as={<TextField type='password' onFocus={() => { clearMessage() }} />}
                    name="password"
                    control={control}
                    defaultValue=""
                    placeholder="password"
                    rules={{ required: true }}
                />

                <br />
               
                <Button variant="contained" color="primary" onClick={handleSubmit(submitRegister)}>Register</Button>
                <br />
                {errorMessage && <Fragment><span style={{
                    color: 'red'
                }}>{errorMessage}</span> <br /></Fragment>}

                {successMessage && <Fragment> <span style={{
                    color: 'green'
                }}>{successMessage}</span>  <br /></Fragment>}

                {errors.userName && <Fragment><span style={{
                    color: 'red'
                }}>Please enter your name</span>  <br /></Fragment>}

                {errors.password && <span style={{
                    color: 'red'
                }}>Please enter Password</span>}
            </form>
        </div>
    )
}
