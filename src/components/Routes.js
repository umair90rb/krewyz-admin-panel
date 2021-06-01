import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import UsersPage from "./pages/UsersPage";
import ForumsPage from "./pages/ForumsPage";
import ListingPage from "./pages/ListingPage";
import CityPage from "./pages/CityPage";
import MapsPage from "./pages/MapsPage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path="/" exact component={DashboardPage} />
        <PrivateRoute path="/users" exact component={UsersPage} />
        <PrivateRoute path="/forums" exact component={ForumsPage} />
        <PrivateRoute path="/listing" exact component={ListingPage} />
        <PrivateRoute path="/profile" exact component={ProfilePage} />
        <PrivateRoute path="/city" exact component={CityPage} />
        <PrivateRoute path="/maps" exact component={MapsPage} />
        <Route path="/login" component={Login} />
        <Route path="/404" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
