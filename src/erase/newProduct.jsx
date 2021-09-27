import { DropzoneArea } from 'material-ui-dropzone';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid , Paper } from '@material-ui/core';



const useStyles = makeStyles(theme => createStyles({
  previewChip: {
    minWidth: 160,
    maxWidth: 210
  },
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  

function NewProduct() {
    const classes = useStyles();
    return (
        
    <Box sx={{ flexGrow: 1 }}>

      <Grid container spacing={2}>
            <Grid item xs={8}>
                <Item>
                    <DropzoneArea
                        showPreviews={true}
                        showPreviewsInDropzone={false}
                        useChipsForPreview
                        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                        previewChipProps={{ classes: { root: classes.previewChip } }}
                        previewText="Selected files"
                        dropzoneText="Sube una imagen de tu producto retro" />
                </Item>

            </Grid>
            <Grid item xs={4}>
                <Item>
                    <h2>Bienvenido</h2>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item>xs=4</Item>
            </Grid>
            <Grid item xs={8}>
                 <Item>xs=8</Item>
            </Grid>
            </Grid>
       </Box>


            );
}

            export default NewProduct;