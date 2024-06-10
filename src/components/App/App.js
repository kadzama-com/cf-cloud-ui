import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import DrawPrint from '../DrawPrint/DrawPrint';
import Library from '../Library/Library';
import Navigation from '../Navigation/Navigation';
import Slicer from '../Slicer/Slicer';
import { useUser, UserContext } from './useUser';
import DrawApp from '../DrawApp/DrawApp';
import STLGenerator from '../STLGenerator/STLGenerator';

function App() {
  const { user, setUser, removeUser } = useUser();

  return (

    <UserContext.Provider value={{ user, setUser, removeUser }} >

      <BrowserRouter>
        {user ?
          <Switch>
            <Route exact path="/draw">
              <DrawApp />
            </Route>
            <Route path="/">
              <Navigation />
              <Route path="/draw-print">
                <DrawPrint />
              </Route>
              <Route path="/library">
                <Library />
              </Route>
              <Route path="/slicer">
                <Slicer />
              </Route>
              <Route path="/stl-generator">
                <STLGenerator />
              </Route>
              <Route path="/*">
                <Redirect to="/draw-print" />
              </Route>
            </Route>
            
          </Switch>
          :
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
            <Route path="/*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        }

      </BrowserRouter>
    </UserContext.Provider>

  );
}


export default App;
