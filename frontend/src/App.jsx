import React, { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import {Routes, Route, Navigate} from 'react-router-dom';

import { useAuthStore } from './store/useAuthStore';
import UserPage from './pages/UserPage/UserPage';
import AdminPage from './pages/AdminPage/AdminPage';

import LoginPage from './pages/LoginPage';

import SignupPage from './pages/SignupPage';

import HomePage from './pages/HomePage';

import VerifierPage from './pages/VerifierPage/VerifierPage';

const App =() => {
  const {authUser, isCheckingAuth, checkAuth} = useAuthStore();

  

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({authUser})


  if (isCheckingAuth && !authUser){
    return (
      <div >
        <h1>Loading...</h1>
      </div>
    )
  }


  return (
    <>
      <Routes>
        <Route path="/" element={!authUser ? <Navigate to="/login"/> :<Navigate to={`/${authUser.role.toLowerCase()}`}/> } />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={`/${authUser.role.toLowerCase()}`}/>}/>
        <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to={`/${authUser.role.toLowerCase()}`}/>}/>
        <Route path="/user" element={authUser?.role === 'User' ? <UserPage/> : <Navigate to="/login"/> }/>
        <Route path="/admin" element={authUser?.role === 'Admin' ? <AdminPage/> : <Navigate to="/login"/> }/>
        <Route path="/verifier" element={authUser?.role === 'Verifier' ? <VerifierPage/> : <Navigate to="/login"/> }/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;