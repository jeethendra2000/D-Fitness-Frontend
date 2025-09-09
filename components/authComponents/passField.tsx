"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


interface MyPassFieldProps {
    label: string;
    name?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MyPassField({ label, name, value, onChange }: MyPassFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

    return (        
        <div className="password-input d-flex align-center w-100 h-46px mb-20px">
            <input name={name} type={showPassword ? 'text' : 'password'} placeholder={label} value={value} onChange={onChange} style={{position: 'relative'}} aria-label={label} />
            <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                  style={{ background: 'transparent', border: 'none', color: '#c4c4c4', position: 'absolute', padding: '10px', width: 'auto', height: 'auto', right: '7%' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </div>
    );
}
