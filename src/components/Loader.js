
import { Container, Grid } from '@mui/material';
import React from 'react';

const Loader = () => {
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
                        <div className="loader">Loading...</div>
                    </Grid>

            </Grid> 
        </Container>
    );
}

export default Loader;
