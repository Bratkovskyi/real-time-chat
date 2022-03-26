import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '..';
import Loader from './Loader';
import { serverTimestamp,  collection, addDoc, orderBy, query} from "firebase/firestore"; 
import { useCollectionData, } from "react-firebase-hooks/firestore"
// import SendIcon from '@mui/icons-material/Send';
import Message from './Message'
import "./Chat.css"


const Chat = () => {
    const [user]  = useAuthState(auth)
    const [value, setValue] = useState('')
    
    // const messagesColection = collection(db, "messages")
    const messagesColection = collection(db, "messages")

    const queryMessages = query(messagesColection, orderBy("createdAt"));
    // const qwe = async() => {
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.data())
    //     });
    // }
    // qwe()

    const [messages, loading] = query(useCollectionData(queryMessages, orderBy('createdAt')))
    // console.log("messages", messages)
 
    // const citiesRef = collection(db, 'cities');
    // citiesRef(orderBy("state"))
    // console.log("q", q())
    // console.log("citiesRef",citiesRef)

    // const q = query(collection(db, "cities"), orderBy("population"));
    // const qwe = async() => {
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // }
    // qwe()
  
    
    // console.log(qwe())
    // messages.map( e=>  console.log(e.createdAt))


    // console.log("messagesColection",messagesColection)
    // const q = query(messagesColection, orderBy("createdAt"))
    // console.log("q", q)

    // orderBy(messagesColection, "messages", 'createdAt')


    const sendMessage = async() => {

        await addDoc(messagesColection, {
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
        <Container>
            <Grid Container
                justifyContent={"center"}
                alignItems={"center"}
                className={"containerMessages"}
                // style={{height: window.innerHeight - 50}}
            >
                <div style={{height: '80vh', border:'1px solid gray', overflowY: 'auto', marginBottom: "15px"}}>
                    {messages.map( message => 
                        <div 
                            className='containerMessage'
                            style={{
                            margin:10,
                            background: user.uid === message.uid ? 'linear-gradient(333deg, #253be2b3, #00000000)' : 'linear-gradient(333deg, #253be2b3, #00000000)',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            }}>
                            <Message
                                name={message.displayName}
                                avatar={message.photoURL}
                                text={message.text}
                                uid={message.uid}
                            ></Message>
                            
                            {/* <Grid container>
                                <Avatar src={message.photoURL}/>
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div> */}
                        </div>)}
                        
                </div>
                {(value !== '') ?   
                    <Grid 
                        direction={"column"}
                        alignItems={"flex-end"}
                        container
                            // style={{width: '80%'}}
                    >
                        <TextField 
                            fullWidth
                            rowsMax={2}
                            variant={"outlined"}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            />
                        <Button onClick={sendMessage} variant={"outlined"}>Send</Button>
                        
                    </Grid>                                
                :
                    <Grid 
                        container
                        direction={"column"}
                        alignItems={"flex-end"}
                        // style={{width: '80%'}}
                        >
                        <TextField
                            error
                            fullWidth
                            id="outlined-error"
                            label="Write a message"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <Button disabled variant={"outlined"} >Send</Button>
                </Grid>  
                }    
            </Grid>
        </Container>
    );
}

export default Chat;
