import { TextField } from '@mui/material';
import React from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';

function MyTextField(props) {
    const label = props.label
  return (
    <TextField 
    onKeyDown={props.textFieldOnKeyDown}
    onChange={props.textFieldOnChange}
    type={props.textFieldName  == 'password' && !props.showPassword  ? 'password' : 'text'}
    label={label}
    name={props.textFieldName}
    value={props.textFieldValue}
    id="filled-start-adornment"
    sx={{ m: 1, }}
    variant="filled"
    
    InputLabelProps = {{style:{fontSize:'10px'}}}
    InputProps={{ disableUnderline: true ,    
                  style:{width: '268px',height:'48px',fontSize:'0.75rem',backgroundColor:''},
                 endAdornment: (
                  props.textFieldName  == 'password' ? 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=> props.setShowPassword(!props.showPassword)}
                        edge="end"
                      >
                        {props.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                    : null
                  ), 
                }}

    />
  )
}

export default MyTextField