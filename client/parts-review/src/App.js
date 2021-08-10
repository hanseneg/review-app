import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import { UserContext } from './context/UserProvider.js'
import ProtectedRoute from './components/ProtectedRoute'
import './css/style.css'

export default function App(){
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">
      {/* if there is a token-show navbar */}
      {/* can also be used in navbar component to hide logout or profile until token is present like below */}
      { token && <Navbar logout={logout}/>}
      <Switch>
        <Route 
          exact path="/" 
          render={()=> token ? <Redirect to='/profile'/> : <Auth />}
        />
        <ProtectedRoute 
          path="/profile"
          component={Profile}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute 
          path="/public"
          component={Public}
          redirectTo='/'
          token={token}
        />
      </Switch>
    </div>
  )
}