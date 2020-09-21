import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/navbar.component';
import ShowsList from './components/shows-list.component';
import EditShows from './components/edit-shows.component';
import CreateShow from './components/create-show.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
      <div className='container container-fluid'>
        <Navbar />
        <br/>
        <Route path="/" exact component={ShowsList} />
        <Route path="/edit/:id" component={EditShows} />
        <Route path="/create" component={CreateShow} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;