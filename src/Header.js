import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography } from '@material-ui/core';
export const Header = ()=>{
    return(
        <div style={{backgroundColor:'rgba(200,200,200,0.5)',position:'fixed', bottom:0, right:0, padding:2, borderRadius:5}}>
            <div>
            <Typography><span>Created By Abdurrahaman Asad</span>{' '}
            <a href='https://github.com/A-ASAD' title='Abdurrahman Asad'><GitHubIcon/></a>{' '}
            <a href='https://pk.linkedin.com/in/abdurrahman-asad-2805741ab' title='Abdurrahman Asad'><LinkedInIcon/></a>
            </Typography>
        </div>
        </div>
        
    )
}