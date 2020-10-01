import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

import { deleteMessage } from '../../redux/actions/messagesActions';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function MessagesTable({type}) {
    const { messages: messagesState, user } = useSelector(state => state)
    const { messages } = messagesState;

    const rows = []
    const classes = useStyles();

    function createData({ id, message, receiverId, senderId, subject }) {
        return { id, message, receiverId, senderId, subject };
    }

    const dispatch = useDispatch();

    const deleteHandler = (rowId) => {
        dispatch(deleteMessage(rowId))
    }

    if (type==='recieved'){
        if (messages) {
            messages.forEach(msg => {
                if (msg.receiverId === user.userId) {
                    rows.push(createData(msg))
                }
            })
        }
    }else{
        if (messages) {
            messages.forEach(msg => {
                if (msg.senderId === user.userId) {
                    rows.push(createData(msg))
                }
            })
        }
    }
   

    return (
        <div>
            <TableContainer component={Paper} >
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Message</TableCell>                            
                            <TableCell align="right">Subject&nbsp;</TableCell>
                            
                            {type === 'recieved' ?<TableCell align="right">Sender&nbsp;</TableCell>:
                                <TableCell align="right">Reciever&nbsp;</TableCell>
                            }
                            <TableCell align="right">DELETE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.message}
                                </TableCell>
                                <TableCell align="right">{row.message}</TableCell>
                                <TableCell align="right">{type === 'recieved' ? row.senderId : row.receiverId}</TableCell>
                                <TableCell  align="right"><Button variant="outlined" color="secondary" onClick={() => deleteHandler(row.id)}>Delete</Button></TableCell>                             
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
