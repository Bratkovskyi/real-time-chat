import { AppBar, Grid, Toolbar } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import {useAuthState} from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from '..';
import WhiteButton from '../ui/WhiteButton/WhiteButton';

const Navbar = () => {
    
    const [user] = useAuthState(auth) 

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
        <AppBar color={"secondary"} position="static">
            <Toolbar variant="dense">
                <Grid container justifyContent={"flex-end"}>
                    {user ?
                    <WhiteButton onClick={() => auth.signOut() }variant={"outlined"}>Exit</WhiteButton>
                    :
                    <NavLink to={LOGIN_ROUTE}>
                        <WhiteButton onClick = {singInWithGoogle} variant={"outlined"}>Login</WhiteButton>
                    </NavLink>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
