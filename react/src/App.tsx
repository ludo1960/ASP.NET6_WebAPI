
import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter, Router, Routes } from 'react-router-dom';
import Dashboard from './features/Dashboard';
import Login from './features/Login';
import Signup from './features/Signup';

const App  = (props: any) => { 
    return (
        <Fragment>
            <BrowserRouter >
                <Routes>
                  <Route path='/'  element={<Dashboard/>} />
                  <Route path='/signup' element={<Signup/>} />
                  <Route path='/login' element={<Login/>} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    )     
}

export default App;