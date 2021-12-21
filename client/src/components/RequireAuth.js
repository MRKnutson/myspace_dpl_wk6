import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const RequireAuth = () => {
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true)
  const auth = useContext(AuthContext);

  useEffect(()=>{
    checkAuthStatus();
  },[]);

  const checkAuthStatus = async () => {
    if(auth.authenticated || !localStorage.getItem('access-token')){
      setCheckingAuthStatus(false);
      auth.getNotFriends()
      return;
    }
    try {
      const res = await axios.get("/api/auth/validate_token");
      auth.setUser(res.data.data);
      auth.getNotFriends()
    } catch (err) {
      console.log('unable to validate token')
    } finally {
      setCheckingAuthStatus(false);
    };
  };
  if(checkingAuthStatus){
    return(<p>Checking if logged in or not</p>);
  }

  if(!auth.authenticated) {
    return <Navigate to="/login" />;
  };

  return <Outlet />
};

export default RequireAuth;