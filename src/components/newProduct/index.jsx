import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField, MenuItem, Paper } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import validate from 'validate.js';
import { Box } from '@mui/system';
import { DropzoneArea } from 'material-ui-dropzone';
import { useUserTokenContext } from '../../contexts/UserTokenContext';
import { useHistory } from 'react-router-dom';



const categories = ['Informática','Telefonía','Gaming','Video','Audio', 'Memorabilia'];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 40,
    },
  },
  place: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120,
    },
  },
  price: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20,
    },
  },
  description: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 10,
      maximum: 300,
    },
  },
};

const Form = () => {
  const classes = useStyles();
  const [token]= useUserTokenContext();
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
const [productPhoto, setProductPhoto] = React.useState(null)
const history = useHistory();



  console.log(formState.values);
  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
console.log(formState)
    if (formState.isValid) {
        const productRes= await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
          method:"POST", 
          headers:{
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify(formState.values)
        } )
        
                if(productRes.ok) {
                  const body = await productRes.json()
                  const payload=new FormData()
                  payload.append("photo", productPhoto)
                  const photoRes= await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${body.data.id}/photo`, {
                    method:"POST", 
                    headers:{
                      
                      Authorization: token
                    },
                    body: payload
                  } )
                  if (photoRes.ok) {
                    history.push(`/product/${body.data.id}`)
                  }
                }
    }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
        <Box
        display="flex"
        justifyContent="center"
        // alignItems="center"
        minHeight="80vh"
        sx={{  "& > :not(style)": { m: 3, width: "55ch"}}}>
      <form name="password-reset-form" method="post" onSubmit={handleSubmit}
      
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              placeholder="Nombre"
              label="Nombre *"
              variant="outlined"
              size="large"
              name="name"
              fullWidth
              inputProps={{ style: { fontSize: 30 } }}
              inputLabelProps={{ style: { fontSize: 30 } }}
              InputLabel={{ style: { fontSize: 90 } }}
              helperText={
                hasError('name') ? formState.errors.name[0] : null
              }
              error={hasError('name')}
              onChange={handleChange}
     
              value={formState.values.name || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Localidad"
              label="Localidad *"
              variant="outlined"
              size="large"
              name="place"
              fullWidth
              inputProps={{ style: { fontSize: 30 } }}
              inputLabelProps={{ style: { fontSize: 30 } }}
              InputLabel={{ style: { fontSize: 90 } }}
              helperText={
                hasError('place') ? formState.errors.place[0] : null
              }
              error={hasError('place')}
              onChange={handleChange}
          
              value={formState.values.place || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Precio"
              label="Precio *"
              variant="outlined"
              size="medium"
              name="price"
              fullWidth
              inputProps={{ style: { fontSize: 30 } }}
              inputLabelProps={{ style: { fontSize: 30 } }}
              InputLabel={{ style: { fontSize: 90 } }}
              helperText={hasError('price') ? formState.errors.price[0] : null}
              error={hasError('price')}
              onChange={handleChange}
      
              value={formState.values.price || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="País de fabricación"
              label="País de fabricación *"
              variant="outlined"
              size="medium"
              name="manufact_date"
              fullWidth
              inputProps={{ style: { fontSize: 30 } }}
              inputLabelProps={{ style: { fontSize: 30 } }}
              InputLabel={{ style: { fontSize: 90 } }}
              helperText={
                hasError('manufact_date') ? formState.errors.manufact_date[0] : null
              }
              error={hasError('manufact_date')}
              onChange={handleChange}
            
              value={formState.values.manufact_date || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Descripción"
              label="Descripción *"
              variant="outlined"
              size="medium"
              name="description"
              fullWidth
              inputProps={{ style: { fontSize: 60 } }}
              inputLabelProps={{ style: { fontSize: 60 } }}
              InputLabel={{ style: { fontSize: 90 } }}
              helperText={
                hasError('description') ? formState.errors.description[0] : null
              }
              error={hasError('description')}
              onChange={handleChange}
            
              value={formState.values.description || ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
            select
            placeholder="Categoría"
            label="Categoría *"
            variant="outlined"
            size="medium"
            name="category"
            fullWidth
            inputProps={{ style: { fontSize: 30 } }}
            inputLabelProps={{ style: { fontSize: 30 } }}
            InputLabel={{ style: { fontSize: 90 } }}
            helperText={
              hasError('category') ? formState.errors.category[0] : null
            }
            error={hasError('category')}
            onChange={handleChange}
          
            value={formState.values.category || ''}
            >
              {categories.map((category) => 
              <MenuItem 
              style={{ fontSize: "2rem", fontWeight:"600" }}
              value={category}>
                {category}
              </MenuItem>)}
              </TextField>
          </Grid>
          <Grid item xs={12}>
            <i>
              <Typography variant="h4">
                Los campos marcados * son requeridos.
              </Typography>
            </i>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
                <Item>
                    <DropzoneArea 
                        showPreviews={true}
                        showPreviewsInDropzone={false}
                        filesLimit={1}
                        onChange={(files => setProductPhoto(files[0]) )}
                        useChipsForPreview
                        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                        previewChipProps={{ classes: { root: classes.previewChip } }}
                        getFileAddedMessage={fileName => (`Archivo ${fileName} cargado`)}
                        getFileRemovedMessage={fileName => (`Imagen ${fileName} eliminada`)}
                        previewText="Archivos seleccionados"
                        dropzoneText="Sube una imagen de tu producto retro" />
                </Item>

            </Grid>
        
      
            </Grid>






          <Grid item xs={12}>
            <Button
              size="3rem"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              style={{ marginTop: "20px", fontSize: "2rem" }}
            >
              Enviar
            </Button>
          </Grid>
          
        </Grid>
      </form>
      </Box>
    </div>
  );
};

export default Form;
