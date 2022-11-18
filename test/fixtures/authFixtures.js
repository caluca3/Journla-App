export const  initialState = {
    status: 'checking', //not-authentication', authenticated
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage:null,
    }

export const  authenticatedState= {
    status: 'authenticated', //not-authentication', authenticated
    uid:'123abc',
    email:'google@google.com',
    displayName:'Demo user',
    photoURL:'https://demo.jpg',
    errorMessage:null,
    }

 export const  notAuthenticated= {
    status: 'not-authentication', //not-authentication', authenticated
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage:null,
    }
 
export const demoUser ={
    uid:'123abc',
    email:'google@google.com',
    displayName:'Demo user',
    photoURL:'https://demo.jpg',
    errorMessage:null,
}