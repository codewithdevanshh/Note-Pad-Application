import './App.css';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './Context/Notes/NoteState';
import ModeState from './Context/Mode/ModeState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AlertState from './Context/Alert/AlertState';


function App() {

  return (
    <>
      <NoteState>
      <ModeState>
      <AlertState>
        <Router>
          <Navbar/>
          <Alert/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/Login" element={<Login/>} />
              <Route exact path="/SignUp" element={<SignUp/>} />
              <Route path="*" element={<Home/>} />
            </Routes>
          </div>
        </Router>
      </AlertState>
      </ModeState>
      </NoteState>
    </>
  );
}

export default App;
