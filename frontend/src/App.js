import React from 'react';
import './App.css';
import Navbar from './componentes/navbar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
import Notificaciones from './pages/notificaciones';
import Compras from './pages/compras';
import Perfil from './pages/perfil';
import Login from './pages/login';
import { Register } from './pages/register';
import NewProduct from './pages/newProduct';
import { ProfileUpdate } from './pages/profileUpdate';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/chat' component={Chat} />
        <Route path='/notificaciones' component={Notificaciones} />
        <Route path='/compras' component={Compras} />
        <Route path='/perfil' component={Perfil} />
        <Route path='/producto-nuevo' component={NewProduct} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/actualizar-datos-usuario' component={ProfileUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
