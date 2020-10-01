import React, { Fragment,useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister, userLogin } from './../../redux/actions/userActions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { clearMessages } from './../../redux/actions/userActions';
import { Route, Redirect } from "react-router-dom";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function Login() {
    const { user: { errorMessage, successMessage ,isLogedIn },ux } = useSelector(state => state)    

    const classes = useStyles();
    const dispatch = useDispatch();

    const { handleSubmit, errors, setValue, control } = useForm();

    const submitLogin = (data) => {
        console.log('login: ', data)
        dispatch(userLogin(data))
        setValue("userName", "")
        setValue("password", "")
    }

    const clearMessage = () => {
        dispatch(clearMessages())
    }




    return (      
        <div style={{
            textAlign:'center'
        }} >
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
                    as={<TextField onFocus={() => { clearMessage() }} />}
                    name="password"
                    control={control}
                    defaultValue=""
                    placeholder="password"
                    rules={{ required: true }}
                />

                <br />
                <Button variant="contained"  onClick={handleSubmit(submitLogin)}>Login</Button>
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
