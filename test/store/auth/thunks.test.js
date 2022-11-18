import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSingIn, startLoginWithEmailPassword, startLogoutFirebase } from "../../../../src/store/auth";
import { demoUser } from "../../fixtures/authFixtures";
import { singInWithGoogle,loginWithEmailPassword, logoutFirebase } from "../../../../src/Firebase/providers";
import { clearLogout } from "../../../../src/store/journal";

jest.mock('../../../../src/Firebase/providers');

describe('Pruebas en thunks de auth', () => { 
    
    const dispatch = jest.fn();
    beforeEach(()=>jest.clearAllMocks())    
    
    test('debe de invocar checkingcredentials', async() => { 
        
        await  checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials())        
    });

    test('startGoogleSingIn debe llamar checkingcredentials y login', async() => { 
        
        const loginData = {ok:true, ...demoUser};
        await singInWithGoogle.mockResolvedValue( loginData );
        
        await startGoogleSingIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSingIn debe llamar checkingcredentials y logout', async() => {
        
        const loginData = {ok:false,errorMessage:'Un error con google'};
        await singInWithGoogle.mockResolvedValue( loginData );
        
        await startGoogleSingIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startLoginWithEmailPassword debe llamar el checkingcredentials y login exitoso', async() => { 
        
        const loginData = {ok:true, ...demoUser};
        const formData ={email:demoUser.email, password:'123456'}

        await loginWithEmailPassword.mockResolvedValue( loginData );
        
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
     });

     test('startLogout debe de llamar al logoutFirebase', async () => {
        
        await startLogoutFirebase()(dispatch);
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearLogout());
        expect(dispatch).toHaveBeenCalledWith(logout())
     });
})
