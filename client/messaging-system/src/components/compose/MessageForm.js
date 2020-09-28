import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { postMessage } from './../../redux/actions/messagesActions';

export default function MessageForm() {
    const { user, messages } = useSelector(state => state)

    const dispatch = useDispatch();

    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = (data) => {
        data.senderId = user.userId;
        dispatch(postMessage(data))
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.receiverId && <span style={{
                color: 'red'
            }}>Required</span>}
            <input type="number" placeholder="receiver-Id" name="receiverId" ref={register({ required: true })}></input><br />
            {errors.subject && <span style={{
                color: 'red'
            }}>Required</span>}
            <input type="text" placeholder="Subject" name="subject" ref={register({ required: true })}></input><br />

            <textarea placeholder="Message" rows="10" name="message" ref={register}></textarea><br />
            {/* <input type="text" placeholder="Subject" name="subject" ref={register}></input><br /> */}
            <input disabled={messages.isFetching} type="submit" />
        </form>
    )
}
