import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from '../auth/login'
import Register from '../auth/register'
import Home from '../home'
import Header from '../layout/header'
import Footer from '../layout/footer'
import ProductDashboard from '../product/productDashboard'
import UserDashboard from '../user/UserDashboard'
import ProductCreate from '../product/productCreate'
import auth from './../services/auth.service'
import ProductList from '../product/ProductList'

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn())

  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={() => {
          setIsLoggedIn(false)
        }}
      ></Header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/login"
          render={() => (
            <Login
              handleLogin={() => {
                setIsLoggedIn(true)
              }}
            />
          )}
        />
        <Route path="/register" component={Register} />
        
        <Route path="/products/create" component={ProductCreate} />
        <Route path="/products/filter" component={ProductList} />

        <Route path="/products/:id" component={ProductDashboard} />

        <Route path="/profile/:id" component={UserDashboard} />
        
      </Switch>
      <Footer />
    </Router>
  )
}

export default Navigation
