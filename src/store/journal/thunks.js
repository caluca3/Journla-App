import { collection, deleteDoc, doc,setDoc} from "firebase/firestore/lite";
import { FirebaseDB } from "../../Firebase/config";

import { loadNotes, fileUpload } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, isCreatingNewNote, setActiveNote, setNote, setPhotoActiveNote, setSaving,updateNote } from "./journalSlice";


export const startNewNote =()=>{
    return async (dispatch, getState) =>{
        //TODO: tarea dispatch
        dispatch(isCreatingNewNote());
        
        const {uid} = getState().auth;

        const newNote ={
            title:'',
            body:'',
            date: new Date().getTime(),
            imageUrls:[], 
        }

        const newDoc = doc(collection(FirebaseDB,`${uid}/journal/notas`));
        await setDoc(newDoc,newNote);


        newNote.id = newDoc.id;
        
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes =()=>{
    return async(dispatch,getState)=>{

        const {uid} = getState().auth;
        if (!uid) throw new Error ('El uid no existe');

       const notes = await loadNotes(uid);

        dispatch(setNote(notes));
    }
}

export const startSavingNote =()=>{
    return async(dispatch,getState)=>{

        dispatch(setSaving())

        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        
        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const docRef= doc(FirebaseDB,`${uid}/journal/notas/${note.id}`);
        await setDoc(docRef,noteToFirestore,{merge:true});

        dispatch(updateNote(note));
      
    };
}

export const startUploadingFiles =(files = [])=>{
     return async(dispatch)=>{
        dispatch(setSaving());
        
        //await uploadFile(files[0]);
        const fileUploadPromises=[];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        const photoUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotoActiveNote(photoUrls))
    }
}

export const startDeletingNote =()=>{
    return async(dispatch,getState)=>{

        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        
        const docRef= doc(FirebaseDB,`${uid}/journal/notas/${note.id}`);
        const resp = deleteDoc(docRef);
        
        dispatch(deleteNoteById(note.id))
  
    }
}