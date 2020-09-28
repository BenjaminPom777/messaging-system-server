import React from 'react'
import { useForm } from 'react-hook-form';
import {useDispatch} from 'react-redux';
// import {postMessage} from './../../redux/actions/messagesActions';

export default function Register() {
    const dispatch = useDispatch();
    
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = (data) => {
        dispatch(postMessage(data))    
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        {errors.receiverId && <span style={{
           color: 'red'
       }}>Required</span>}
       <input type="text" placeholder="Username" name="username" ref={register({ required:true })}></input><br />
       {errors.subject && <span style={{
           color: 'red'
       }}>Required</span>}
       <input type="text" placeholder="Password" name="password" ref={register({ required:true})}></input><br />
                    
       <input type="submit" />
   </form>
    )
}
