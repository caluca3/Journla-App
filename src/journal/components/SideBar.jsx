
import { useSelector } from "react-redux"

import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { SideBarItem } from "./SideBarItem";
import { NoteView } from "../views/NoteView";
import { NothingSelectedView } from "../views";

// /import { JournalLayout } from "../layout/JournalLayout"


export const SideBar = ({drawerWidth}) => {

  const {displayName} = useSelector(state => state.auth);
  const {notes} = useSelector(state => state.journal);

  return (<>
    <Box 
        component='nav'
        sx={{width:{sm:drawerWidth},
            flexShrink:{sm:0}
            }}>
          <Drawer variant="permanent"
                  open
                  sx={{display:{xs:'block'},
                  '&.MuiDrawer-paper':{boxSizing:'border-box', width:drawerWidth}
                  }}
                  >
                    <Toolbar>
                      <Typography
                        variant='h6'
                        noWrap
                        component='div'>
                          {`${displayName}`.toLocaleUpperCase()}
                      </Typography>
                    </Toolbar>
                    <Divider/>
                    <List>
                      {
                        notes.map(note => (
                          <SideBarItem key={note.id} {...note}/>
                        ))
                      }
                    </List>
          </Drawer>
    </Box>
</>)
}
