import React from 'react';
import { Avatar, Grid } from '@mui/material';
import "./Message.css"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '..';

const Message = (props) => {
    const [user]  = useAuthState(auth)
    
    return (
        <div className='Message'>
            <Grid container>
                <div className="avatar__name">
                <Avatar 
                    alt={props.name} 
                    src={props.avatar}
                    sx={{ width: 24, height: 24 }}
                    />
                    
                <div className='name'>{props.name}</div>
                </div>
            </Grid>
          
         <div
            style={{
                display: "flex",
                justifyContent: user.uid === props.uid ? 'flex-end' : 'flex-start;',
            }}
         >{props.text}</div>
        </div>
    );
}

export default Message;
