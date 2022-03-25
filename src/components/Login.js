import React, { useContext } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { auth } from "../index";
// import firebase from 'firebase/compat/app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const Login = () => {
    // const {auth} = useContext(Context)

    // const login = async() => {
    //     const provider = new firebase.auth.GoogleAuthProvider()
    //     const {user} = await auth.signInWithPopup(provider)
    //     console.log(user)
    // }
    
    const singInWithGoogle = () => {
        const provider = new GoogleAuthProvider(); 
        signInWithPopup(auth, provider)
        .then((re)=>{
            console.log(re)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <Container>
            <Grid container
                style={{ height: window.innerHeight - 50,}}
                alignItems={"center"}
                justifyContent={"center"}
                >
                    <Grid 
                        style = {{
                            width: 400, 
                            background: "linear-gradient(268deg, #829ec973 25%, transparent 110%)",
                            borderRadius: 20
                        }}
                        container
                        alignItems={"center"}
                        direction={"column"}
                        >
                        <Box p={5}>
                            <Button 
                                variant={"outlined"}
                                onClick = {singInWithGoogle}
                            >Login Google</Button>
                        </Box>
                    </Grid>

            </Grid> 
        </Container>
    );
} 

export default Login;
