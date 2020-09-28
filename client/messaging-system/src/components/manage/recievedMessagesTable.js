import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getMessages } from '../../redux/actions/messagesActions';
import { deleteMessage } from '../../redux/actions/messagesActions';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function MessagesTable() {

    const { messages: messagesState , user} = useSelector(state => state)
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


    if (messages) {
        messages.map(msg => {
            if(msg.receiverId===user.userId){
                rows.push(createData(msg))
            }
        })
    }

    return (    
        <div>
        <TableContainer >
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Message</TableCell>
                        {/* <TableCell align="right">Subject</TableCell> */}
                        <TableCell align="right">Subject&nbsp;</TableCell>
                        {/* <TableCell align="right">Message&nbsp;(g)</TableCell> */}
                        <TableCell align="right">Sender&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow onClick={() => { deleteHandler(row.id) }} key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.message}
                            </TableCell>
                            <TableCell align="right">{row.message}</TableCell>
                            <TableCell align="right">{row.senderId}</TableCell>
                            {/* <TableCell align="right">{row.subject}</TableCell> */}
                            {/* <TableCell align="right">{row.senderId}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}
