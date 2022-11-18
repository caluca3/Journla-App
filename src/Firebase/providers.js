import { GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async()=>{
    try{
        const result = await signInWithPopup(FirebaseAuth,googleProvider);
        //const credentials= GoogleAuthProvider.credentialFromResult(result);
        const {displayName,email,photoURL,uid} = result.user;
        
        return{
            ok:true,
            //Display info
            displayName,email,photoURL,uid
        }
     }

    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok:false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({email, password,displayName})=>{
    
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const {uid,photoURL} = resp.user;
        
        console.log(resp);
        
        await updateProfile(FirebaseAuth.currentUser,{displayName,email,photoURL});

        return {
            ok:true,uid,photoURL,email,password
        }
    } catch (error) {
      //  console.log(error);
        return{ok:false, errorMessage: error.message}
    }
}

export const loginWithEmailPassword = async ({email,password})=>{

    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth,email,password);
        const {displayName,photoURL,uid} = result.user;
        
        return{
            ok:true,
            //Display info
            displayName,photoURL,uid
        }
     }

        catch (error) {
        //  console.log(error);
          return{ok:false, errorMessage: error.message}
      }    
}

export const logoutFirebase = async ()=>{
     await FirebaseAuth.signOut();
}
