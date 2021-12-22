import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = React.createContext();

export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [notFriends, setNotFriends] = useState([]);

  // useEffect(()=>{
  //   getNotFriends();
  // },[]);

  const getNotFriends = async () =>{
    try {
      let response = await axios.get('/api/users')
      setNotFriends(response.data)
    } catch (err) {
      alert('error getting Not Friends')
    }
  };

  const handleRegister = async (user, navigate)=>{
    try {
      let response = await axios.post('api/auth', user);
      setUser(response.data.data)
      getNotFriends()
      navigate('/')
    } catch (err) {
      console.log(err.response.data.errors.full_messages)
      alert(err.response.data.errors.full_messages)
    }
  };

  const handleUpdateUser= async (user, navigate)=>{
    try {
      let response = await axios.put('/api/auth', user);
      setUser(response.data.data)
      getNotFriends()
      console.log("user: ", user)
      console.log("response: ", response.data.data)
      navigate('/')
    } catch (err) {
      console.log(err.response.data.errors.full_messages)
      alert(err.response.data.errors.full_messages)
    }
  };

  const handleDeleteAccount = async (navigate)=> {
    let response = await axios.delete("/api/auth");
    setUser(null);
    navigate('/register')
  };

  const handleLogin = async (user, navigate)=>{
    try{
      let response = await axios.post('/api/auth/sign_in', user);
      setUser(response.data.data)
      getNotFriends()
      navigate("/")
    } catch (err) {
      console.log(err.response.data.errors.full_messages)
      alert(err.response.data.errors.full_messages)
    };
  };

  const handleLogout = async (navigate) => {
    try {
      let response = await axios.delete('api/auth/sign_out');
      localStorage.removeItem('access-token');
      setUser(null);
      navigate('/login')
    } catch (err) {
      console.log(err.response.data.errors.full_messages)
      alert(err.response.data.errors.full_messages)
    };
  };

  return(
    <AuthContext.Provider value ={{
      ...user,
      setUser,
      getNotFriends,
      notFriends,
      setNotFriends,
      handleRegister,
      handleLogin,
      handleLogout,
      handleUpdateUser,
      handleDeleteAccount,
      authenticated: user !== null,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;