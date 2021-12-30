import './app.css';
import NavBar from "./Components/Navbar/NavBar";
import Home from './Pages/Home/Home';
import PostDetail from './Pages/PostDetail/PostDetail';
import CreatePost from './Pages/CreatePost/CreatePost';
import Settings from './Pages/Settings/Settings';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Footer from './Components/Footer/Footer';
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


// IMPORT ICON HERE
import { 
  faBars,
  faSearch, 
  faTrash, 
  faEdit, 
  faPlus, 
  faUserCircle, 
  faCross 
} from "@fortawesome/free-solid-svg-icons";
import { 
  fab, 
  faInstagramSquare, 
  faFacebookSquare, 
  faTwitterSquare, 
  faGithubSquare 
} from '@fortawesome/free-brands-svg-icons'
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import { useContext } from 'react';
import { Context } from './Context/Context';

// REGISTER ICON HERE
library.add(
  fab, 
  faBars,
  faCross,
  faUserCircle,
  faPlus, 
  faSearch, 
  faTrash, 
  faEdit,
  faInstagramSquare, 
  faFacebookSquare, 
  faTwitterSquare, 
  faGithubSquare 
);

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">{user ? <Home /> : <Register />}</Route>
        {/* <Route path="/login"> {user ? <Login /> : <Register />}</Route> */}
        <Route path="/login"><Login /></Route>
        <Route path="/register">{user ? <Register /> : <Register />}
        </Route><Route path="/create">{user ? <CreatePost /> : <Register />}
        </Route><Route path="/about">{user ? <About /> : <Register />}</Route>
        <Route path="/contact">{user ? <Contact /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/posts/:id"><PostDetail /></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
