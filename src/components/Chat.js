import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '..';
import Loader from './Loader';
import { serverTimestamp,  collection, addDoc, orderBy, query} from "firebase/firestore"; 
import { useCollectionData, } from "react-firebase-hooks/firestore"
import ScrollableFeed from 'react-scrollable-feed'
import SendIcon from '@mui/icons-material/Send';
import Message from './Message'
import "./Chat.css"
import WhiteButton from '../ui/WhiteButton/WhiteButton';


const Chat = () => {
    
    const [user]  = useAuthState(auth)
    const [value, setValue] = useState('')
    const messagesColection = collection(db, "messages")
    const queryMessages = query(messagesColection, orderBy("createdAt"));
    const [messages, loading] = query(useCollectionData(queryMessages, orderBy('createdAt')))
    
    const sendMessage = async() => {
        await addDoc(messagesColection, {
                // id: PlusId()
                displayName: user.displayName,
                uid: user.uid,
                photoURL: user.photoURL,
                text: value,
                createdAt: serverTimestamp(),
          });
          setValue('')
    }

    if (loading) {
        return <Loader/>
    }
  
    return (
        <Container className={"chatPage"}>
            <Grid Container
                justifyContent={"center"}
                alignItems={"center"}
                className={"containerMessages"}
            >
                <div style={{height: '75vh', overflowY: 'auto', marginBottom: "15px"}}>
                    <ScrollableFeed id={"forScroll"}>
                        {messages.map( (message) => 
                            
                            <div
                                key={message} 
                                className='containerMessage'
                                style={{
                                margin:10,
                                boxShadow: user.uid === message.uid ? '6px 0px 12px 0px #943ba38f' : 'rgb(0 0 0 / 25%) 2px -3px 6px 2px',
                                background: user.uid === message.uid ? 'linear-gradient(120deg, #248a52, #257287)' : 'rgba(0, 0, 0, .3)',
                                textShadow: user.uid === message.uid ? 'none' : '0 1px 1px rgb(0 0 0 / 20%)',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                borderRadius: user.uid === message.uid ? '10px 10px 0 10px' : '10px 10px 10px 0',
                                width: 'fit-content',
                                }}>
                                <Message
                                    uid={message.uid}
                                    name={message.displayName}
                                    avatar={message.photoURL}
                                    text={message.text}
                                ></Message>
                            </div>

                        )}
                    </ScrollableFeed>
                </div>
                {(value !== '') ?   
                    <Grid 
                        container
                        direction={"column"}
                        alignItems={"flex-end"}
                        marginBottom={"10px"}
                        className={"areaMessage"}
                    >
                        <TextField 
                            fullWidth
                            maxRows={2}
                            variant={"outlined"}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            marginBottom={"10px"}
                            />
                        <WhiteButton
                            // onKeyPress={(event) => {
                            //     if(event.key === "Enter") {
                            //         return sendMessage
                            //     }
                            // }} 
                            size="large" 
                            onClick={sendMessage} 
                            variant={"outlined"} 
                            endIcon={<SendIcon />}
                            spacing={2}
                            style={{position:"relative", top: "5px"}} 
                        >
                            Send
                        </WhiteButton>
                        
                    </Grid>                                
                :
                    <Grid 
                        container
                        direction={"column"}
                        alignItems={"flex-end"}
                        marginBottom={"10px"}
                        className={"areaMessage"}
                        >
                        <TextField
                            error
                            fullWidth
                            id="outlined-error"
                            label="Write a message"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <Button style={{position:"relative", top: "5px"}} spacing={2} size="large" disabled variant={"outlined"} endIcon={<SendIcon />}>Send</Button>
                </Grid>  
                }    
            </Grid>
        </Container>
    );
}

export default Chat;
