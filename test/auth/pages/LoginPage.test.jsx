import { fireEvent, getAllByLabelText, render,screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter} from "react-router-dom"

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import {startGoogleSingIn, } from "../../../src/store/auth/thunks";
import { authSlice} from "../../../src/store/auth";
import { notAuthenticated } from "../../fixtures/authFixtures";

const mockStartGoogleSingIn = jest.fn();
const mockStartWithEmailPassword=jest.fn();

jest.mock("../../../src/store/auth/thunks",()=>({
    startGoogleSingIn: ()=>mockStartGoogleSingIn,
    starLogintWithEmailPassword:({email,password})=> mockStartWithEmailPassword({email,password}),
}));


jest.mock('react-redux',()=>({
  ...jest.requireActual('react-redux'),
  useDispatch:() =>(fn) =>fn(),
}));

const store = configureStore({
    reducer:{
        auth:authSlice.reducer
    },
    preloadedState:{
      auth: notAuthenticated
    }
});



describe('Preubas en login page', () => {


  beforeEach(() => (jest.clearAllMocks));
    
  test('Debe de mostrar el componente correctamente', () => { 
    render(
     <Provider store={store}>
        <MemoryRouter>
            <LoginPage/>
        </MemoryRouter>
     </Provider>
    )
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    
  });
  
  test('Boton google debe de llamar el startGoogleSigIn', () => {
   
    render(
      <Provider store={store}>
         <MemoryRouter>
             <LoginPage/>
         </MemoryRouter>
      </Provider>
     )
     const btnGoogle = screen.getByLabelText("google-btn");
     fireEvent.click(btnGoogle);

     expect(mockStartGoogleSingIn).toHaveBeenCalled();
   })

   test('Submit debe llamar el startLoginWithEmailPassword', () => {
    
    const email    ="carlos@google.com"
    const password ="1234"
    render(
      <Provider store={store}>
         <MemoryRouter>
             <LoginPage/>
         </MemoryRouter>
      </Provider>
     )
     const emailField = screen.getByRole('textbox',{name:'Correo'})
     fireEvent.change(emailField,{target:{name:"email",value:email}});

     const passwordField = screen.getByTestId('password');
     fireEvent.change(passwordField,{target:{name:"password",value:password}});

     const form = screen.getByLabelText('submit-form');
     fireEvent.submit(form);

     expect(mockStartWithEmailPassword).toHaveBeenCalledWith({
      email:email,
      password:password
     })
    })
});