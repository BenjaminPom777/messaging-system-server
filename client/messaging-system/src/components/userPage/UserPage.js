import React from 'react'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography';



export default function UserPage() {
  
    
    const { user } = useSelector(state => state)
    return (
        <div style={{
            marginTop:'30px',
            alignItems:'center',
            display:'flex',
            flexDirection:'column'
        }}>
            <Typography  variant="h4">Welcome to the messaging system</Typography>
         
            <Typography>User Name : {user.email}</Typography>
            <Typography>ID: {user.userId}</Typography>
        </div>
    )
}
