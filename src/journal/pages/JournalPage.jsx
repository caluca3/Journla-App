
import { useDispatch, useSelector } from "react-redux"

import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"

import { startNewNote } from "../../store/journal"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views"
import { NoteView } from "../views/NoteView"


export const JournalPage = () => {

  const {isSaving, active} = useSelector(state => state.journal);
 
  const dispatch = useDispatch()
  
  const onclickNewNote=()=>{
    console.log(startNewNote)
    dispatch(startNewNote());

  }
  return (
    <>
    <JournalLayout>
      { (active? <NoteView/> : <NothingSelectedView/>)  }

      <IconButton
        onClick={onclickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color:"error",
          backgroundColor:"error.main",
          ":hover":{opacity:0.9,backgroundColor:"error.main"},
          position:"fixed" ,
          right:50,
          bottom:50
        }}
      >
        <AddOutlined sx={{fontSize:40}}/>
      </IconButton>
    </JournalLayout>
    
    </>
  )
}
