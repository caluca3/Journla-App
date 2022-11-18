import { useEffect,useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Delete, DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks"
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery, SideBar } from "../components"


export const NoteView = () => {
    
 const dispatch = useDispatch();

 const {active:note, messageSaved} = useSelector(state => state.journal);
 
 const {body,title,date,onInputChange,formState} = useForm(note);

 const dateString = useMemo(()=>{
    const newDate = new Date(date);
    return newDate.toUTCString();
 },[date]);
 
 useEffect(() => {
   dispatch(setActiveNote(formState));
 }, [formState])
 
 useEffect(() => {
   if (messageSaved.length >0) {
     Swal.fire({
       position: 'top-end',
       icon: 'success',
       iconColor:'midnightblue',
       title: 'Nota Actualizada',
       showConfirmButton: false,
       timer: 1500
      })
    }
  }, [messageSaved])
  
  const savingNote =()=>{
     dispatch(startSavingNote())
 
  }

const onFileChange = ({target})=>{
  if(target.files ===0) return;
  dispatch(startUploadingFiles(target.files))
} 

const onDelete =()=>{
  dispatch(startDeletingNote());
}

const fileInputRef = useRef();

 return (
    <>
        <Grid container direction="row" justifyContent="space-between" sx={{mb:1}} alignItems="center">
         <Grid item>
                 <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
         </Grid>
         <Grid item>
            <input
              type="file"
              multiple
              onChange={onFileChange}
              style={{display:'none'}}
              ref={fileInputRef}
            />
            <IconButton
                 color="primary"
                 //disabled={savingNote}
                 onClick={()=>fileInputRef.current.click()}
                 >
              <UploadFileOutlined/>
            </IconButton>

            <Button 
             onClick={savingNote}
             color="primary" 
             sx={{padding:2}}>
               <SaveOutlined sx={{fontSize:30, mr: 1}}/>
                Guardar
            </Button>
         </Grid>
         <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese su titulo"
                label="Titulo"
                sx={{border:"none",mb:1}}
                name='title'
                value={title}
                onInput={onInputChange}>
            </TextField>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Que ocurrio el dia de hoy"
                label="Descripcion"
                sx={{border:"none",mb:1}}
                minRows={4}
                name='body'
                value={body}
                onChange={onInputChange}>
            </TextField>
         </Grid> 

         <Grid container justifyContent="end">
          <Button
            onClick={onDelete}
            color="error" 
            sx={{padding:2}}>
            <DeleteOutline/>
              Borrar
          </Button>
         </Grid>
        
         <ImageGallery images={note.imageUrls}/>

        </Grid>
    </>
  )
}

