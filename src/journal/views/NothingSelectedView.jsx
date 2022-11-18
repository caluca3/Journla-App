import { StarOutline, StarOutlined } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"


export const NothingSelectedView = () => {
  return (<>
  
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight:"100vh", backgroundColor:'primary.main',padding:4,borderRadius:2.5}}
      >
            <Grid item xs={12} >
                <StarOutline sx={{fontSize:90,color:"white" }}/>
            </Grid><Grid item xs={12} >
                <Typography variant="h5" color="white">Selecciona una entrada</Typography>
            </Grid>

      </Grid>
        </>)
}

