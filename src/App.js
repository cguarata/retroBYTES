// import './App.css';
import { Navbar } from "./components/commons/header/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Head } from "./components/commons/header";
import Home from "./pages/home/home";
import Profile from "./pages/ProfilePage/profile";
import Product from "./pages/ProductPage"
// import LoginPage from "./pages/LoginPage"
import NewProduct from "./components/newProduct";
import { UserTokenContextProvider } from "./contexts/UserTokenContext";
import Register from "./pages/RegisterPage"
import Login from "./pages/LoginPage"


function App() {
  return (
    <div className="App">
      <UserTokenContextProvider>

      <Router>
        <Head />
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          {/* <Route path="/register" component={Register} /> */}
          <Route path="/product/:id" component={Product} />
          <Route path="/newProduct" component={NewProduct} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />


        </Switch>
      </Router>
      
      </UserTokenContextProvider>
    </div>
  );
}

export default App;
