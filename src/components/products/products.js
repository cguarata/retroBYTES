import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
//  import products from "./dummy-products/dummy_products";
import useProducts from "../../hooks/useProducts";
// import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core";
import theme from '../../theme'

const styles = {
    root: {
      backgroundColor: '#264653' 

    },
  // actionArea: {
  //   "&hover $focusHightlight": {
  //     backgroundColor: "#2345"
  //   }
  };



// const theme = createTheme({
//     typography: {
//     fontFamily: "KatahdinRound-Bold",

//   },
// });


// const theme = createTheme({
//   typography: {
//     fontFamily: "KatahdinRound-Bold",

//   },

//   components: {
//     MuiCssBaseline: {
//       styleOverrides: `
//         @font-face {
//           font-family: KatahdinRound-Bold;
//           src: url('./fonts/KatahdinRound-Bold.ttf'), url('./fonts/KatahdinRound-Bold.woff'), url('./fonts/KatahdinRound-Bold.woff2');
          
//         };
//         `,
//         MuiCardContent: {
//           background: "#f1f1f1",
//           '&:hover': {
//              background: "#264653",
//           },
//         },
//     },
//   },
// });


function ListProducts(props) {
  const [products] = useProducts();

  console.log(products);
  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: 0, padding: 55 }}>
        <h1>Productos</h1>
        <Grid
          container
          spacing="2"
          columns={{ xs: 1, sm: 4, md: 8 }}
          justify="center"
        >
          {products.length > 0 &&
            products.slice(0, 9).map((product) => (
              <Grid item xs={12} sm={4} md={4} key={product.name}>
                <Paper elevation={8}>
                <Card>
                  <CardActionArea style={{
                 
                    
                      '&:hover': {
                        backgroundColor: "#2A9D8F",
                        color: "#E9C46A",
                      }
                  }}>
                    <CardMedia
                      component="img"
                      alt={`${product.name}`}
                      height="180"
                      width="220"
                      image={`${process.env.REACT_APP_BACKEND_URL}/${product.foto}`}
                      title={`${product.name}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="h1">
                        {product.name}
                      </Typography>
  
                      <Typography style={{ fontFamily: 'Oswald' }} variant="h4"  >
                        {product.price+"€"}
                      </Typography>

                      <Typography component="p">
                        {product.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    textAlign="right"
                    style={{ justifyContent: "right" }}
                  >
                
                    <Button variant="contained" size="large" color="secondary">
                      Más Info
                    </Button>
                    <Button variant="contained" size="large" color="primary">
                      Comprar
                    </Button>
                  </CardActions>
                </Card>
                </Paper>
              </Grid>
              
            ))}
        </Grid>

        <h5 style={{ marginTop: 40, textAlign:"right", backgroundColor: 'white' }}> "DON´T YOU FORGET ABOUT ME" - Encuentra tu producto retro -</h5>
      </div>
    </ThemeProvider>
  );
}

export default withStyles(styles) (ListProducts);
