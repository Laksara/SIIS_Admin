import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateAdmin from "./components/create-admin.component";
import UpdateAdmin from "./components/update-admin.component";
import AdminList from "./components/admin-list.component";

import logo from "./logo.svg";

class App extends Component {
  render(){
    return(
      <Router>
        <div className = "container">
          <nav className = "navbar navbar-expand-lg navbar-light bg-light">
            <a className = "navbar-brand" href = "https://codingthesmartway.com" rel="noopener noreferrer" target = "_blank" >
              <img src = {logo} width = "30" height = "30" alt = "Coding the smart way" />
            </a>
            <Link to = "/" className = "navbar-brand">SIIS Admin</Link>
            <div className = "collapse navbar-collapse" >
              <ul className = "navbar-nav mr-auto">
                <li className = "navbar-item">
                  <Link to = "/" className = "nav-link">Admin</Link>
                </li>
                <li className = "navbar-item">
                  <Link to = "/create" className = "nav-link">Create Admin</Link>
                </li>
              </ul>
            </div>


          </nav>
          <Route path = "/" exact component = {AdminList} />
          <Route path = "/update/:id" component = {UpdateAdmin} />
          <Route path = "/create" exact component = {CreateAdmin} />
        </div>
      </Router>
    );
  }
}

export default App;
