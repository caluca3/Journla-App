import { useMemo } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link as RouterLink} from "react-router-dom";

import{ Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth";

const dataForm ={
  email:'',
  password:''
 }

export const LoginPage = () => {

 const dispatch =useDispatch()
 
 const {status,errorMessage}= useSelector(state => state.auth);
 
 const {email, password, onInputChange} = useForm(dataForm);
 
  const isAuthenticated = useMemo(()=>status ==='checking',[status])
 
  const onSubmit =(event) =>{
   event.preventDefault();
   console.log('');
   dispatch(startLoginWithEmailPassword ({email,password}));
  }
 
  const onGoogleSignIn =()=>{
   console.log('google')
   dispatch(startGoogleSingIn());
 }

return (<>
  <AuthLayout title="Login">
   <form 
   aria-label="submit-form"
   onSubmit={onSubmit}>
     <Grid container>
             <Grid item xs={12} mt={2}>
               <TextField 
               label="Correo" 
               type="email"
               placeholder='123123@gmail.com'
               fullWidth
               name="email"
               value={email}
               onChange={onInputChange}>
               </TextField>
             </Grid>
             <Grid item xs={12} mt={2}>
               <TextField 
               label="Contraseña" 
               type="password"
               placeholder='******'
               fullWidth
               InputProps={{
                "data-testid":"password"
               }}
               name="password"
               value={password}
               onChange={onInputChange}>
               </TextField>
             </Grid>
             <Grid container spacing={2} sx={{mb:2, mt:1}} >
                 <Grid item xs={12} display={!!errorMessage ? '':'none'}>
                   <Alert 
                   severity="error">{errorMessage}</Alert>
                 </Grid>
             </Grid>
             <Grid container spacing={2} sx={{mb:2, mt:1}} >
               <Grid item xs={12} sm={6}>
                 <Button 
                   disabled={isAuthenticated}
                   type="submit"
                   variant='contained'
                   fullWidth
                   onClick={onSubmit} 
                   >
                 Iniciar sesion 
                 </Button>
             </Grid>
             <Grid item xs={12} sm={6}>
                 <Button 
                   //disabled={isAuthenticated}
                   variant='contained'
                   fullWidth
                   aria-label="google-btn"
                   onClick={onGoogleSignIn}>
                 <Google/>
                 <Typography sx={{ml:1}}>Google</Typography>
                 </Button>
             </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
                   Crear una cuenta
              </Link>
            </Grid>
     </Grid>
   </form>
  </AuthLayout>
  
  </>)
}
