import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

import { useAuthContext } from '../context/AuthContextInfo';
function AdminRoute() {



    const [ok, setOk] = useState(false);
    const { auth, setAuth } = useAuthContext();
  
    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get(
          `https://e-commerce-website-live-back-end.vercel.app/api/v1/auth/admin-auth`,
          { headers: { Authorization: auth?.token } }
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      };
      if (auth?.token) authCheck();
    }, [auth?.token]);
  
  
    
  
  
    return (ok ? <Outlet /> : <Spinner path='' />);
  }

export default AdminRoute
