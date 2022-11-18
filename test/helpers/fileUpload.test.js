import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'caluca3', 
  api_key: '124592793219271', 
  api_secret: 'pKk6mXGhyxiIabX88QpF2XMMohg',
  secure: true

});
jest.setTimeout(10000);

describe('Test fileUpload', () => {
    test('debe de subir el archivo correctamente a cloudinary', async () => {
   
      const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
      const resp = await fetch(imageUrl);
      const blob = await resp.blob();
      const file = new File([blob], 'foto.jpg');
     //file = {}
      const url = await fileUpload(file);
      console.log(url)
      expect(typeof url).toBe('string'); //retorna object
      
      const segments = url.split('/');
      const imageId = segments[segments.length -1].replace('.jpg','');

      const cloudResp =await cloudinary.api.delete_resources(['journal/' + imageId]);
      console.log(cloudResp);
    });
    
    test('Debe retornar null', async() => {
      
      const file = new File([], 'foto.jpg');
      const url = await fileUpload(file);
      console.log(url)
      expect(url).toBe(null);


     },10000);
  })
  