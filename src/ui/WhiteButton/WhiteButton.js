import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {  Button } from '@mui/material';

const WhiteButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50],
    '&:hover': {
      backgroundColor: grey[400],
    },
}));

export default WhiteButton