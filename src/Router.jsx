import React from 'react';
import { Route, Switch } from 'react-router-dom';

// HOCs & wrappers
import ProtectedRoute from './HOCs/ProtectedRoute';
import GuestWrapper from './HOCs/GuestWrapper';
import AdminRoute from './HOCs/AdminRoute';

// pages
import Landing from './pages/Landing';
import Products from './pages/Products';
import Admin from './pages/Admin/';
import UserDashboard from './pages/UserDashboard/';
import Registration from './pages/Registration';
import Login from './pages/Login';
import NotFound from './pages/Errors/404';
import Order from './pages/Order';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <GuestWrapper path="/register" exact component={Registration} />
      <GuestWrapper path="/authenticate" exact component={Login} />
      <AdminRoute path="/Admin" exact component={Admin} />
      <ProtectedRoute path="/order" exact component={Order} />
      <ProtectedRoute path="/dashboard" exact component={UserDashboard} />
      <ProtectedRoute path="/products" exact component={Products} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
