import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../Firebase/providers";
import { checkingCredentials, login, logout }              from "./authSlice"
import {clearLogout} from '../journal/journalSlice'


export const checkingAuthentication =(email,password) =>{

        return async(dispatch) =>{
                dispatch(checkingCredentials());
        };
};

export const startGoogleSingIn =() =>{

    return async(dispatch) =>{
            dispatch(checkingCredentials());

            const result = await singInWithGoogle();
            if (!result.ok) return dispatch(logout(result.errorMessage));

            dispatch(login(result));
        }
};

export const startCreatingUserWithEmailPassword = ({email,password,displayName})=>{
        return async(dispatch)=>{

          dispatch(checkingCredentials());
                
          const {uid,ok,photoURL,errorMessage} = await registerUserWithEmailPassword({email,password,displayName})

          if(!ok) return dispatch(logout({errorMessage}));

          dispatch(login({uid,displayName,email,photoURL}));
                
        };
}

export const startLoginWithEmailPassword = ({email,password})=>{
        
        return async (dispatch)=>{
               dispatch(checkingCredentials());

                const result = await loginWithEmailPassword({email,password});
                //console.log(result);

                if(!result.ok) return dispatch(logout(result));

                dispatch(login(result));
        }

}

export const startLogoutFirebase = ()=>{
        return async (dispatch)=>{
               
             await  logoutFirebase();
             
             dispatch(clearLogout())
             dispatch(logout());

        }
}