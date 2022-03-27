import React from 'react';
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { auth } from "../index";

import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import WhiteButton from '../ui/WhiteButton/WhiteButton';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    
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
                style={{ height: window.innerHeight - 50, zIndex:"10",justifyContent:"center"}}
                alignItems={"center"}
                // justifycontent={"center"}
                >
                    <Grid 
                        style = {{
                            width: 400, 
                            background: "linear-gradient(14deg, rgb(255 255 255 / 45%) 25%, transparent 110%)",
                            borderRadius: 20
                        }}
                        container
                        alignItems={"center"}
                        direction={"column"}
                        >
                        <Box p={5}>
                            <WhiteButton
                            startIcon={<GoogleIcon />}
                                variant={"outlined"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                onClick = {singInWithGoogle}
                            >
                                Login Google
                            </WhiteButton>
                        </Box>
                    </Grid>

            </Grid> 
        </Container>
    );
} 

export default Login;
