import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { postMessage, clearNotifications } from './../../redux/actions/messagesActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function MessageForm() {
    const { user, messages } = useSelector(state => state)

    const dispatch = useDispatch();

    const { handleSubmit, errors,  setValue, control } = useForm();

    const onSubmit = (data) => {
        data.senderId = user.userId;
        dispatch(postMessage(data))
        setValue("receiverId", "")
        setValue("subject", "")
        setValue("message", "")
    }

    const onFocus = () => {
        dispatch(clearNotifications())
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                as={<TextField type="number" onFocus={onFocus} />}
                name="receiverId"
                control={control}
                defaultValue=""
                placeholder="receiver-Id"
                rules={{ required: true }}
            /><br />
            {/* <input onFocus={onFocus} type="number" placeholder="receiver-Id" name="receiverId" ref={register({ required: true })}></input><br /> */}
            <Controller
                as={<TextField type="text" onFocus={onFocus} />}
                name="subject"
                control={control}
                defaultValue=""
                placeholder="Subject"
                rules={{ required: true }}
            />
            <br />
            <Controller
                as={<TextField multiline variant="outlined"
                    rows={10} type="text" onFocus={onFocus} />}
                name="message"
                control={control}
                defaultValue=""
                placeholder="Message"
            />
            <br />




            <Button variant="contained"  onFocus={onFocus} disabled={messages.isFetching} type="submit"  >Submit</Button><br />

            {messages.notification && <Fragment><span style={{ color: 'green' }}>{messages.notification}</span><br /></Fragment>}
            {errors.receiverId && <Fragment> <span style={{
                color: 'red'
            }}>Please enter reciever id</span><br /></Fragment>}
            {errors.subject && <span style={{
                color: 'red'
            }}>Please enter subject</span>}
        </form>
    )
}
