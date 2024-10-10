import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

function PasswordField(props) {

  const [showPassword,setShowPassword] = useState(false)

  function handleClickShowPassword(){
    setShowPassword(!showPassword)
  }

  function handleMouseDownPassword(){
    
  }


  return (
  
<div>

<TextField  
            name={props.passwordFieldName}
            onChange={props.passwordFieldOnChange}
            onKeyDown={props.passwordFieldOnKeyDown}
            value={props.passwordFieldValue}
            type={showPassword ? 'text' : 'password'}
            label="Password"
            id="filled-start-adornment"
            sx={{ m: 1, }}
            variant="filled"
            InputLabelProps = {{style:{fontSize:'10px',}}}
            InputProps={{
              disableUnderline: true,
              style:{width: '268px',height:'48px',fontSize:'0.75rem'},
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            
          />
</div>
  )
}

/*
            endAdornment={
              <InputAdornment  position="end" >
                      <IconButton 
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
              </InputAdornment>
            } */
export default PasswordField

/*
<FilledInput  style={{width:'268px',height:'38px'}}
  id="outlined-adornment-password" 
  type={showPassword ? 'text' : 'password'}
  endAdornment={
    <InputAdornment  position="end" >
      <IconButton 
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  }

/>
*/

