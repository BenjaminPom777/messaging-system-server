import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch,useSelector } from 'react-redux';
import { userRegister, userLogin } from './../../redux/actions/userActions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { register, handleSubmit, errors, reset, control } = useForm();

    const submitLogin = (data) => {
        console.log('login: ', data)
        dispatch(userLogin(data))
        // reset()
    }

    const submitRegister = (data) => {
        dispatch(userRegister(data))
        console.log('register: ', data)
        // reset()
    }

    const {user:{error}}=useSelector(state=>state)
    
    
    return (
        <div>
            {error && <span style={{
                color:'red'
            }}>{error}</span>}
        <form className={classes.root} >            
            <Controller
                as={<TextField />}
                name="userName"
                control={control}
                defaultValue=""
                placeholder="name"
                rules={{ required: true }}
            // ref={register({required:true})}
            />
            {errors.userName && <span style={{
                color: 'red'
            }}>Please enter your name</span>}
            <br />
                        
            <Controller
                as={TextField}
                name="password"
                control={control}
                defaultValue=""
                placeholder="password"
                rules={{ required: true }}
            // ref={register({required:true})}
            />
            {errors.password && <span style={{
                color: 'red'
            }}>Please enter Password</span>}
             <br />
            <button onClick={handleSubmit(submitLogin)}>Login</button>
            <br />
            <button onClick={handleSubmit(submitRegister)}>Register</button>
            <br />
            {/* <input type="submit" /> */}
        </form>
        </div>
    )
}
