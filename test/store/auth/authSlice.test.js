import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures"


describe('Pruebas en authSlice', () => { 

    test('Debe de regrear el estado inicial y llamarse "auth"', () => {
     
        expect(authSlice.name).toBe('auth')
        const state = authSlice.reducer(initialState,{});
        expect(state).toEqual(initialState);          
     
    });
    test('Debe de realizar la autentiicacion', () => { 
        const state = authSlice.reducer(initialState,login(demoUser));
        expect(state).toEqual({
         status:'authenticated',
         uid:demoUser.uid,
         email:demoUser.email,
         displayName:demoUser.displayName,
         photoURL:demoUser.photoURL,
         errorMessage:null,
        })
    });
    test('Debe de realizar el logout sin argumento', () => { 
        const state = authSlice.reducer(authenticatedState,logout());
        //console.log(state)
        expect(state).toEqual({
           status: 'not-authentication', //not-authentication', authenticated
           uid:null,
           email:null,
           displayName:null,
           photoURL:null,
           errorMessage:undefined,
        })
     })
     test('Debe de realizar el logout con argumento', () => { 
        const  errorMessage='Todo salio mal'
        const state = authSlice.reducer(authenticatedState,logout({errorMessage}));
        //console.log(state)
        expect(state).toEqual({
           status: 'not-authentication', //not-authentication', authenticated
           uid:null,
           email:null,
           displayName:null,
           photoURL:null,
           errorMessage
        })
     })
     test('Debe cambiar el status', () => { 
        const state = authSlice.reducer(authenticatedState,checkingCredentials());
        expect(state.status).toEqual('checking');
    })
})