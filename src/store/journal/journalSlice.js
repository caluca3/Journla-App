import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
    isSaving:false,
    messageSaved:'',
    notes:[],
    active:null, 
    //activeNote:{
    //   id:'123',
    //   title:'',
    //   body:'',
    //   date:12345,
    //   imageUrls:[],//https://foto1 //https://foto1
   },

    reducers: {
       isCreatingNewNote:(state) =>{
         state.isSaving=true;
       },
       addNewEmptyNote :(state,action) =>{
         state.notes.push(action.payload);
         state.isSaving=false;
       },
       setActiveNote:(state,action) =>{
        state.active = action.payload
        state.messageSaved ='';
      },
       setNote:(state,action) =>{
        state.notes = action.payload ;
       },
       setSaving:(state,action) =>{
        state.isSaving=true;
        state.messageSaved =''; 
       },
       updateNote:(state,action) =>{
        state.isSaving= false;
        state.notes = state.notes.map(note =>{
          if (note.id === action.payload.id) {
            return action.payload;
          }
          return note;
        });

        state.messageSaved = `${action.payload.title}, actualizada `
       },
       setPhotoActiveNote:(state,action)=>{
        state.active.imageUrls =[...state.active.imageUrls, ...action.payload];
        state.isSaving=false;
       },

       clearLogout:(state)=>{
        state.isSaving=false;
        state.messageSaved='';
        state.notes=[];
        state.active=null;
       },
       deleteNoteById:(state,action) =>{
        state.active=null;
        state.notes=state.notes.filter(note =>note.id !== action.payload);
       },
      }

});

export const { addNewEmptyNote,
               setActiveNote,
               setNote,
               setSaving,
               deleteNoteById,
               isCreatingNewNote,
               updateNote,
               setPhotoActiveNote,
               clearLogout} = journalSlice.actions; 