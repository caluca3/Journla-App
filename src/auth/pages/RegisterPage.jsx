import { useState }                                  from "react";
import { useDispatch, useSelector }                               from "react-redux";
import {Link as RouterLink}                          from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout }                                from "../layout/AuthLayout";
import { useForm }                                   from "../../hooks/useForm";

import { startCreatingUserWithEmailPassword }        from "../../store/auth/thunks";
import { useMemo } from "react";

const userData ={
  email:'',
  password:'',
  displayName:''
}
const formValidations ={
  email:[(value) => value.includes("@") ,'El correo debe tener un @'],
  password:[(value) => value.length >= 6,'El password debe tener 6 o mas letras. '],
  displayName:[(value)=>value.length >=1,'El nombre es obligatorio.']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setformSubmitted] = useState(false);
  
  const {status,errorMessage} = useSelector(state => state.auth);

  const isCheckingAutentication = useMemo(() => status === 'checking',[status]);

  const {displayName,email,password,onInputChange,formState,
         displayNameValid,emailValid,passwordValid,isFormValid
        }= useForm(userData,formValidations );
  
  const onSubmit =(e)=>{
    e.preventDefault();
    setformSubmitted(true);

    if(!isFormValid)return;
    
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <>
    <AuthLayout title="Crear cuenta">
     {/* <h1>formvalid: {isFormValid?'valido':'no'}</h1>*/}
           <form onSubmit={onSubmit}>
           <Grid container>
                <Grid item xs={12} mt={2}>
                  <TextField label="Nombre completo" 
                  type="text"
                  placeholder='Carlos Campos'
                  fullWidth
                  name="displayName"
                  value={displayName}
                  onChange={onInputChange}
                  error={!!displayNameValid && formSubmitted}
                  helperText={displayNameValid}>
                  </TextField>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <TextField label="Correo" 
                  type="email"
                  placeholder='campos_123@gmail.com'
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid && formSubmitted}
                  helperText={emailValid}>
                  </TextField>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <TextField label="Contraseña" 
                  type="password"
                  placeholder='*******'
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  error={!!passwordValid && formSubmitted }
                  helperText={passwordValid}>
                  </TextField>
                </Grid>
                <Grid container spacing={2} sx={{mb:2, mt:1}} >
                  <Grid item xs={12} display={!!errorMessage ? '':'none'}>
                    <Alert 
                    severity="error">{errorMessage}</Alert>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mb:2, mt:1}} >
                  <Grid item xs={12}>
                    <Button 
                    disabled={isCheckingAutentication}
                    variant='contained'
                    fullWidth
                    type="submit">
                    Crear cuenta
                    </Button>
                </Grid>
               <Grid sx={{mt:2}}container direction="row" justifyContent="end">
                <Typography sx={{mr:1}}>¿Ya tienes una cuenta? </Typography>
                 <Link component={RouterLink} color="inherit" to="/auth/login">
                  Ingresar
                 </Link>
               </Grid>
                </Grid>
           </Grid>
           </form>
    </AuthLayout>
    </>
  )
}
