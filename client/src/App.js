import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './components/Layout';
import Protected from './pages/Protected';
import RequireAuth from './components/RequireAuth';
import FindFriends from './pages/FindFriends';
import Friends from './pages/Friends';
import Friend from './pages/Friend';

function App() {
  return (
    <Routes>
      <Route element ={<Layout />}>
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route element = {<RequireAuth />}>
          <Route path = "/" element = {<Home />} />
          <Route path= "/friend" element = {<Friend />} />
          <Route path= "/friends" element = {<Friends />} />
          <Route path= "/findfriends" element = {<FindFriends />} />
          <Route path = "/protected" element = {<Protected />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
